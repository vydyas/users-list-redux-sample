import React from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import AppComponent from './App'

injectTapEventPlugin()
render( <AppComponent />, document.getElementById( 'app' ) )
