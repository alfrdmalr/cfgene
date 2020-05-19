function updateInput(e) {
	input = e.target.value;
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

function updateGrammar(str) {
	try {
		let test = JSON.parse(str);

	} catch (error) {
		console.log(error)
	}
}
