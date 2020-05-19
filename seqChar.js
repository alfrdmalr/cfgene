// seqChar.js

// object for storing input characters as well as the downstream 
// expansions produced by the genetic grammar (amino acids, codons, etc.)
class SeqChar {
	constructor(c, grammar) {
		this.inputChar = c;
		this.symbol = grammar.symbolify(c);
		this.grammar = grammar;
		// store a random value to maintain 
		// consistency between processing renders
		this.seed = Math.random(); 
	
		// if the grammar has a production rule for this character
		if (this.grammar.hasRule(this.symbol)) {
			this.hasExpansion = true;
		} else {
			this.hasExpansion  = false;
		}
	}
	
	// converts a regular string into an array of SeqChars
	static convert(str, grammar) {
		return str.split('').map(c => new SeqChar(c, grammar));	
	}

	static getAllAAs(chars, delim, verbose) {
		delim = delim || '';
		return chars.map(c => c.getAA(verbose)).join(delim);
	}

	static getAllCodons(chars, delim, verbose) {
		delim = delim || '';
		return chars.map(c => c.getCodon(verbose)).join(delim);
	}

	getInputChar() {
		return this.inputChar;
	}

	getAA(verbose) {
		if (!this.hasExpansion) {
			if (verbose) {
				return this.inputChar;
			} else {
				return '';
			}
		} else {
			return this.inputChar.toUpperCase();
		}
	}

	getCodon(verbose) {
		if (!this.hasExpansion) {
			if (verbose) {
				return this.inputChar;
			} else {
				return '';
			}
		} else if (this.codon) {
			return this.codon;
		} else {
			this.codon = this.grammar.expand(this.symbol);
			return this.codon;
		}
	}

	getSeed() {
		return this.seed;
	}
}
