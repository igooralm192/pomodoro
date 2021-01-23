import React, { useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

import Alarm from '../../assets/images/alarm.svg'
import Close from '../../assets/images/close.svg'

interface IProps {
  title: string
  message: string
  open: boolean
  onClose: () => void
}

const ALERT_TIME = 60000

const Alert: React.FC<IProps> = ({ title, message, open, onClose }) => {
  const alertRef = useRef<HTMLDivElement>(null)

  function animateHideAlert() {
    if (!alertRef) return
    if (!alertRef.current) return

    alertRef.current.classList.remove('active-alert')
  }

  function animateShowAlert() {
    if (!alertRef) return
    if (!alertRef.current) return

    alertRef.current.classList.add('active-alert')
  }

  const handleClose = useCallback(() => {
    animateHideAlert()
    onClose()
  }, [onClose])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (open === true) {
      animateShowAlert()

      timeout = setTimeout(handleClose, ALERT_TIME)
    }

    return () => clearTimeout(timeout)
  }, [open, handleClose])

  return (
    <div className="alert-container" ref={alertRef}>
      <div className="alert-content">
        <div className="icon">
          <img src={Alarm} alt="Alert icon" />
        </div>
        <div className="message">
          <h2 className="title">{title}</h2>
          <span className="description">{message}</span>
        </div>
        <div className="close">
          <button type="button" onClick={handleClose}>
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
