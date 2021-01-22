import React, { useEffect, useRef, useState } from 'react'
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

const ALERT_TIME = 60000

const Alert: React.FC<IProps> = ({ title, message, open, onClose }) => {
  const alertRef = useRef<HTMLDivElement>(null)

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()

  function animateHideAlert() {
    if (!alertRef) return
    if (!alertRef.current) return

    alertRef.current.style.animationName = 'hide'
    alertRef.current.style.top = '-300px'
    alertRef.current.style.visibility = 'hidden'
  }

  function animateShowAlert() {
    if (!alertRef) return
    if (!alertRef.current) return

    alertRef.current.style.animationName = 'show'
    alertRef.current.style.top = '0px'
    alertRef.current.style.visibility = 'visible'
  }

  function handleClose() {
    if (timeoutId) clearTimeout(timeoutId)

    animateHideAlert()

    onClose()
  }

  useEffect(() => {
    if (timeoutId) clearTimeout(timeoutId)

    if (open === true) {
      animateShowAlert()

      const timeout = setTimeout(handleClose, ALERT_TIME)

      setTimeoutId(timeout)
    }
  }, [open])

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
