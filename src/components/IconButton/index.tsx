import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

interface IProps {
  icon: string
  disabled?: boolean
  onClick: () => void
}

const IconButton: React.FC<IProps> = ({ icon, disabled = false, onClick }) => {
  return (
    <button
      type="button"
      className="action-container"
      disabled={disabled}
      onClick={onClick}
    >
      <span className="action-label">
        <img src={icon} alt="Icon" />
      </span>
    </button>
  )
}

IconButton.defaultProps = {
  disabled: false,
}

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

export default IconButton
