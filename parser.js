// parser.js

let captureSymbol = /(<[\w]*>)/; // regex to capture symbols 

// returns an expansion string based on the input text and the grammar object
// found in `grammar.js`
function expandText(text) {
	let acc = [];
	expand(text, acc);
	return acc.join("");
}

// Updates the given accumulator by expanding the input text recursively, 
// according to the production rules defined in `grammar.js`
function expand(text, acc) {
	let parsedText = text.split(captureSymbol); // capture so we don't lose symbols
		
	for (let i = 0; i < parsedText.length; i++) {
		let string = (parsedText[i]);
		let match = string.match(captureSymbol);
		let symbol = match && match[0];
		
		if (!symbol) {
			acc.push(string);
		} else if (grammar.hasOwnProperty(symbol)) {
			let randomExpansion = random(grammar[symbol]);
			expand(randomExpansion, acc);
		} else {
			console.log(`No production rule for ${symbol} was found in the grammar.`)
			acc.push(string); // if no rule is found, preserve the original string
		}
	}
}

// generates the seed for the CFG based on some input text
function generateSeed(str, delim) {
	let chars = str.split("");
	let seed = [];
	let joiner = delim || '';

	for (let i = 0; i < chars.length; i++) {
		let symbolified = `<${chars[i].toUpperCase()}>`
		if (grammar.hasOwnProperty(symbolified)) {
			seed.push(symbolified);		
		}
	}
	
		return seed.join(joiner);
}

function sanitizeSeed(str) {
	let arr = str.split("");
	let sanitized = [];
	for (let i = 0; i < str.length; i++) {
		if (arr[i].match(/\w/)) {
			sanitized.push(arr[i]);
		}
	}

	return sanitized.join('');
}

class Walker {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.tail = [];
		this.scale = 2;
	} 	

	step(base) {
		this.tail.push(createVector(this.x, this.y));
		switch(base) {
			case 'A':
				this.y--;
				break;
			case 'U': 
				this.y++
				break;
			case 'C': 
				this.x++;
				break;
			case 'G': 
				this.x--;
				break;
			default:
				console.log('invalid base');
				this.tail.pop();
		}
	}

	reset(x, y) {
		this.x = x;
		this.y = y;
		this.tail = [];
	}

	// walk and show an entire sequence. mostly for testing, doesn't mutate
	// efficiently
	walkshow(seq, x, y) {
		//this.tail = [];
		for (let i = 0; i < seq.length; i++) {
			this.step(seq[i]);	
		}

		this.show();
	}

	show() {
		push();
		colorMode(HSB, 50);
		let hue = 0;
		for (let i = 0; i < this.tail.length; i++) {
			stroke(hue, 50, 50);
			point(this.tail[i].x, this.tail[i].y);	
			hue = (hue + 1) % 51;
		}	
		pop();
	}
}
