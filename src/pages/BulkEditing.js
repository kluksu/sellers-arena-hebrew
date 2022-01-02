import React, { Component } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { GiConsoleController } from "react-icons/gi";
import BulkEditRow from "../components/BulkEditRow";

export default class BulkEditing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myItems: [],
      serachText: "",
    };
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  componentDidMount() {
    this.props.getMyItems().then((res) => {
      this.setState({ myItems: res.data.results });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.activeAccount !== prevProps.activeAccount) {
      this.props.getMyItems().then((res) => {
        this.setState({ myItems: res.data.results });
      });
    }
  }

  render() {
    let rowsArr = [];
    this.state.myItems.forEach((item) => {
      let dataArr = [];
      console.log(item);
      Object.values(item.item_variations).forEach((variation) => {
        let propsArr = Object.values(variation.variation);
        let isPropsIncluds = false;
        propsArr.forEach((prop) => {
          if (
            prop.toUpperCase().includes(this.state.serachText.toUpperCase())
          ) {
            return (isPropsIncluds = true);
          }
        });

        console.log(isPropsIncluds);
        if (
          `${variation.id}`.includes(this.state.serachText) ||
          isPropsIncluds === true ||
          `${item.id}`.includes(this.state.serachText) ||
          variation.description
            .toUpperCase()
            .includes(this.state.serachText.toUpperCase()) ||
          variation.description
            .toUpperCase()
            .includes(this.state.serachText.toUpperCase()) ||
          item.name
            .toUpperCase()
            .includes(this.state.serachText.toUpperCase()) ||
          item.description
            .toUpperCase()
            .toUpperCase()
            .includes(this.state.serachText.toUpperCase())
        ) {
          console.log(variation);
          rowsArr.push(
            <BulkEditRow
              screenWidth={this.props.screenWidth}
              item={item}
              patchVariation={this.props.patchVariation}
              variation={variation}
            ></BulkEditRow>
          );
        }
      });
    });
    return (
      <>
        <div className="myItemsSearch">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label></Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="text"
              name="serachText"
              placeholder="חפש מספר מוצר,שם מוצר, מספר וריאציה, תיאור או ערך לדוגמא 'אדום'"
            />
            <Form.Text></Form.Text>
          </Form.Group>
        </div>
        <div className="BulkEditingPage">
          {/* <Table>
          <thead>
            <tr>
              <th></th>
              <th>קוד וריאציה</th>

              <th>גודל מנה</th>
              <th>מחיר יחידה</th>
              <th>תיאור</th>
            </tr>
          </thead>
        </Table> */}

          <Table className="" hover striped>
            <thead>
              <tr>
                <th>קוד מוצר</th>

                <th>קוד וריאציה</th>

                <th>תמונה</th>
                <th>שם</th>

                <th>גודל מנה</th>
                <th>מחיר יחידה</th>
                <th>מלאי זמין</th>

                {/* <th>תיאור</th> */}
                <th></th>
              </tr>
            </thead>
            <tbody>{rowsArr}</tbody>
          </Table>
        </div>
      </>
    );
  }
}
