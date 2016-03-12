import React from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import AppComponent from './components/AppComponent/AppComponent'

injectTapEventPlugin()
render( <AppComponent />, document.getElementById( 'app' ) )
