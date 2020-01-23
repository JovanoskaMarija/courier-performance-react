import React from "react";
import { Chart } from "primereact/chart";
import { DetailsStyle } from "../style/DetailsStyle";

class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      courierPerformance: {}
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
        Authorization: "Bearer b43361c03d09c05ffd50b6b66b1935b26f88cf33",
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

    for (let j = 0; j < localData1.length; j++) {
      for (let i = 0; i < shortTempArray.length; i++) {
        if (shortTempArray[i] === localData1[j]) {
          obj[localData1.indexOf(localData1[j])] = localData1[j];
        }
      }
    }
    for (let key in obj) {
      localData2[key] = obj[key];
    }

    const data = {
      labels: Object.keys(this.state.courierPerformance),
      datasets: [
        {
          type: "line",
          label: "Total delivered parcels per day",
          borderColor: "#0e566d",
          borderWidth: 2,
          fill: false,
          data: localData1
        },
        {
          type: "bar",
          label: "Top 3",
          backgroundColor: "#6c98ac",
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
        text: "Total delivered parcels"
      },
      tooltips: {
        mode: "index",
        intersect: true
      }
    };
    let singleSelectedCourier = {};
    this.props.couriers.data.map(courier => {
      if (this.props.selectedCourier == courier.id) {
        singleSelectedCourier.ime = courier.ime + " " + courier.prezime;
        singleSelectedCourier.mesto = courier.mesto_ime;
        singleSelectedCourier.kontact = courier.kontakt;
      }
    });

    console.log(singleSelectedCourier);
    return (
      <DetailsStyle>
        <p className="header">Summarize the information for the courier:</p>
        <div className="container">
          <div className="card">
            <div className="card-description">
              <p>
                Name: <span className="data">{singleSelectedCourier.ime}</span>,
                with ID:{" "}
                <span className="data">{this.props.selectedCourier}</span>
              </p>
              <p>
                City:{" "}
                <span className="data"> {singleSelectedCourier.mesto}</span>
              </p>
              <p>
                for the period between: {" "}
                <span className="data">{this.props.date_from}</span> -{" "}
                <span className="data">{this.props.date_to}</span>
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-description">
              <p>
                Total colected parcels:{" "}
                <span className="data">{this.sum("collected_parcels")}</span>{" "}
              </p>
              <p>
                Total delivered parcels:{" "}
                <span className="data">{this.sum("delivered_parcels")}</span>{" "}
              </p>
              <p>
                Total cash amount from collected parcels:{" "}
                <span className="data">
                  {this.sum("cash_amount_from_collected_parcels").toFixed(2)} den
                </span>{" "}
              </p>
              <p>
                Total cash amount from delivered parcels:{" "}
                <span className="data">
                  {this.sum("cash_amount_from_delivered_parcels").toFixed(2)} den
                </span>{" "}
              </p>
              <p>
                Total invoiced amount from collected parcels:{" "}
                <span className="data">
                  {this.sum("invoice_amount_from_collected_parcels").toFixed(2)} den
                </span>{" "}
              </p>
              <p>
                Total invoiced amount from delivered parcels:{" "}
                <span className="data">
                  {this.sum("invoice_amount_from_delivered_parcels").toFixed(2)} den
                </span>{" "}
              </p>
              <p>
                Total charged amount:{" "}
                <span className="data">
                  {(
                    this.sum("total_cash_amount") +
                    this.sum("total_invoice_amount") 
                  ).toFixed(2)} den
                </span>
              </p>
            </div>
          </div>
        </div>
        <Chart
          type="bar"
          data={data}
          options={options}
          width="80%"
          height="40%"
        />

      </DetailsStyle>
    );
  }
}

export default Details;
