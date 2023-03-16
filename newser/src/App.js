import React, { useState } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const apikey = "9fbb6ccb0e9945f2a72f8b8d02549760"
  const [progress, setProgress] = useState(0)
  const pageSize = 10
  return (
    <Router>
      <div>
        <Navbar />
        <LoadingBar
          color='#f11946'
          height={4}
          progress={progress}
        />
        <Switch>
          <Route exact path="/general">
            <News setProgress={setProgress} apikey={apikey} pageSize={pageSize} key="general" category="general" />
          </Route>
          <Route exact path="/business">
            <News setProgress={setProgress} apikey={apikey} pageSize={pageSize} key="business" category="business" />
          </Route>
          <Route exact path="/entertainment">
            <News setProgress={setProgress} apikey={apikey} pageSize={pageSize} key="entertainment" category="entertainment" />
          </Route>
          <Route exact path="/technology">
            <News setProgress={setProgress} apikey={apikey} pageSize={pageSize} key="technology" category="technology" />
          </Route>
          <Route exact path="/sports">
            <News setProgress={setProgress} apikey={apikey} pageSize={pageSize} key="sports" category="sports" />
          </Route>
          <Route exact path="/science">
            <News setProgress={setProgress} apikey={apikey} pageSize={pageSize} key="science" category="science" />
          </Route>
          <Route exact path="/health">
            <News setProgress={setProgress} apikey={apikey} pageSize={pageSize} key="health" category="health" />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
export default App