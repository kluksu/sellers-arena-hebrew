import { DateRangePicker } from "react-date-range";
import React, { Component } from "react";

export default class MyDateRange extends Component {
  render() {
    const selectionRange = {
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      key: "selection",
    };
    return (
      <div className="dateRangeDiv">
        <DateRangePicker
          className="no-print"
          ranges={[selectionRange]}
          onChange={this.props.handleSelect}
        />
      </div>
    );
  }
}
