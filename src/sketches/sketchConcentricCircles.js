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
    let numCircles = 6
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
	s.noFill()
	for (var i = 1;i<numCircles;i++){
	    let diam = ((s.deltaTime * offset) +
			(i * (s.height / (numCircles - 1)))) %
	    (s.height - 4)
	    s.ellipse(s.width / 2, s.height / 2, diam);
	}
	if (highlighted === true && playAudio) {
	    offset = s.map(s.mouseY, 0, s.height, 20, 3);
	    
	    numCircles =  s.map(s.mouseY, 0, s.height, 20, 6)
	    numCircles = s.constrain(numCircles, 6, 20)

	    
	    sW =  s.map(s.mouseY, 0, s.height, 0.1, 4)
	    sW = s.constrain(sW, 0.5, 20)
	} else {
	    numCircles = 6
	    sW = 4
	}
	let speed = s.map(s.mouseY, 0, s.height, 2, 0.1);
	speed = s.constrain(speed, 0.3, 4);
	s.mySound.rate(speed);
	
	
    }

    let hoverSketch = () => {
	if (s.mouseX > 0 && s.mouseX < s.width &&
	    s.mouseY > 0 && s.mouseY < s.height) {
	    if (highlighted === false) {
		strokeVal = 150
		
		highlighted = true
		console.log('moused over: ' + s.id)
		s.mySound.setVolume(0)
		s.mySound.play()
		s.mySound.setVolume(0.9, 0.01)
	    }
	} else {
	    strokeVal = 50
	    offset = 1.1
	    s.mySound.setVolume(0, 0.01)
	    s.mySound.pause(0.03)
	    highlighted = false
	    
	}
	s.dispatch({ type: 'SET_P5_STROKE' }, { type: 'TOGGLE_PLAY_AUDIO'})	
    }
}
