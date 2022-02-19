import React, { Component } from "react";
import ScrollButtons from "./ScrollButtons";

export default class HorizontalScrollBox extends Component {
  render() {
    return (
      <div className="HorizontalScrollBoxContainer">
        <h1> עשוי לעניין אותך</h1>
        <div
          className="HorizontalScrollBoxContainer"
          id={`HorizontalScrollBoxContainer` + this.props.id}
        >
          {this.props.content}
        </div>
        <ScrollButtons
          scrollLeft={"600px"}
          scrollRight={"600px"}
          elementID={`HorizontalScrollBoxContainer` + this.props.id}
        ></ScrollButtons>
      </div>
    );
  }
}
