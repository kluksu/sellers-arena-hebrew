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
      document.getElementById(`postGallery` + this.props.post.id).scrollWidth
    ) {
      this.setState({
        scrollWidth: document.getElementById(`postGallery` + this.props.post.id)
          .scrollWidth,
      });

      if (isOverflown(`postGallery` + this.props.post.id, "x") === true) {
        this.setState({ isOverflown: true });
      }
    }
  }
  componentDidMount() {
    this.setState({
      elemntWidth: document.getElementById(`postGallery` + this.props.post.id)
        .scrollWidth,
    });

    // if (isOverflown("postGallery", "x") === true) {
    //   this.setState({ isOverflown: true });
    // }
  }

  render() {
    return this.props.pictures.length > 0 ? (
      <div className="postGallery">
        <div id={`postGallery` + this.props.post.id} className="postGallery">
          {this.props.pictures}
          {this.props.pictures}
          {this.props.pictures}
          {this.props.pictures}
          {this.props.pictures}
        </div>
        {this.state.isOverflown === true ? (
          <ScrollButtons
            elementID={`postGallery` + this.props.post.id}
            scrollLeft={
              document.getElementById(`postGallery` + this.props.post.id)
                .offsetWidth
            }
            scrollRight={
              document.getElementById("postGallery" + this.props.post.id)
                .offsetWidth
            }
          >
            {" "}
          </ScrollButtons>
        ) : null}
      </div>
    ) : null;
  }
}
