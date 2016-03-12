import React from 'react'
import { Provider } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import  'normalize.css/normalize.css'

import store from './redux/store'
import  UserCardsList from './components/UserCardsList'
import  greenMuiTheme from './greenMuiTheme'

export default () => (
  <Provider store={ store }>
    <MuiThemeProvider muiTheme={ greenMuiTheme }>
      <div>
        <AppBar title="Users List" showMenuIconButton={ false } />
        <div style={ { margin: '8px' } }>
          <h3>Hi! Here is you users list.</h3>
          <UserCardsList />
        </div>
      </div>
    </MuiThemeProvider>
  </Provider>
)
