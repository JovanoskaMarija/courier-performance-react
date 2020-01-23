import React from "react";
import { Link } from "react-router-dom";
import {DashboardStyle, Card} from '../style/DashboardStyle'

class Dashboard extends React.Component {
  render() {
    return (
      <DashboardStyle>
        <Card disabled><p>Employees</p></Card>
        <Card disabled><p>Administrators</p></Card>
        <Link to="/report-page" >
          <Card ><p>Couriers</p></Card>
        </Link>
        <Card disabled><p>IT</p></Card>
        <Card disabled><p>Data Center</p></Card>
        <Card disabled><p>Finances</p></Card>
        <Card disabled><p>Warehousemen</p></Card>
        <Card disabled><p>Contact Center</p></Card>
        <Card disabled><p>Supervisors</p></Card>
      </DashboardStyle>
    );
  }
}

export default Dashboard;
