import { string } from "prop-types";
import React, { Component } from "react";
import { Form } from "react-bootstrap";

export default class PriceSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: "",
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.price !== prevProps.price) {
      this.setState({ price: this.props.price });
    }
    if (
      this.state.price !== prevState.price &&
      // prevState.price !== "" &&
      this.props.activeAccount.account_type == 3
    ) {
      let changedQuantities = this.props.changedQuantities;

      let quantity =
        changedQuantities !== undefined &&
        changedQuantities[this.props.variation.id] !== undefined
          ? changedQuantities[this.props.variation.id].quantity
          : this.props.quantity;

      let newPrice = this.state.price === "" ? 0 : this.state.price;

      this.props.createDelta(
        this.props.variation.id,
        quantity,
        JSON.parse(+newPrice)
      );
    }
  }
  componentDidMount() {
    this.setState({ price: +this.props.price });
  }
  handleChange = (event) => {
    this.props.activateStageChangesButton();

    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <Form>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Control
            disabled={this.props.isPriceFiledDisabled}
            onChange={this.handleChange}
            className="supplierChangePrice"
            type="number"
            step="0.01"
            placeholder={+this.state.price}
            value={+this.state.price}
            name="price"
          />
        </Form.Group>
      </Form>
    );
  }
}
