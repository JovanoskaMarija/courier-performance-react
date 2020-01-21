import React from "react";
import { Link } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";

import {Button} from 'primereact/button';
import {ProgressSpinner} from 'primereact/progressspinner';

class ReportPage extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      listCouriersPerformance: [],
      sortedTotalDelParcels: [],
      date_from: new Date( new Date().getFullYear(),  new Date().getMonth(), 1),
      date_to: new Date( new Date().getFullYear(),  new Date().getMonth() + 1, 0),
      selected: {},
      showDialog: false
    };
  }

  totalDeliveredParcels = courierId => {
    let total = 0;
    let res = {};
    for (let i = 0; i < this.state.listCouriersPerformance.length; i++) {
      for (let date in this.state.listCouriersPerformance[i]) {
        for (let id in this.state.listCouriersPerformance[i][date]) {
          if (id === courierId) {
            total =
              total +
              parseInt(
                this.state.listCouriersPerformance[i][date][id]
                  .delivered_parcels
              );
          }
        }
      }
    }
    res[courierId] = total;
    return res;
  };

  listCouriersPerformance = async () => {
    let localListCouriersPerformance = [];
    let singleCourier = {
      date_from: this.state.date_from,
      date_to: this.state.date_to
    };

    for (let i = 0; i < this.props.couriersID.length; i++) {
      singleCourier.courier_id = this.props.couriersID[i];
      const response = await fetch('http://api-dev.els.mk/statistics/courierperformance', 
      {
        method: "post",
          headers: {
            Authorization: "Bearer 3d0e56ed00e1025ba50835972fac229056701477",
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(singleCourier)
      })
      this.setState({loading: true})
      const json = await response.json();
      if (!Array.isArray(json)) {
        // localListCouriersPerformance[singleCourier.courier_id] = json;
        localListCouriersPerformance.push(json);
      }
      this.setState({listCouriersPerformance: localListCouriersPerformance });
    }
    console.log(this.state.listCouriersPerformance)
    let localTotalDelParcels = [];
    for (let i = 0; i < this.props.couriersID.length; i++) {
      let x = this.totalDeliveredParcels(this.props.couriersID[i]);
      localTotalDelParcels.push(x);
    }
    localTotalDelParcels.sort((a, b) =>
      parseInt(Object.values(a)) < parseInt(Object.values(b)) ? 1 : -1
    );
    this.setState({loading:false, sortedTotalDelParcels: localTotalDelParcels });
    console.log(this.state.date_from, this.state.date_to);
    this.props.handleListTotalDelParcels(this.state.sortedTotalDelParcels, this.state.listCouriersPerformance);
  } 

  displaySelection(data) {
    if (!data || data.length === 0) {
      return <div style={{ textAlign: "left" }}>No Selection</div>;
    } else {
      // this.props.handleSelectedCourier(data)
      if (data instanceof Array)
        return (
          <ul style={{ textAlign: "left", margin: 0 }}>
            {data.map((car, i) => (
              <li key={car.vin}>
                {car.ime + " - " + car.grad + " - " + car.total}
              </li>
            ))}
          </ul>
        );
      else
        return (
          <div style={{ textAlign: "left" }}>
            {data.ime + " - " + data.grad + " - " + data.total}
          </div>
        );
    }
  }

  handleShowDialog = () => {
    this.setState({ showDialog: true });
  };

  hideDialog = () => {
    this.setState({ showDialog: false });
  };

  convertDateFormat = str => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };

  componentDidMount = async () => {
    let convertedDate1 = this.convertDateFormat(this.state.date_from)
    let convertedDate2 = this.convertDateFormat(this.state.date_to)

    await this.setState({
      date_from : convertedDate1, date_to: convertedDate2
    })
    console.log("datum:", this.state.date_from)
    await this.listCouriersPerformance()
  }

  render() {
    this.state.sortedTotalDelParcels.map(courier => {
      for (let i in this.props.couriers) {
        if (Object.keys(courier) == this.props.couriers[i].id) {
          courier["id"] = this.props.couriers[i].id;
          courier["total"] = parseInt(Object.values(courier));
          courier["ime"] =
            this.props.couriers[i].ime + " " + this.props.couriers[i].prezime;
          courier["grad"] = this.props.couriers[i].mesto_ime;
        }
      }
    });

    let cols = [
      { field: "ime", header: "Name" },
      { field: "grad", header: "City" },
      { field: "total", header: "Total Delivered Parcels" }
    ];

    let dynamicColumns = cols.map((col, i) => {
      return (
      
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          sortable={true}
          filter={true}
        />
      );
    });

    return(
      <div>
        <p>Resport page</p>
        <Calendar
           dateFormat="yy-mm-dd"
           value={this.state.date_from}
           onChange={e =>
             this.setState({ date_from: this.convertDateFormat(e.value) })
           }
           disabled = {this.state.loading ? true : false}
         ></Calendar>
         <Calendar
          
           dateFormat="yy-mm-dd"
           value={this.state.date_to}
           onChange={e =>
             this.setState({ date_to: this.convertDateFormat(e.value) })
           }
           disabled = {this.state.loading ? true : false}
         ></Calendar>
         <Button label="kopce" onClick={() => this.listCouriersPerformance()} disabled={this.state.loading ? "disabled" : ""}/>


        {this.state.loading ? <ProgressSpinner /> : 
        <div>
         <Link to="/summary">See summary for this data</Link>
         <DataTable
           value={this.state.sortedTotalDelParcels}
           selectionMode="single"
           resizableColumns={true}
           selection={this.state.selected}
           onSelectionChange={e =>
             this.setState({ selected: e.value }, this.handleShowDialog())
           }
           paginator={true}
           rows={10}
          //  stateKey="tablestatedemo-local"
         >
           {dynamicColumns}
 
         </DataTable>
 
         <Dialog
           visible={this.state.showDialog}
           style={{ width: "500px" }}
           header="Courier Short info"
           modal={true}
           closable={true}
           onSelectionChange={e => this.setState({ selected: e.value })}
           onHide={() => this.hideDialog()}
         >
           {this.displaySelection(this.state.selected)}
           <Link to={`/details/${this.state.selected.id}`} style={{ position: "right" }}>
             <button onClick={() =>this.props.handleSelectedCourier(this.state.selected.id, this.state.date_from, this.state.date_to)}  >
               Show more
             </button>
           </Link>
         </Dialog>
          </div>
          }
           
        
        
      </div>
    )
  }
}

export default ReportPage