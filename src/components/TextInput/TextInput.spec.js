import React from 'react'
import TextInput from './TextInput'
import TestUtils from 'react-addons-test-utils'

describe('TextInput', ( ) => {
  let textInput, testValue

  var onChange = e => testValue = e.target.value
  beforeEach(( ) => {
    testValue = 'nothing happened'
    textInput = TestUtils.renderIntoDocument(<TextInput onChange={ onChange } value={ 'hello kitty' } />)
  })

  it('should set value in callback', ( ) => {
    var newTestValue = 'goodbye kitty'
    expect(testValue).not.toBe('goodbye kitty')
    textInput.change({ target: { value: newTestValue } })
    expect(testValue).toBe('goodbye kitty')
  })
})
