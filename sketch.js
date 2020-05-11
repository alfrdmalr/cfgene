console.log(grammar)

let input = "hello!";
let seed;
let expansion;
let walker;

function setup() {
	createCanvas(640, 480);

	expansion = expandText(input);
  
	let inputBox = createInput(input);
	inputBox.input(updateInput);
	
	walker = new Walker(0, 0);

	noLoop();
}

function draw() {
	background(255);

	seed = generateSeed(input);
	expansion = expandText(seed);
	
	text("input:", 50, 40);
	text(input, 50, 60);
	text("amino acid sequence:", 50, 80);
	text(sanitizeSeed(seed), 50, 100);
	text("nucleotide sequence:", 50, 120);
	text(expansion, 50, 140);

	translate(width/2, height/2);
	scale(3);
	
	walker.walkshow(expansion, 0, 0);
	//walker.show();
}

function updateInput() {
	input = this.value();
	redraw();
}
