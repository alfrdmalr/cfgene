// walker.js

class Walker {

	constructor(x, y, speed) {
		this.pos = createVector(x, y);
		this.originalPos = this.pos.copy();
		this.speed = speed || 1;
		this.colorMode = 'rainbow';
		this.color = 0;
		this.colorMax = 0;
	} 

	reset() {
		this.pos = this.originalPos.copy();
		this.color = 0;
		this.colorMax = 0;
	}
	
	step(base) {
		switch(base) {
			case 'A':
				return createVector(0, -1);	
			case 'U': 
				return createVector(0, 1);	
			case 'G': 
				return createVector(-1, 0);	
			case 'C': 
				return createVector(1, 0);	
			default:
				throw new Error(`invalid base ${base}`);
		}
	}
	
	baseWalk(seq) {
		colorMode(HSB, this.colorMax);
		for (const base of seq) {
			this.updateColor('base', base);
			stroke(this.color, this.colorMax, this.colorMax);
			let dir = p5.Vector.mult(this.step(base), this.speed); 
			let cur = p5.Vector.add(this.pos, dir);

			if (this.speed === 1) {
				point(cur.x, cur.y);
			} else {
				line(this.pos.x, this.pos.y, cur.x, cur.y);
			}

			this.pos = cur;
		}
	}
	
	aminoWalk(seq) {
		for (const aa of seq) {
			this.updateColor('amino', aa.getSeed());
			this.baseWalk(aa.getCodon());	
		}
	}

	walk(seq, raw) {
		this.reset();
		push();
		if (raw) {
			this.updateColor('setup', seq.length);
			this.baseWalk(seq);	
			pop();
			return;
		}

		let len = 0;
			// convert AA length -> nucleotide length. doing it the "long" way to
			// support weird rules or custom codons
		for (const aa of seq) {
			len += aa.getCodon().length;
		}

		this.updateColor('setup', len);
		this.aminoWalk(seq);
		pop();
	}

	// 'cycle': with each base, step through colors
	// 'rainbow': stretch the rainbow across the whole sequence, from start to
	//						finish
	// 'codon': each set of three characters are colored randomly
	// 'base':	each type of nucleotide base is colored differently
	setColorMode(mode, len) {
		switch (mode) {
			case 'cycle': 
			case 'rainbow':
			case 'codon':
			case 'base':
				this.colorMode = mode;
				break;
			default:
				throw new Error(`No such color mode "${mode}".`);
		}
	}

	// update the color based on color mode and where this is called from
	updateColor(scope, ...details) {
		switch(this.colorMode) {
			case 'rainbow': 
				return this.updateColorRainbow(scope, ...details);
			case 'cycle': 
				return this.updateColorCycle(scope, ...details);
			case 'codon': 
				return this.updateColorCodon(scope, ...details);
			case 'base': 
				return this.updateColorBase(scope, ...details);
			default:
				throw new Error('no color mode specified');
		}
	}

	_incrementColor() {
		this.color = (this.color + 1) % this.colorMax;
	}

	// len is optional; will default otherwise
	_setColorMax(len) {
		this.colorMax = len || 100;
	}
	
	updateColorRainbow(scope, ...details) {
		switch(scope) {
			case 'setup':
				let length = details[0];
				this._setColorMax(this.colorMax + length);
				break;
			case 'amino':
				// do nothing here
				break;
			case 'base':
				this._incrementColor();
				break;
			default: 
				throw new Error(`Called from unknown location ${scope}`);
		}		
	}

	updateColorCycle(scope, ...details) {
		switch(scope) {
			case 'setup':
				this._setColorMax();
				break;
			case 'amino':
				// do nothing
				break;
			case 'base':
				this._incrementColor();
				break;
			default: 
				throw new Error(`Called from unknown location ${scope}`);
		}		
	}

	updateColorCodon(scope, ...details) {
		switch(scope) {
			case 'setup':
				this._setColorMax();
				break;
			case 'amino':
				let randomSeed = details[0];
				this.color = randomSeed * this.colorMax;
				break;
			case 'base':
				// do nothing
				break;
			default: 
				throw new Error(`Called from unknown location ${scope}`);
		}		
	}

	updateColorBase(scope, ...details) {
		switch(scope) {
			case 'setup':
				this._setColorMax(4);
				break;
			case 'amino':
				// do nothing
				break;
			case 'base':
				let base = details[0];
				this.color = this.getBaseColor(base);
				break;
			default: 
				throw new Error(`Called from unknown location ${scope}`);
		}		
	}

	setSpeed(speed) {
		this.speed = speed;
	}
	
	getBaseColor(base) {
		switch(base) {
			case 'A': 
				return 0;
			case 'T':
			case 'U': 
				return 1;
			case 'C': 
				return 2;
			case 'G': 
				return 3;
			default:
				throw new Error(`No such base ${base}`);
		}
	}
}
