import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

export default class QuantitySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: 0,
      notice: "",
    };
  }
  keepBatch = (event) => {
    if (this.props.activateStageChangesButton) {
      this.props.activateStageChangesButton();
    }
    this.setState({ units: event.target.value });
    let firstValue = event.target.value;
    if (
      event.target.value !== this.state.units &&
      event.target.value % this.props.variation.batch_size !== 0
    ) {
      setTimeout(() => {
        let sum =
          Math.floor(event.target.value / this.props.variation.batch_size) *
          this.props.variation.batch_size;
        this.setState({ units: sum });
        if (
          (firstValue / this.props.variation.batch_size) *
            this.props.variation.batch_size -
            sum !==
          0
        ) {
          this.setState({
            notice: `${Math.floor(
              (firstValue / this.props.variation.batch_size) *
                this.props.variation.batch_size -
                sum
            )}
           יחידות הוסרו (גודל מנה הוא ${this.props.variation.batch_size})`,
          });
        } else {
          this.setState({ notice: "" });
        }
      }, 3500);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
  };
  componentDidMount() {
    this.setState({ units: this.props.value });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.value !== prevProps.value) {
      this.setState({ units: this.props.value });
    }
    if (this.state.units !== prevState.units && this.props.getCartProducts) {
      this.props.getCartProducts(this.props.variation.id, this.state.units);
    }
    // if (this.state.notice !== prevState.notice) {
    //   this.props.getNotice(this.state.notice);
    // }

    if (
      this.state.units !== prevState.units &&
      this.props.isChangable === true
      // &&
      // prevState.units !== 0
    ) {
      let changedQuantities = JSON.stringify(this.props.changedQuantities);

      let price =
        changedQuantities !== undefined &&
        changedQuantities[this.props.variation.id] !== undefined
          ? changedQuantities[this.props.variation.id].cost_per_item
          : this.props.price;
      this.props.createDelta(this.props.variation.id, this.state.units, price);
      console.log("!!!!!!!!!!!");
    }
  }

  addQuantity = () => {
    if (this.props.activateStageChangesButton) {
      this.props.activateStageChangesButton();
    }
    console.log();
    if (this.props.variation.batch_size) {
      this.setState({
        units: this.state.units + parseInt(this.props.variation.batch_size),
      });
    }
  };
  decreaseQuantity = () => {
    if (this.props.activateStageChangesButton) {
      this.props.activateStageChangesButton();
    }
    if (this.props.variation.batch_size && this.state.units > 0) {
      this.setState({
        units: this.state.units - parseInt(this.props.variation.batch_size),
      });
    }
  };

  render() {
    if (!this.props.activeAccount) {
      return null;
    } else {
      return (
        <>
          <div className="CardUnitsForm">
            <Button
              type="button"
              variant="primary"
              onClick={this.decreaseQuantity}
            >
              -
            </Button>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Control
                  onChange={this.keepBatch}
                  type="text"
                  placeholder={this.state.units}
                  value={this.state.units}
                  name="units"
                />
              </Form.Group>
            </Form>
            <Button type="button" variant="primary" onClick={this.addQuantity}>
              +
            </Button>
          </div>
          <p className="FormRejects">{this.state.notice}</p>
        </>
      );
    }
  }
}
