import React, { Component } from "react";
import ScrollButtons from "./ScrollButtons";
import { isOverflown } from "./utils";

export default class PostGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOverflown: false,
      scrollWidth: "",
    };
  }
  componentDidUpdate() {
    if (
      this.state.scrollWidth !==
      document.getElementById("postGallery").scrollWidth
    ) {
      this.setState({
        scrollWidth: document.getElementById("postGallery").scrollWidth,
      });

      if (isOverflown("postGallery", "x") === true) {
        this.setState({ isOverflown: true });
      }
    }
  }
  componentDidMount() {
    this.setState({
      elemntWidth: document.getElementById("postGallery").scrollWidth,
    });

    // if (isOverflown("postGallery", "x") === true) {
    //   this.setState({ isOverflown: true });
    // }
  }

  render() {
    return (
      <div className="postGallery">
        <div id={"postGallery"} className="postGallery">
          {this.props.pictures}
        </div>
        {this.state.isOverflown === true ? (
          <ScrollButtons
            elementID={"postGallery"}
            scrollLeft={document.getElementById("postGallery").scrollWidth}
            scrollRight={document.getElementById("postGallery").scrollWidth}
          >
            {" "}
          </ScrollButtons>
        ) : null}
      </div>
    );
  }
}
