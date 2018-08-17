import React, { Component } from "react";
import { connect } from "react-redux";
import { makeDummyShift, updateShifts } from "./actions/shifts";
import PieChart from "react-minimal-pie-chart";
import BarChart from "react-bar-chart";
import Widget from "./Widget";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 500,
      height: 500
    };
  }

  makeDummyShift = () => {
    const shifts = [];
    for (let i = 0; i < 999; i++) {
      shifts.push({
        duration: Math.round(Math.random() * 12),
        status: "UNFILLED"
      });
    }
    this.props.makeDummyShift(shifts);
  };

  getNewStatus = () => {
    this.getNewStatusInterval = setInterval(() => {
      const newShifts = this.props.shifts.result.map(shift => {
        const p = Number(Math.random().toFixed(2));

        if (p <= 0.97) {
        } else if (
          p < (shift.duration > 6 ? 0.97 + 0.03 - 0.01 : 0.97 + 0.03 - 0.02)
        ) {
          shift.status = "CONFIRMED";
        } else if (p < (shift.duration > 6 ? 1 : 0.99)) {
          shift.status = "CANCELLED";
        }
        return shift;
      });

      this.props.updateShifts(newShifts);
    }, 1000);
  };

  componentDidMount() {
    this.makeDummyShift();
    window.onresize = () => {
      this.setState({
        width: document.getElementsByClassName("bar-chart")[0].clientWidth,
        height: document.getElementsByClassName("bar-chart")[0].clientHeight
      });
    };
  }

  componentDidUpdate() {
    clearInterval(this.getNewStatusInterval);
    this.getNewStatus();
  }

  render = () => {
    let unfilledPercent = 33.3;
    let confirmedPercent = 33.3;
    let cancelledPercent = 33.3;

    if (this.props.shifts.result) {
      unfilledPercent = 0;
      confirmedPercent = 0;
      cancelledPercent = 0;
      this.props.shifts.result.map(shift => {
        if (shift.status === "UNFILLED") {
          unfilledPercent += 1;
        }

        if (shift.status === "CONFIRMED") {
          confirmedPercent += 1;
        }

        if (shift.status === "CANCELLED") {
          cancelledPercent += 1;
        }
        return;
      });
    }

    let pieChartData = [
      {
        value: unfilledPercent,
        key: "UNFILLED",
        color: "#F44336"
      },
      {
        value: confirmedPercent,
        key: "CONFIRMED",
        color: "#009688"
      },
      {
        value: cancelledPercent,
        key: "CANCELLED",
        color: "#FFC107"
      }
    ];

    let barChartData = [
      { text: "UNFILLED", value: unfilledPercent },
      { text: "CONFIRMED", value: confirmedPercent },
      { text: "CANCELLED", value: cancelledPercent }
    ];

    return (
      <div>
        <div className="widgets">
          <Widget
            title="Total Number of Unfilled Shifts"
            data={unfilledPercent}
          />
          <Widget
            title="Total Number of Confirmed Shifts"
            data={confirmedPercent}
          />
          <Widget
            title="Total Number of Cancelled Shifts"
            data={cancelledPercent}
          />
          <Widget
            title="Total Number of Confirmed or Unfilled Shifts"
            data={`${confirmedPercent} / ${unfilledPercent}`}
          />
        </div>
        <div className="charts">
          <PieChart data={pieChartData} className="chart" />
          <div className="bar-chart">
            <BarChart
              width={this.state.width}
              height={this.state.height}
              margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
              data={barChartData}
            />
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
  makeDummyShift: shifts => dispatch(makeDummyShift(shifts)),
  updateShifts: newShifts => dispatch(updateShifts(newShifts))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
