import { DateRangePicker } from "react-date-range";
import React, { Component } from "react";

export default class MyDateRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date() - 1,
    };
  }
  handleSelect = (ranges) => {
    console.log(ranges.selection.startDate, ranges.selection.endDate);
    this.setState({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    });
  };
  render() {
    const selectionRange = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      key: "selection",
    };
    return (
      <DateRangePicker ranges={[selectionRange]} onChange={this.handleSelect} />
    );
  }
}
