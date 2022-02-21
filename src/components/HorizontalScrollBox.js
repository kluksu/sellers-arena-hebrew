import React, { Component } from "react";
import ScrollButtons from "./ScrollButtons";

export default class HorizontalScrollBox extends Component {
  render() {
    return (
      <div className="HorizontalScrollBoxContainer">
        <h1> {this.props.headline}</h1>
        <div
          className="HorizontalScrollBoxContainer"
          id={`HorizontalScrollBoxContainer${this.props.id}`}
        >
          {this.props.content}
        </div>
        <ScrollButtons
          scrollLeft={window.innerWidth}
          scrollRight={window.innerWidth}
          elementID={`HorizontalScrollBoxContainer${this.props.id}`}
        ></ScrollButtons>
      </div>
    );
  }
}
