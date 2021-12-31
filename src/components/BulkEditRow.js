import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

export default class BulkEditRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: "",
      price: "",
      batch: "",
      buttonVar: "primary",
      buttonText: "עדכן",
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.price !== prevState.price ||
      this.state.batch !== prevState.batch ||
      this.state.stock !== prevState.stock
    ) {
      this.setState({ buttonVar: "primary", buttonText: "עדכן" });
    }
  }
  editVariation = (varID, inStock, price, batch) => {
    this.props
      .patchVariation(varID, inStock, price, batch)
      .then((res) => {
        this.setState({ buttonVar: "success", buttonText: "עודכן בהצלחה!" });
      })
      .catch((error) => {
        this.setState({ buttonVar: "danger", buttonText: "שגיאה" });
      });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  componentDidMount() {
    this.setState({ stock: this.props.variation.amount_in_stock });
    this.setState({ price: this.props.variation.cost_per_item });
    this.setState({ batch: this.props.variation.batch_size });
  }
  render() {
    return (
      <tr>
        <td>{this.props.item.id}</td>

        <td>{this.props.variation.id}</td>

        <td>
          {" "}
          <img src={`${this.props.variation.image}`}></img>
        </td>
        <td>{this.props.item.name}</td>

        <td>
          {" "}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              {this.props.screenWidth <= 1268 ? "מנה" : null}
            </Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="number"
              name="batch"
              //   placeholder={this.props.variation.batch_size}
              value={this.state.batch}
            />
            <Form.Text></Form.Text>
          </Form.Group>
        </td>
        <td>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              {this.props.screenWidth <= 1268 ? "מחיר" : null}
            </Form.Label>
            <Form.Control
              type="number"
              onChange={this.handleChange}
              name="price"
              value={this.state.price}
            />
            <Form.Text></Form.Text>
          </Form.Group>
        </td>
        <td>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              {this.props.screenWidth <= 1268 ? "מלאי" : null}
            </Form.Label>
            <Form.Control
              type="number"
              onChange={this.handleChange}
              name="stock"
              value={this.state.stock}
            />
            <Form.Text></Form.Text>
          </Form.Group>
        </td>
        {/* <td>{this.props.variation.description}</td> */}
        <td>
          <Button
            variant={this.state.buttonVar}
            onClick={() =>
              this.editVariation(
                this.props.variation.id,
                this.state.stock,
                this.state.price,
                this.state.batch
              )
            }
            type="button"
          >
            {" "}
            {this.state.buttonText}
          </Button>
        </td>
        {/* <td>{this.props.variation}</td>
            <td>{this.props.variation}</td>
            <td>{this.props.variation}</td>
            <td>{this.props.variation}</td> */}
      </tr>
    );
  }
}
