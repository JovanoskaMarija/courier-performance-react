import React from "react";
import { Link } from "react-router-dom";

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <p>Dashboard</p>
        <Link to="/report-page">Go to report page</Link>
      </div>
    );
  }
}

export default Dashboard;
