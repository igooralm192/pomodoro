import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

interface IProps {
  icon: string
  onClick: () => void
}

const IconButton: React.FC<IProps> = ({ onClick, icon }) => {
  return (
    <button type="button" className="action-container" onClick={onClick}>
      <span className="action-label">
        <img src={icon} alt="Icon" />
      </span>
    </button>
  )
}

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default IconButton
