import  'normalize.css/normalize.css'

import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'

import  greenMuiTheme from './greenMuiTheme'
import  UserCardsList from '../UserCardsList'

export default ()=>
  <MuiThemeProvider muiTheme={ greenMuiTheme }>
    <div>
      <AppBar title="Users Catalogue" showMenuIconButton={ false } />
      <div style={ { margin: '8px' } }>
        <h3>Hi! Here is you users list.</h3>
        <UserCardsList />
      </div>
    </div>
  </MuiThemeProvider>
