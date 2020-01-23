import React from "react";
import { Chart } from "primereact/chart";
import { SummaryStyle } from "../style/SummaryStyle";

class Summary extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  dateForPieChart = () => {
    let krajna = [];
    let result = {};
    let arrayOfNames = [];
    let arrayOfTotals = [];
    for (let i = 0; i < 10; i++) {
      krajna.push(this.props.listTotalDelParcels[i]);
    }

    let restCouriersTotal = 0;
    let restCouriers = {};
    let restCourierList = [...this.props.listTotalDelParcels];
    restCourierList.splice(0, 10);
    for (let courier in restCourierList) {
      restCouriersTotal =
        restCouriersTotal + parseInt(restCourierList[courier].id);
    }
    restCouriers["id"] = "rest";
    restCouriers["ime"] = "Rest Couriers";
    restCouriers["total"] = restCouriersTotal;
    krajna.push(restCouriers);

    for (let i = 0; i < krajna.length; i++) {
      arrayOfNames.push(krajna[i].ime);
      arrayOfTotals.push(krajna[i].total);
    }

    result["arrayOfNames"] = arrayOfNames;
    result["arrayOfTotals"] = arrayOfTotals;
    return result;
  };

  getKeyByValue = (object, value) => {
    let array = [];
    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        if (object[property] === value) {
          array.push(property);
        }
      }
    }
    return array;
  };

  coeff = singleCourierPerf => {
    let effiency;
    let courierObj = {};
    let max;
    let vtorObj = {};

    for (let date in singleCourierPerf) {
      for (let id in singleCourierPerf[date]) {
        effiency =
          parseFloat(singleCourierPerf[date][id].delivered_parcels) /
          parseFloat(singleCourierPerf[date][id].expected_parcels_for_delivery);
        vtorObj[date] = effiency;
        courierObj["id"] = id;
      }
    }

    let tempArr = [];
    for (let date in vtorObj) {
      tempArr.push(vtorObj[date]);
    }
    max = Math.max(...tempArr);
    courierObj["bestPerformance"] = max;
    courierObj["dates"] = this.getKeyByValue(vtorObj, max);
    return courierObj;
  };

  funkcija = () => {
    let arrayOfCouriersBestPerformance = [];
    for (let i = 0; i < this.props.listCouriersPerformance.length; i++) {
      arrayOfCouriersBestPerformance.push(
        this.coeff(this.props.listCouriersPerformance[i])
      );
    }
    console.log(this.props.listCouriersPerformance);

    let maxNum = Math.max.apply(
      Math,
      arrayOfCouriersBestPerformance.map(function(obj) {
        return obj.bestPerformance;
      })
    );

    let arrayOfMaxEfficientCouriers = [];
    for (let i = 0; i < arrayOfCouriersBestPerformance.length; i++) {
      if (arrayOfCouriersBestPerformance[i].bestPerformance === maxNum) {
        arrayOfMaxEfficientCouriers.push(arrayOfCouriersBestPerformance[i]);
      }
    }

    if (arrayOfMaxEfficientCouriers.length > 1) {
      let mostEfficietCourier = Math.max.apply(
        Math,
        arrayOfMaxEfficientCouriers.map(function(obj) {
          return obj.dates.length;
        })
      );
      for (let i = 0; i < arrayOfMaxEfficientCouriers.length; i++) {
        if (
          arrayOfMaxEfficientCouriers[i].dates.length === mostEfficietCourier
        ) {
          return arrayOfMaxEfficientCouriers[i];
        }
      }
    } else {
      return arrayOfMaxEfficientCouriers[0];
    }
  };

  dataForGraph = () => {
    let courier = this.funkcija();
    let courierData;
    let arrayOfDates = [];
    let arrayOfRatios = [];
    let obj = {};
    for (let i = 0; i < this.props.listCouriersPerformance.length; i++) {
      for (let date in this.props.listCouriersPerformance[i]) {
        if (
          courier.id ===
          Object.keys(this.props.listCouriersPerformance[i][date])[0]
        ) {
          courierData = this.props.listCouriersPerformance[i];
        }
      }
    }
    for (let date in courierData) {
      arrayOfDates.push(date);
      for (let id in courierData[date]) {
        obj["ime"] = courierData[date][id].courier_name;
        let efficiency =
          parseFloat(courierData[date][id].delivered_parcels) /
          parseFloat(courierData[date][id].expected_parcels_for_delivery);
        arrayOfRatios.push(efficiency);
      }
    }
    obj["arrayOfDates"] = arrayOfDates;
    obj["arrayOfRatios"] = arrayOfRatios;
    console.log(obj);
    return obj;
  };

  render() {
    let c = this.dateForPieChart();
    const dataPieChart = {
      labels: c.arrayOfNames,
      datasets: [
        {
          data: c.arrayOfTotals,
          backgroundColor: [
            "#dae4ea",
            "#b5cad5",
            "#91b1c0",
            "#6c98ac",
            "#448098",
            "#306174",
            "#006884",
            "#365562",
            "#0e566d",
            "#134557",
            "#143541"
          ],
          hoverBackgroundColor: [
            "#dae4ea",
            "#b5cad5",
            "#91b1c0",
            "#6c98ac",
            "#448098",
            "#306174",
            "#006884",
            "#365562",
            "#0e566d",
            "#134557",
            "#143541"
          ]
        }
      ]
    };
    {
      this.funkcija();
    }
    let a = this.dataForGraph();

    const dataLineGraph = {
      labels: a.arrayOfDates,
      datasets: [
        {
          label: "First Dataset",
          data: a.arrayOfRatios,
          fill: false,
          // backgroundColor: "#42A5F5",
          borderColor: "#0e566d"
        }
      ]
    };

    return (

//       <div>
// <Chart type="pie" data={dataPieChart} width="80%" height="80%" />
//       </div>
      <SummaryStyle>
        <p className="header">Summary page</p>
        <div className="container">
            <Chart type="pie" data={dataPieChart} width="70%" height="40%" />
          <div className="card">
            <p className="description">
              This is the summary for informations displayed in the table. The pie
              chart is showing the top 10 couriers with the highest number of
              delivered parcels with enclosing month and eleventh piece of the
              pie represents total delivered parcels of all remaining couriers.
            </p>
          </div>
        </div>

        <div className="container" style={{ marginTop: "5%" }}>
            <Chart type="line" data={dataLineGraph} width="70%" height="35%" />
  
          <div className="card">
            <p className="description">
              The table below shows which courier has the lowest delivered
              parcels to expected parcels for delivery ratio, meaning who was
              most effective one.
            </p>
            <p className="description">For this month , most effective courier is:</p>
            <p className="courier">{a.ime}</p>
          </div>
        </div>
      </SummaryStyle>
    );
  }
}
export default Summary;
