import store from './redux/redux-store'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import './utils/module.css'


ReactDOM.render(
  <BrowserRouter>
      <Provider store={store}>
          {/* @ts-ignore*/}
          <App/>
      </Provider>
  </BrowserRouter>, document.getElementById('root'))


