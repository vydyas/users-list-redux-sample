import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'

const TextInput = function ( props ) {
  const { type = 'text', label: floatingLabelText, className, value: defaultValue, onChange } = props
  const inputProps = { type, floatingLabelText, className, defaultValue, onChange, fullWidth: true }
  if ( type === 'textarea' ) {
    Object.assign( inputProps, { rows: 3, multiLine: true, type: 'text' } )
  }
  return (
    <TextField { ...inputProps } />
  )
}

TextInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default TextInput
