import React from "react";
import { Chart } from "primereact/chart";

class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      courierPerformance: {},
      labels: [],
      data1: [],
      data2: []
    };
  }
  componentDidMount = () => {
    let singleCourier = {
      courier_id: this.props.selectedCourier,
      date_from: this.props.date_from,
      date_to: this.props.date_to
    };
    fetch("http://api-dev.els.mk/statistics/courierperformance", {
      method: "post",
      headers: {
        Authorization: "Bearer 3d0e56ed00e1025ba50835972fac229056701477",
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(singleCourier)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ courierPerformance: data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  sum = param => {
    let total = 0;
    for (let date in this.state.courierPerformance) {
      for (let id in this.state.courierPerformance[date]) {
        if (this.state.courierPerformance[date][id][param] !== null) {
          total =
            total + parseFloat(this.state.courierPerformance[date][id][param]);
        }
      }
    }
    return total;
  };


  render() {
    let localData1 = [];
    let localData2 = [];
    for (let date in this.state.courierPerformance) {
      for (let id in this.state.courierPerformance[date]) {
        localData1.push(
          this.state.courierPerformance[date][id].delivered_parcels
        );
      }
    }
    let sortedTempArray = [...localData1].sort((a, b) => b - a);
    let shortTempArray = sortedTempArray.slice(0, 3);
    

    let obj = {};

    for(let j = 0; j<localData1.length; j++){
      for(let i = 0; i<shortTempArray.length; i++) {
        if(shortTempArray[i] === localData1[j]) {
          obj[localData1.indexOf(localData1[j])] = localData1[j]
        }
      }
    }
    for(let key in obj) {
      localData2[key] = obj[key]
    } 
    
    const data = {
      labels: Object.keys(this.state.courierPerformance),
      datasets: [
        {
          type: "line",
          label: "Total Delivered parcels per day",
          borderColor: "#2196F3",
          borderWidth: 2,
          fill: false,
          data: localData1
        },
        {
          type: "bar",
          label: "Top 3",
          backgroundColor: "#4CAF50",
          data: localData2,
          borderColor: "white",
          borderWidth: 2
        }
      ]
    };
    const options = {
      responsive: true,
      title: {
        display: true,
        text: "Combo Bar Line Chart"
      },
      tooltips: {
        mode: "index",
        intersect: true
      }
    };

    return (
      <div>
        <p>Details Page</p>
        <p>{this.props.selectedCourier}</p>
        <p>{this.props.date_from}</p>
        <p>{this.props.date_to}</p>
        <p>Total colected parcels: {this.sum("collected_parcels")} </p>
        <p>Total delivered parcels: {this.sum("delivered_parcels")} </p>
        <p>
          Total cash amount from collected parcels:{" "}
          {this.sum("cash_amount_from_collected_parcels")}{" "}
        </p>
        <p>
          Total cash amount from delivered parcels:{" "}
          {this.sum("cash_amount_from_delivered_parcels")}{" "}
        </p>
        <p>
          Total invoiced amount from collected parcels:{" "}
          {this.sum("invoice_amount_from_collected_parcels")}{" "}
        </p>
        <p>
          Total invoiced amount from delivered parcels:{" "}
          {this.sum("invoice_amount_from_delivered_parcels")}{" "}
        </p>
        <p>
          Total charged amount:{" "}
          {this.sum("total_cash_amount") + this.sum("total_invoice_amount")}
        </p>

        <Chart type="bar" data={data} options={options} />
      </div>
    );
  }
}

export default Details;
