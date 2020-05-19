// sketch.js

//let g = new Grammar(extended);
let g = new Grammar(extended, undefined, /(<[\w\s]+>)/); //allow spaces
let input;
let sequenceCharacters;
let walker;
let drawScale = 10;
let walkerColorMode = 'rainbow';
let containerID = 'sketch-container';

function setup() {
	let container = document.getElementById(containerID);
	let select = document.getElementById('mode-select');
	let textarea = document.getElementById('grammar');
	let inputBox = document.getElementById('input');	
	let updateGrammar = document.getElementById('update-grammar');
	let panel = document.getElementById('panel-container');
	let panelButton = document.getElementById('panel-button');
	let closeButton = document.getElementById('close-button');


	if (!(container && select && textarea && inputBox && updateGrammar && panel
		&& panelButton && closeButton)) {
		console.log('html bad. me dumb.');
		return;
	}

	// create, size, and place canvas
	let canvas = createCanvas(container.clientWidth, container.clientHeight);
	canvas.parent(containerID);

	// load grammar into editor
	textarea.value = JSON.stringify(g.grammar, undefined, 2);
	
	// add grammar button functionality
	updateGrammar.onclick = () => {
		try {
			g.loadGrammar(textarea.value)
		}	catch(error) {
			alert(error);
		}
	};	

	// add panel button functionality 
	let toggleVisiblity = () => panel.classList.toggle('show-panel');
	panelButton.onclick = toggleVisiblity;
	closeButton.onclick = toggleVisiblity;


	// set up mode switcher
	select.value = walkerColorMode;
	select.onchange = () => {
		walker.setColorMode(select.value);
		redraw();
	}
	
	// mutate input when it's changed
	inputBox.addEventListener('input', updateInput);
	sequenceCharacters = [];

	// initialize walker
	walker = new Walker(0, 0, drawScale);
	walker.setColorMode(walkerColorMode); // initialize color mode
	noLoop();
}

function draw() {
	background(255);
	document.getElementById('sequence-container').innerHTML = SeqChar.getAllCodons(sequenceCharacters, ' | ')
	
	translate(width/2, height/2);
	walker.walk(sequenceCharacters);
}

//update canvas when window resizes
function windowResized() {
	let container = document.getElementById(containerID);
	if (!container) {
		return;
	}
	resizeCanvas(container.clientWidth, container.clientHeight);
}
