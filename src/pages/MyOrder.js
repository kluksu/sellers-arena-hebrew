import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router";
import { domain } from "../components/utils";

class MyOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // getorder=(orderID)=>{
  //     const authorization = !this.props.accessToken
  //     ? null
  //     : `Bearer ${this.props.accessToken}`;
  //   const config = {
  //     headers: { "Content-Type": "application/json", authorization },
  //   };
  // return axios.get(`${domain}/my-orders/${orderID}/`,config)
  // }
  componentDidMount() {
    this.props.getSpecificOrder().then((res) => {});
  }
  render() {
    return <div>{this.props.match.params.id}</div>;
  }
}
export default withRouter(MyOrder);
