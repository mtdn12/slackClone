import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import 'core-js'
// import 'typeface-roboto'
import 'semantic-ui-css/semantic.min.css'
import './index.css'

// import configureStore from './store/configureStore'
import registerServiceWorker from './registerServiceWorker'
import App from 'src/Containers/App'
// Firebase context
import firebase, { FirebaseContext } from './Stores/Firebase'

async function init() {
  const MOUNT_NODE = document.getElementById('root')
  const render = () =>
    ReactDOM.render(
      <Router>
        <FirebaseContext.Provider value={firebase}>
          <App />
        </FirebaseContext.Provider>
      </Router>,
      MOUNT_NODE
    )

  if (module.hot) {
    module.hot.accept('src/Containers/App', () => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE)
      render()
    })
  }

  render()
}

init()

registerServiceWorker()
