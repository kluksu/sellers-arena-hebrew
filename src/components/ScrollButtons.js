import React, { Component } from "react";
import { TiChevronLeft, TiChevronRight } from "react-icons/ti";

export default class ScrollButtons extends Component {
  render() {
    return (
      <div className="scrollButtons">
        <TiChevronRight
          onMouseDown={() => {
            document.getElementById(this.props.elementID).scrollLeft +=
              this.props.scrollLeft;
          }}
          className="rightScroll"
        />

        <TiChevronLeft
          className="leftScroll"
          onMouseDown={() => {
            document.getElementById(this.props.elementID).scrollLeft -=
              this.props.scrollRight;
          }}
        />
      </div>
    );
  }
}
