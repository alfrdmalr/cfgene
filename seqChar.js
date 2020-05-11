// seqChar.js

// object for storing input characters as well as the downstream 
// expansions produced by the genetic grammar (amino acids, codons, etc.)
class SeqChar {
	constructor(c, grammar) {
		this.inputChar = c;
		this.grammar = grammar;
	
		// if the grammar has a production rule for this character
		if (this.grammar.hasRule(this.grammar.symbolify(c))) {
			this.hasExpansion = true;
		} else {
			this.hasExpansion  = false;
		}
	}

	getAA(verbose) {
		if (this.hasExpansion) {
			return this.inputChar.toUpperCase();
		} else if (verbose) {
			return this.inputChar;
		} else {
			console.log(`No production rule for ${this.inputChar}; skipping. Verbose output can be enabled by passing "true" to this function`);
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
			this.codon = this.grammar.getRandomExpansion(this.inputChar);
			return this.codon;
		}
	}
}
