import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ReportPage from "./components/ReportPage";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Summary from "./components/Summary";
import Details from "./components/Details";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      couriers: [],
      listTotalDelParcels: [],
      listCouriersPerformance: [],
      selectedCourier: '',
      date_from: '',
      date_to: '',
    };
  }

  componentDidMount = () => {
    fetch("http://api-dev.els.mk/employees?page=1&limit=500&roles[]=3", {
      method: "get",
      headers: {
        Authorization: "Bearer 3d0e56ed00e1025ba50835972fac229056701477",
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ couriers: data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleListTotalDelParcels = (array, array2)  => {
    this.setState({ listTotalDelParcels: array, listCouriersPerformance: array2 });
  };

  handleSelectedCourier = (num, date_from, date_to) => {
    this.setState({ selectedCourier : num, date_from: date_from, date_to: date_to})
  }
  render() {
    let couriersID = [];
    if (this.state.couriers.data) {
      this.state.couriers.data.forEach(courier => {
        couriersID.push(courier.id);
      });
    }
    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Dashboard
                  couriers={this.state.couriers.data}
                  couriersID={couriersID}
                />
              )}
            />
            <Route
              path="/report-page"
              render={() => (
                <ReportPage
                  couriers={this.state.couriers.data}
                  couriersID={couriersID}
                  handleListTotalDelParcels={this.handleListTotalDelParcels}
                  handleSelectedCourier = {this.handleSelectedCourier}
                />
              )}
            />
            <Route
              path="/details/:id"
              render={() => (
                <Details
                selectedCourier={this.state.selectedCourier}
                date_from={this.state.date_from}
                date_to={this.state.date_to}
                />
              )}
            />
            <Route
              path="/summary"
              render={() => (
                <Summary listTotalDelParcels={this.state.listTotalDelParcels} listCouriersPerformance={this.state.listCouriersPerformance} />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
