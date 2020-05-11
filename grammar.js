// grammar.js

class	Grammar {
	// optional args:
	// - grammar: JSON object holding production rules for the grammar
	// - adornSymbols: function to transform a string into a grammar-compliant symbol 
	constructor(grammar, adornSymbol) {
		this.grammar = grammar || {};
		this.adornSymbol = adornSymbol;
	}

	symbolify(c) {
		if (this.adornSymbol) {
			return this.adornSymbol(c);
		}	else {
			return `<${c.toUpperCase()}>`;
		} 
	}
	
	hasRule(str) {
		return this.grammar.hasOwnProperty(symbol);
	}

	getExpansionOptions(symbol) {
		return this.grammar[symbol];
	}

	getRandomExpansion(symbol) {
		let options = this.getExpansionOptions(symbol);
		let r = Math.floor(Math.random(options.length)) * options.length;
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
}
