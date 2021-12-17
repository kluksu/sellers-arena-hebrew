import React, { Component } from "react";
import MyDateRange from "../components/MyDateRange";

class AllOrders extends Component {
  render() {
    return (
      <div className="allOrdersPage">
        <MyDateRange></MyDateRange>
      </div>
    );
  }
}

export default AllOrders;
