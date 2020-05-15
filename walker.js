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
		if (this.rainbow) {
			max = seq.length;	
		}
		colorMode(HSB, max);
		let col = 0;
		
		for (const c of seq) {
			if (this.colorMode === 'codon') {
				let randomHue = Math.floor(c.seed * max);
				col = randomHue;
			}

			for (const base of c.getCodon()) {
				stroke(col, max, max);
				this.step(base);
				point(this.pos.x, this.pos.y);
				if (this.colorMode !== 'codon') {
					col = (col + 1) % max;
				}
			}
		}
		pop();
	}

	// 'cycle': with each base, step through colors
	// 'rainbow': stretch the rainbow across the whole sequence, from start to
	//						finish
	// 'codon': each set of three characters are colored differently
	setColorMode(mode) {
		switch (mode) {
			case 'cycle': 
			case 'rainbow':
			case 'codon':
				this.colorMode = mode;
				break;
			default:
				console.log(`No such color mode "${mode}".`);
		}
	}
}
