import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import PlayerContextProvider from './Contexts/PlayerContext'
import { Provider } from 'react-redux'
import store from './redux/configureStore'


ReactDOM.render(
  <React.StrictMode>

    <Provider store={store}>
      <PlayerContextProvider>
        <App />
      </PlayerContextProvider>
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
)
