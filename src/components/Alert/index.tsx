import React from 'react'
import PropTypes from 'prop-types'

import Alarm from '../../assets/images/alarm.svg'
import Close from '../../assets/images/close.svg'

import './styles.scss'

interface IProps {
  title: string
  message: string
  open: boolean
  onClose: () => void
}

const Alert: React.FC<IProps> = ({ title, message, open, onClose }) => {
  return (
    <div className="alert-container">
      <div className="alert-content">
        <div className="icon">
          <img src={Alarm} alt="Alert icon" />
        </div>
        <div className="message">
          <h2 className="title">{title}</h2>
          <span className="description">{message}</span>
        </div>
        <div className="close">
          <button type="button" onClick={onClose}>
            <img src={Close} alt="Close icon" />
          </button>
        </div>
      </div>
    </div>
  )
}

Alert.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Alert
