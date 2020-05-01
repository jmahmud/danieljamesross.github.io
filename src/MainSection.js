import React, { useContext } from 'react'

import { generate } from 'shortid'

import p5Wrapper from './P5Wrapper'

import sketchHLSrc from './sketches/sketchHorizontalLines'
import sketchVLSrc from './sketches/sketchVerticalLines'
import sketchCCSrc from './sketches/sketchConcentricCircles'

import { AppDispatchContext, AppStateContext } from './AppStateProvider'


const P5Wrapper1 = p5Wrapper(generate())
const P5Wrapper2 = p5Wrapper(generate())
const P5Wrapper3 = p5Wrapper(generate())

export default function Section2() {
    const dispatch = useContext(AppDispatchContext)
    const {
        stroked,
	playAudio,
        sketchHL1,
        sketchHL2,
	sketchVL1,
	sketchVL2,
	sketchCC1,
    } = useContext(AppStateContext)

    return (
        <div className="section">
            <div className="section section-content">
                {sketchHL1 && (
                    <P5Wrapper1
                        dispatch={dispatch}
                        sketch={sketchHLSrc}
                        state={{ stroked }, { playAudio }}
		    audioFile="audio/clm-lids.ogg"
		    canvasWidth="100"
		    canvasHeight="300"
                    />
                )}
		{sketchVL1 && (
                    <P5Wrapper3
		    dispatch={dispatch}
		    sketch={sketchVLSrc}
		    state={{ stroked }, { playAudio }}
		    audioFile="audio/sferics.ogg"
		    canvasWidth="200"
		    canvasHeight="100"
                    />
		)}
		{sketchCC1 && (
                    <P5Wrapper2
                        dispatch={dispatch}
                        sketch={sketchCCSrc}
                        state={{ stroked }, { playAudio }}
		    audioFile="audio/choir.ogg"
		    canvasWidth="200"
		    canvasHeight="200"
                    />
                )}
                
		{sketchVL2 && (
                    <P5Wrapper3
			dispatch={dispatch}
			sketch={sketchVLSrc}
			state={{ stroked }, { playAudio }}
			audioFile="audio/sferics.ogg"
			canvasWidth="200"
			canvasHeight="100"
                    />
		)}
		{sketchHL2 && (
                    <P5Wrapper2
                        dispatch={dispatch}
                        sketch={sketchHLSrc}
                        state={{ stroked }, { playAudio }}
		    audioFile="audio/clm-lids.ogg"
		    canvasWidth="100"
		    canvasHeight="300"
                    />
                )}
	    </div>
	    <div className="section section-content">
		
            </div>
	</div>
    )
}
