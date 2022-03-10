import React, { Component } from "react";

export default class SiteBottom extends Component {
  render() {
    let topics = this.props.topics.map((topic) => {
      return <div>{topic}</div>;
    });
    return <div className="siteBottom">{topics}</div>;
  }
}
