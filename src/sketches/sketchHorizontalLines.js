export default function (s) {
    s.state = { }
    s.id = { }
    s.audioFile = { }
    s.canvasWidth = { }
    s.canvasHeight = { }
    s.dispatch = () => { }
    let strokeVal = 50
    let highlighted = false
    let currentID = null
    let offset = 0
    let numLines = 11
    let sW = 4
    
    
    s.preload = () => {
        s.soundFormats('mp3', 'ogg')
        s.mySound = s.loadSound(s.audioFile)
	
    }
    
    s.setup = () => {
        s.createCanvas(s.canvasWidth, s.canvasHeight)
        // console.log('::: displayDensity:', s.displayDensity())
        // console.log('::: pixelDensity:', s.pixelDensity())
	currentID = s.id
	console.log('::: sketch-1 has been initialized with ID:' + s.id)
	s.mySound.setLoop(true)
	s.mySound.setVolume(0)
    }

    s.draw = () => {
	const { playAudio } = s.state
	s.background(10,25,48);
	if (s.id === currentID) {
	    hoverSketch()
	}
	s.strokeWeight(sW);
	s.stroke(255,255,255,strokeVal)
	for (var i = 1;i<numLines;i++){
	    let y = ((s.deltaTime * offset) +
		     (i * (s.height / (numLines - 1)))) % s.height
	    s.line(0, y, s.width, y);
	}
	if (highlighted === true && playAudio) {
	    offset = s.map(s.mouseY, 0, s.height, 20, 3)
	    if (offset > -3 && offset < 3) {
		offset = 1;
	    }
	    numLines = s.map(s.mouseY, 0, s.height, -20, 20)
	    numLines = Math.abs(numLines)
	    numLines = s.constrain(numLines, 6, 20)
	    
	    sW = s.map(s.mouseY, 0, s.height, -10, 10)
	    sW = (1 / Math.abs(sW)) * 4
	    sW = s.constrain(sW, 0.01, 4)
	} else {
	    numLines = 11
	    sW = 4
	}
	let speed = s.map(s.mouseY, 0, s.height, 4, -4);
	speed = s.constrain(speed, -4, 4);
	if (speed > -0.3 && speed < 0.3) {
	    speed = 1;
	}
	s.mySound.rate(speed);
	
    }

    let hoverSketch = () => {
	if (s.mouseX > 0 && s.mouseX < s.width &&
	    s.mouseY > 0 && s.mouseY < s.height) {
	    if (highlighted === false) {
		strokeVal = 150
		highlighted = true
		console.log('moused over: ' + s.id)
		s.mySound.setVolume(0.9, 0.01)
		s.mySound.play()
		
	    }
	} else {
	    strokeVal = 50
	    offset = 1.1
	    s.mySound.setVolume(0, 0.1)
	    s.mySound.pause(0.11)
	    highlighted = false
	    
	}
	s.dispatch({ type: 'SET_P5_STROKE' }, { type: 'TOGGLE_PLAY_AUDIO'})	
    }
}
