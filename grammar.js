// grammar.js

class	Grammar {
	// optional args:
	// - grammar: JSON object holding production rules for the grammar
	// - adornSymbols: function to transform a string into a grammar-compliant symbol 
	// - symbolCapture:	regular expression to match/capture symbols. Required for
	//									recursive production rules
	constructor(grammar, adornSymbol, symbolCapture) {
		this.grammar = grammar || {};
		this.adornSymbol = adornSymbol;
		this.symbolCapture = symbolCapture || /(<[\w]+>)/;
	}

	symbolify(c) {
		if (this.adornSymbol) {
			return this.adornSymbol(c);
		}	else {
			return `<${c.toUpperCase()}>`;
		} 
	}
	
	hasRule(str) {
		return this.grammar.hasOwnProperty(str);
	}

	getExpansionOptions(symbol) {
		return this.grammar[symbol];
	}

	getRandomExpansion(symbol) {
		let options = this.getExpansionOptions(symbol);
		let r = Math.floor(Math.random() * options.length);
		return options[r];
	}

	addRule(symbol, expansion) {
		if (this.hasRule(symbol)) {
			throw new Error(`Symbol ${symbol} already has the following rule:\n${this.getExpansionOptions(symbol)}`);
		}
		
		this.grammar[adornedSymbol] = expansion;
	}

	updateRule(symbol, expansion) {
		if (!this.hasRule(symbol)) {
			throw new Error(`No symbol '${symbol}' found in grammar to update.`);
		} 

		this.grammar[symbol] = expansion;
	}

	// removes both the symbol and expansion from the grammar
	removeRule(symbol) {
		if (!this.hasRule(symbol)) {
			throw new Error(`No symbol ${symbol} found in grammar to remove. Success?`);
		}

		delete this.grammar[symbol];
	}

	// fully expands the given string using production rules 
	expand(str) {
		let acc = [];
		this._expander(str, acc);
		return acc.join("");
	}

	// Updates the given accumulator by expanding the input text recursively
	_expander(text, acc) {
		if (text === "") {
			return;
		}
		let parsedText = text.split(this.symbolCapture); // capture so we don't lose symbols
		for (const str of parsedText) {
			if (str === "") {
				continue;
			}
			let match = str.match(this.symbolCapture);
			let symbol = match && match[0];
			if (!symbol) {
				acc.push(str);
			} else if (this.hasRule(symbol)) {
				let randomExpansion = this.getRandomExpansion(symbol);
				this._expander(randomExpansion, acc);
			} else {
				console.log(`No production rule for ${symbol} was found in the grammar.`)
				acc.push(str); // if no rule is found, preserve the original string
			}
		}
	}
}
