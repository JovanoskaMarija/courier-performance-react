import React from "react";
import { Chart } from "primereact/chart";

class Summary extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  dateForPieChart = () => {
    let krajna = [];
    let result = {}
    let arrayOfNames = []
    let arrayOfTotals = []
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

    result["arrayOfNames"] = arrayOfNames
    result["arrayOfTotals"] = arrayOfTotals
    return result
  }

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
    let c = this.dateForPieChart()
    const dataPieChart= {
      labels: c.arrayOfNames,
      datasets: [
        {
          data: c.arrayOfTotals,
          backgroundColor: [ "#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6", "#E6B333", "#3366E6", "#999966", "#99FF99", "#B34D4D", "#80B300" ],
          hoverBackgroundColor: ["#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6", "#E6B333", "#3366E6", "#999966",  "#99FF99", "#B34D4D", "#80B300" ]
        }
      ]
    }
    {this.funkcija()}
    let a = this.dataForGraph();

    const dataLineGraph = {
      labels: a.arrayOfDates,
      datasets: [
        {
          label: "First Dataset",
          data: a.arrayOfRatios,
          fill: false,
          backgroundColor: "#42A5F5",
          borderColor: "#42A5F5"
        }
      ]
    };

    return (
      <div>
        <p>Ssummart page</p>
        <Chart type="pie" data={dataPieChart} />

        {a.ime}
        <Chart type="line" data={dataLineGraph}  />
      </div>
    );
  }
}
export default Summary;
