
let g = new Grammar(grammar);
let input;
let sequenceCharacters;
let walker;

function setup() {
	createCanvas(640, 640);

	let inputBox = createInput("");
	inputBox.input(updateInput);
	sequenceCharacters = [];
	
	walker = new Walker(0, 0, 10);
	walker.toggleRainbow();	

	noLoop();
}

function draw() {
	background(255);
	text("input:", 50, 40);
	text(input, 50, 60);
	text("amino acid sequence:", 50, 80);
	text(SeqChar.getAllAAs(sequenceCharacters, ' | '), 50, 100);
	text("nucleotide sequence:", 50, 120);
	text(SeqChar.getAllCodons(sequenceCharacters, ' | '), 50, 140);
	
	translate(width/2, height/2);
	walker.walk(SeqChar.getAllCodons(sequenceCharacters));
}

function updateInput() {
	input = this.value();
	sequenceCharacters = mutate(input, sequenceCharacters, g);
	//update sequence characters
	redraw();
}

// on input update, mutate the sequence characters instead of regenerating the
// list from scratch each time.
function mutate(input, seq, gram) {
	if (input.length === 0) {
		return [];
	}

	if (seq.length === 0) {
		return SeqChar.convert(input, gram);
	}

	let seqStr = seq.map(s => s.getInputChar()).join('');
	let { leftslice, rightslice } = smartDiff(input, seqStr);
	
	let slicedInput = chop(input, leftslice, rightslice);
	let exons = chop(seq, leftslice, rightslice);


	let convertedInput = SeqChar.convert(slicedInput.mid, gram);
	console.log('input', slicedInput);
	console.log('seq', chop(seqStr, leftslice, rightslice));

	return exons.left.concat(convertedInput, exons.right);
}

function smartDiff(input, seqStr) {
	if (input.length === 0) {
		return [];
	}

	let leftslice = 0; //from left
	let rightslice = 0; //from right
	let smallest = Math.min(seqStr.length, input.length);
	
	for (leftslice; leftslice < smallest; leftslice++) {
		let ic = input[leftslice].toUpperCase();
		let sc = seqStr[leftslice].toUpperCase();
		if (sc !== ic) {
			break;
		}
	}

	for (rightslice; rightslice < smallest; rightslice++) {
		// if we reach the existing slice boundary, stop
		// avoid double counting on the ends if there are repeats
		if (smallest - rightslice === leftslice) {
			break;
		}

		let si = seqStr.length - 1 - rightslice;
		let ii = input.length - 1 - rightslice;
		let sc = seqStr[si].toUpperCase();
		let ic = input[ii].toUpperCase();
		
		if (sc !== ic) {
			break;
		}
	}
	
	return { leftslice, rightslice };
}

function chop(str, leftslice, rightslice) {
	let left = str.slice(0, leftslice);
	let mid = str.slice(leftslice, str.length - rightslice);
	let right = str.slice(str.length - rightslice);
	
	return {
		left, 
		mid, 
		right
	}
}
