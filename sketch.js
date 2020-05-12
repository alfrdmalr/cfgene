console.log(grammar)

let g = new Grammar(grammar);
let input;
let sequenceCharacters;
let walker;

function setup() {
	createCanvas(640, 640);

	let inputBox = createInput("");
	inputBox.input(updateInput);
	sequenceCharacters = [];
	
	walker = new Walker(0, 0, 10);

	noLoop();
}

function draw() {
	background(255);
	colorMode(HSB, 100);	
	text("input:", 50, 40);
	text(input, 50, 60);
	text("amino acid sequence:", 50, 80);
	text(SeqChar.getAllAAs(sequenceCharacters, ' | '), 50, 100);
	text("nucleotide sequence:", 50, 120);
	text(SeqChar.getAllCodons(sequenceCharacters, ' | '), 50, 140);

	translate(width/2, height/2);
	
	walker.walk(SeqChar.getAllCodons(sequenceCharacters), 0, 0);
}

function updateInput() {
	input = this.value();
	sequenceCharacters = SeqChar.convert(input, g);
	//update sequence characters
	redraw();
}
