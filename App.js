import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Router from './src/Router'
import AppProvider from './src/Components/AppContext'

export default class App extends Component {
  render() {
    return (
      <AppProvider>
          <Router />
      </AppProvider>
    )
  }
}
