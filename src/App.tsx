import React from 'react'

import Logo from './assets/logo.png'
import Play from './assets/play.png'

import './App.scss'

const App: React.FC = () => {
  return (
    <main id="main-container">
      <div className="content">
        <div id="logo-container">
          <img src={Logo} alt="Logo" />
        </div>

        <div id="progress-container">
          <div className="progress">25:00</div>
        </div>

        <div id="actions-container">
          <button type="button" className="action-container">
            <img src={Play} alt="Play icon" />
          </button>
        </div>

        <div id="sliders-container">
          <div className="slider-container">
            <label htmlFor="working-input">
              Trabalho
              <input id="working-input" type="text" />
            </label>
          </div>
          <div className="slider-container">
            <label htmlFor="break-input">
              Descanso
              <input id="break-input" type="text" />
            </label>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
