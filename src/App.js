import { Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Dashboard from "./containers/Dashboard/Dashboard";
import history from "./history";
import { PAYMENT } from "./utils/Urls";
import PaymentsPage from "./containers/PaymentsPage/PaymentsPage";

axios.defaults.withCredentials = true;

function App() {
    return (
        <Router history={history}>
            <Switch>
                {/* <Route path="/" exact component={Dashboard} /> */}
                <Route
                    path={PAYMENT + "/:order_id"}
                    exact
                    component={PaymentsPage}
                />
            </Switch>
        </Router>
    );
}

export default App;
