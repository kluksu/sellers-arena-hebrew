import React, { Component } from "react";
import { isInViewport } from "./utils";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolledToBottom: false,
    };
  }
  componentDidUpdate(prvProps, prevState) {
    if (
      this.state.scrolledToBottom !== prevState.scrolledToBottom &&
      this.state.scrolledToBottom === true
    ) {
      //   alert("!!!!!!!!!!!");
      this.props.runFunction();
    }
  }
  //   componentDidMount() {
  //     window.addEventListener("scroll", this.handleScroll);
  //   }

  //   componentWillUnmount() {
  //     window.removeEventListener("scroll", this.handleScroll);
  //   }
  handleScroll = () => {
    if (isInViewport("lowerTerms") === true) {
      this.setState({ scrolledToBottom: true });
    }
  };
  render() {
    return (
      <div onScroll={this.handleScroll} className="readAllBox">
        {this.props.content}
        <div id="lowerTerms"> </div>
      </div>
    );
  }
}
