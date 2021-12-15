import React, { Component } from "react";
import { domain } from "../components/utils";

export default class SubmitItem extends Component {
  uploadVar = () => {
    let productPost = new FormData();
    productPost.append("cost_per_item", this.state.cost_per_item);
    productPost.append("amount_in_stock", this.state.amount_in_stock);
    productPost.append("batch_size", this.state.batch_size);
    productPost.append("variation", this.state.variation);
    productPost.append("discounts", this.props.discounts);
    productPost.append("item", this.props.CurrentUploadItemId); //this.props.CurrentUploadItemId
    if (this.state.blob) {
      productPost.append("image", this.state.newBlob, this.state.newBlob.name);
    }

    this.setState({ itemFormData: productPost });
    for (let pair of productPost.entries()) {
    }
    const config = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    };

    axios.post(`${domain}/item-variations/`, productPost, config).then(
      (response) => {},
      (error) => {}
    );
  };

  render() {
    return <div></div>;
  }
}
