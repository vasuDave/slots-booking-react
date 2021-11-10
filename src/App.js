import { Provider } from "react-redux";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import store from "./data/store";
import Appointment from "./components/Appointments";
import AppointmentDetails from "./components/AppointmentDetails";

function App() {
  return (
   
    <Router>
      <Provider store={store}>
        <Switch>
          <Route
            path="/:date/:month/:year/:timeFrom/details"
            component={AppointmentDetails }
          />
          <Route path="/:date?/:month?/:year?/" component={Appointment} />
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
