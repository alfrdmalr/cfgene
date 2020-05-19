// walker.js

class Walker {
	constructor(x, y, scale) {
		this.pos = createVector(x, y);
		this.originalPos = this.pos.copy();
		this.scale = scale || 1;
		this.colorMode = 'cycle';
	} 

	step(base) {
		switch(base) {
			case 'A':
				this.pos.y--;
				break;
			case 'U': 
				this.pos.y++
				break;
			case 'C': 
				this.pos.x++;
				break;
			case 'G': 
				this.pos.x--;
				break;
			default:
				console.log('invalid base');
		}
	}

	reset() {
		this.pos = this.originalPos.copy();
	}

	walk(seq) {
		this.reset();	
		
		push();
		scale(this.scale);
		
		let max = 100;
		if (this.colorMode === 'rainbow') {
			max = seq.length * 3; // magic number = codon length	
		}
		
		if (this.colorMode === 'base') {
			colorMode(HSB, 3);
		} else {
			colorMode(HSB, max);
		}

		let col = 0;
		
		for (const c of seq) {
			if (this.colorMode === 'codon') {
				let randomHue = Math.floor(c.seed * max);
				col = randomHue;
			}

			for (const base of c.getCodon()) {
				stroke(col, max, max);
				if (this.colorMode === 'base') {
					col = this.getBaseColor(base);
				}
				this.step(base);
				point(this.pos.x, this.pos.y);
				if (this.colorMode === 'rainbow' || this.colorMode === 'cycle') {
					col = (col + 1) % max;
				}
			}
		}
		pop();
	}

	// 'cycle': with each base, step through colors
	// 'rainbow': stretch the rainbow across the whole sequence, from start to
	//						finish
	// 'codon': each set of three characters are colored randomly
	// 'base':	each type of nucleotide base is colored differently
	setColorMode(mode) {
		console.log('setCM called with', mode)
		switch (mode) {
			case 'cycle': 
			case 'rainbow':
			case 'codon':
			case 'base':
				this.colorMode = mode;
				break;
			default:
				console.log(`No such color mode "${mode}".`);
		}
	}

	setScale(scale) {
		this.scale = scale;
	}
	
	getBaseColor(base) {
		switch(base) {
			case 'A': 
				return 0;
			case 'U': 
				return 1;
			case 'C': 
				return 2;
			case 'G': 
				return 3;
		}
	}
}
