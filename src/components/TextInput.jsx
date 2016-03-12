import React from 'react'
import TextField from 'material-ui/TextField'

export default function ( props ) {
  const { type = 'text', label: floatingLabelText, className, value: defaultValue, onChange } = props
  const inputProps = { type, floatingLabelText, className, defaultValue, onChange, fullWidth: true }
  if ( type === 'textarea' ) {
    Object.assign( inputProps, { rows: 3, multiLine: true, type: 'text' } )
  }
  return (
        <TextField { ...inputProps } />
  )
}
