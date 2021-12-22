import {Router, Switch, Route} from 'react-router-dom'
import axios from 'axios'
import Dashboard from './containers/Dashboard/Dashboard'
import history from './history'

axios.defaults.withCredentials = true

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Dashboard} />
      </Switch>
    </Router>
  )
}

export default App
