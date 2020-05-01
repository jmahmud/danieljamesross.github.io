import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainSection from './MainSection';

function App() {
  return (
      <div className="App">
          <div className="app-content section">
              <h5>djr</h5>
              <MainSection />
	      
          </div>
	  
          <p className="github">
	      Adapted from <br />
	      <a href="https://github.com/atorov/react-hooks-p5js">
                  react-hooks-p5js 
              </a>
          </p>
	  <p className="github">
	      Thank you atorov!
	  </p>
      </div>
  );
}

export default App;
