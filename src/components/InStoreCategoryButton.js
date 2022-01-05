import React, { Component } from "react";
import { subcategoriesAndPics } from "./utils";

export default class InStoreCategoryButton extends Component {
  render() {
    return (
      <div
        onClick={() => this.props.getStoreSubCategory(this.props.funcCatogory)}
        className="inStoreCategoryButton"
      >
        <img
          src={subcategoriesAndPics[this.props.subCategory]}
          alt="Snow"
          //   style="width:50%;"
        ></img>

        <div class="centered">{this.props.subCategory}</div>
      </div>
    );
  }
}
