import React, { Component } from "react";
import { TiChevronLeft, TiChevronRight } from "react-icons/ti";

export default class ScrollButtons extends Component {
  render() {
    let rightArrow =
      this.props.arrowShown !== "left" ? (
        <TiChevronRight
          onMouseDown={() => {
            document.getElementById(this.props.elementID).scrollLeft +=
              this.props.scrollLeft;
          }}
          className="rightScroll"
        />
      ) : (
        <div></div>
      );
    let leftArrow =
      this.props.arrowShown !== "right" ? (
        <TiChevronLeft
          className="leftScroll"
          onMouseDown={() => {
            document.getElementById(this.props.elementID).scrollLeft -=
              this.props.scrollRight;
          }}
        />
      ) : (
        <div></div>
      );
    return (
      <div className="scrollButtons">
        {rightArrow}
        {leftArrow}
      </div>
    );
  }
}
