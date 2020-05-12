// walker.js

class Walker {
	constructor(x, y, scale) {
		this.pos = createVector(x, y);
		this.originalPos = this.pos.copy();
		this.scale = scale || 1;
		this.rainbow = true;
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
		for (let i = 0; i < seq.length; i++) {
			this.step(seq[i]);
			stroke(col, max, max);
			point(this.pos.x, this.pos.y);
			col = (col + 1) % max;
		}
		pop();
	}

	toggleRainbow() {
		this.rainbow = !this.rainbow;
	}
}
