import React from 'react'
// import Navigation from './src/Navigation'
import Navigation from './src/Navigation2'
import {Provider} from 'react-redux'
import store from './src/Redux/Store'

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}

export default App


