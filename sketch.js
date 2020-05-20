// sketch.js

//let g = new Grammar(extended);
let g = new Grammar(extended, undefined, /(<[\w\s]+>)/); //allow spaces
let input;
let sequenceCharacters;
let walker;
let speed = 1;
let zoom = 10;
let walkerColorMode = 'rainbow';
let containerID = 'sketch-container';
let panelOpen = false;

function setup() {
	let container = document.getElementById(containerID);
	let select = document.getElementById('mode-select');
	let textarea = document.getElementById('grammar');
	let inputBox = document.getElementById('input');	
	let updateGrammar = document.getElementById('update-grammar');
	let panel = document.getElementById('panel-container');
	let mask = document.getElementById('mask');
	let panelButton = document.getElementById('panel-button');
	let closeButton = document.getElementById('close-button');
	let zoomSlider = document.getElementById('zoom-slider');
	let zoomSliderLabel = document.querySelector('label[for=zoom-slider]')
	let speedSlider = document.getElementById('speed-slider');
	let speedSliderLabel = document.querySelector('label[for=speed-slider]')

	let elements = [
		container,
		select,
		textarea,
		inputBox,
		updateGrammar, 
		panel, 
		mask, 
		panelButton,
		closeButton,
		zoomSlider,
		zoomSliderLabel,
		speedSlider,
		speedSliderLabel,
	];
	
	for (const el of elements) {
		if (!el) {
			console.log('html bad. me dumb.');
		}
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
	let togglePanel = () => {
		panelOpen = !panelOpen;
		panel.classList.toggle('toggle-panel');
		mask.classList.toggle('toggle-panel');
		panelButton.classList.toggle('toggle-panel');
		closeButton.classList.toggle('toggle-panel');
		if (panelOpen && isSmallBrowser()) {
			panel.focus();
		}
		windowResized();	
	};
	panelButton.onclick = togglePanel;
	closeButton.onclick = togglePanel;

	// add keypress handler to panel
	document.onkeydown = (e) => {
		if (e.code === "Escape") {
			togglePanel();	
		}
	}

	// initialize slider values
	let setZoom = z => {
		zoom = z;
		zoomSlider.value = zoom;
		zoomSliderLabel.innerHTML = `Zoom (${zoom})`;
	}

	let setSpeed = s => {
		speed = s;
		speedSlider.value = speed;
		speedSliderLabel.innerHTML = `Speed (${speed})`;
	}

	setZoom(zoom);
	setSpeed(speed);
	
	// add slider functionality
	zoomSlider.oninput = (e) => {
		setZoom(e.target.valueAsNumber);
		redraw();
	}

	speedSlider.oninput = (e) => {
		setSpeed(e.target.valueAsNumber);
		redraw();
	} 

	// set up mode switcher
	select.value = walkerColorMode;
	select.onchange = () => {
		walker.setColorMode(select.value);
		redraw();
	}
	
	// mutate input when it's changed
	inputBox.oninput = updateInput
	sequenceCharacters = [];

	// initialize walker
	walker = new Walker(0, 0, speed);
	walker.setColorMode(walkerColorMode); // initialize color mode
	inputBox.focus();
	noLoop();
}

function draw() {
	background(255);
	document.getElementById('sequence-container').innerHTML = SeqChar.getAllCodons(sequenceCharacters);
	translate(width/2, height/2);
	scale(zoom);
	walker.setSpeed(speed);
	walker.walk(sequenceCharacters);
}

//update canvas when window resizes
function windowResized() {
	let container = document.getElementById(containerID);
	if (!container) {
		return;
	}
	resizeCanvas(Math.floor(container.clientWidth), Math.floor(container.clientHeight));
}
