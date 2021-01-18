import React from 'react'

import Logo from './assets/logo.svg'
import Play from './assets/play.svg'
import Stop from './assets/stop.svg'

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
            <span className="action-label">
              <img src={Play} alt="Play icon" />
            </span>
          </button>
          <button type="button" className="action-container">
            <span className="action-label">
              <img src={Stop} alt="Stop icon" />
            </span>
          </button>
        </div>

        <form id="inputs-container">
          <fieldset className="input-container">
            <label htmlFor="working-input">Trabalho</label>
            <input id="working-input" type="range" min={5} max={60} />
          </fieldset>

          <fieldset className="input-container">
            <label htmlFor="break-input">Descanso</label>
            <input id="break-input" type="range" min={1} max={20} />
          </fieldset>
        </form>
      </div>
    </main>
  )
}

export default App
