// walker.js

class Walker {
	constructor(x, y, scale) {
		this.pos = createVector(x, y);
		this.originalPos = this.pos.copy();
		this.scale = scale || 1;
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

	walk(seq, x, y) {
		this.reset();	
		
		push();
		// setting the second arg to seq.length gets us a non-repeating rainbow
		// from head->tail
		colorMode(HSB, seq.length);
		scale(this.scale);
		let col = 0;
		for (let i = 0; i < seq.length; i++) {
			this.step(seq[i]);
			stroke(col, 100, 100);
			point(this.pos.x, this.pos.y);
			col = (col + 1) % seq.length;
		}
		pop();
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
