import axios from "axios";
import React, { Component } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { GiConsoleController } from "react-icons/gi";
import BulkEditRow from "../components/BulkEditRow";
import BulkItemsRow from "../components/BulkItemsRow";
import { categoriesAndSubCategories, domain } from "../components/utils";

export default class BulkItemsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myItems: [],
      serachText: "",
      selectedItems: {},
      allSelected: false,
      changesObj: {},
      //   "name": "string",
      //   "description": "string",
      // currency: "ils",
      category: "",
      subcategory: "",
      //   "account_id": 0,
      visibility: "",
      //   "image": "string"
      updatedItems: [],
    };
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
  createEditArr = (boolean, id) => {
    this.setState((prevState) => {
      let selectedItems = Object.assign({}, prevState.selectedItems); // creating copy of state variable jasper
      selectedItems[id] = boolean; // update the name property, assign a new value
      this.setState({ selectedItems: selectedItems });
    });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onStart = () => {
    this.props.getMyItems().then((res) => {
      this.setState({ myItems: res.data.results });
      res.data.results.forEach((item) => {
        this.setState((prevState) => {
          let obj = Object.assign({}, prevState.selectedItems); // creating copy of state variable jasper
          obj[item.id] = false; // update the name property, assign a new value
          this.setState({ selectedItems: obj });
          console.log(obj);
        });
      });
    });
  };
  componentDidMount() {
    this.onStart();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.subcategory !== (prevState.subcategory && "")) {
      console.log(this.state.subcategory);
    }
    if (this.state.category !== (prevState.category && "")) {
      console.log(this.state.category);
    }
    if (this.state.visibility !== (prevState.visibility && {})) {
      console.log(this.state.visibility);
    }
    if (this.props.activeAccount !== prevProps.activeAccount) {
      this.onStart();
    }
    if (this.state.selectedItems !== prevState.selectedItems) {
      console.log(this.state.selectedItems);
    }
    if (this.state.allSelected !== prevState.allSelected) {
      console.log(this.state.allSelected);
      Object.keys(this.state.selectedItems).forEach((item) => {
        console.log(item);
        this.setState((prevState) => {
          let obj = Object.assign({}, prevState.selectedItems);
          console.log(obj[item]); // creating copy of state variable jasper
          obj[item] = this.state.allSelected;
          console.log(obj[item]); // creating copy of state variable jasper
          // update the name property, assign a new value
          this.setState({ selectedItems: obj });
        });
      });
    }
  }
  editAll = () => {
    this.setState({ updatedItems: [] });
    let counter = 0;
    Object.entries(this.state.selectedItems).forEach((item, i) => {
      if (item[1] === true) {
        counter++;
        let productPost = new FormData();
        // productPost.append("name", this.state.productName);
        // productPost.append("description", this.state.description);
        // productPost.append("currency", this.state.currency);
        if (this.state.category !== "") {
          productPost.append("category", this.state.category);
        }

        if (this.state.subcategory !== "") {
          productPost.append("subcategory", this.state.subcategory);
        }

        // productPost.append("account_id", this.props.activeAccount.id);
        if (this.state.visibility !== "") {
          productPost.append("visibility", this.state.visibility);
        }

        // if (this.state.newBlob) {
        //   productPost.append("image", this.state.newBlob, this.state.newBlob.name);
        // } else {
        // }

        // this.setState({ itemFormData: productPost });

        const config = {
          headers: {
            Authorization: `Bearer ${this.props.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        };

        axios.patch(`${domain}/items/${item[0]}/`, productPost, config).then(
          (res) => {
            this.setState({
              updatedItems: this.state.updatedItems.concat(res.data.id),
            });
            if (this.state.updatedItems.length === counter) {
              this.props.openGenericModal(
                "השינויים נוספו בהצלחה",
                `מוצרים ${this.state.updatedItems} עודכנו`
              );
            } else {
              this.props.openGenericModal(
                "  אופס",
                `הייתה בעיה, אם הבעיה נמשכת נסה לרענן את העמוד ונסה שנית, `
              );
            }
            console.log(res);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  };
  render() {
    let rowsArr = [];

    this.state.myItems.forEach((item) => {
      let isVarInfoIncluds = false;
      let isPropsIncluds = false;

      Object.values(item.item_variations).forEach((variation) => {
        if (
          `${variation.id}`.includes(this.state.serachText) ||
          variation.description
            .toUpperCase()
            .includes(this.state.serachText.toUpperCase())
        ) {
          return (isVarInfoIncluds = true);
        }
        console.log(item);
        let propsArr = Object.values(variation.variation);
        propsArr.forEach((prop) => {
          if (
            prop.toUpperCase().includes(this.state.serachText.toUpperCase())
          ) {
            return (isPropsIncluds = true);
          }
        });
      });

      if (
        isPropsIncluds === true ||
        isVarInfoIncluds === true ||
        `${item.id}`.includes(this.state.serachText) ||
        item.name.toUpperCase().includes(this.state.serachText.toUpperCase()) ||
        item.description
          .toUpperCase()
          .toUpperCase()
          .includes(this.state.serachText.toUpperCase())
      ) {
        rowsArr.push(
          <BulkItemsRow
            isSelected={this.state.selectedItems[item.id]}
            selectedItems={this.state.selectedItems}
            allSelected={this.state.allSelected}
            createEditArr={this.createEditArr}
            item={item}
          ></BulkItemsRow>
        );

        // <BulkEditRow
        //   screenWidth={this.props.screenWidth}
        //   item={item}
        //   patchVariation={this.props.patchVariation}
        //   variation={variation}
        // ></BulkEditRow>
      }
    });
    let showSubCategories = [];
    let showCategories = [];

    categoriesAndSubCategories.forEach((category) => {
      showCategories.push(
        <option value={Object.keys(category)}>{Object.keys(category)}</option>
      );

      if (Object.keys(category)[0] === this.state.category) {
        Object.values(category).forEach((categoryObj) => {
          categoryObj.forEach((subcategory) => {
            showSubCategories.push(
              <option value={subcategory}>{subcategory}</option>
            );
          });
        });
      }
    });
    const priceForAll = '{"price":1,"item":1}';
    const priceForVerified = '{"price":5,"item":1}';
    const sellerContacts = '{"price":3,"item":1}';
    const noBody = '{"price":4,"item":1}';
    const itemForVerified = '{"price":2,"item":2}';
    return (
      <>
        <div className="myItemsSearch">
          <Row>
            <Form.Group
              className="m-auto"
              className="mb-3"
              controlId="formBasicEmail"
            >
              <Form.Label></Form.Label>
              <Form.Control
                onChange={this.handleChange}
                type="text"
                name="serachText"
                placeholder="search.."
              />
              <Form.Text></Form.Text>
            </Form.Group>
          </Row>

          <Row>
            {/* <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>מטבע</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                value={this.state.currency}
                as="select"
                name="currency"
              >
                <option value={"ils"}>NIS ₪</option>

                <option value="usd">USD $</option>
                <option>EU €</option>
                <option>GBP £ </option>
              </Form.Control>
            </Form.Group> */}
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label> קטגוריה ראשית</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                as="select"
                name="category"
              >
                <option value={""}>----------</option>
                {showCategories}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label> קטגוריה משנית</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                as="select"
                value={this.state.subcategory}
                name="subcategory"
              >
                <option value={""}>-----------</option>
                {showSubCategories}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>מי יכול לראות את המחיר</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                as="select"
                value={this.state.visibility}
                name="visibility"
              >
                <option value={""}>------------------</option>

                <option value={priceForAll}>כולם</option>
                <option value={priceForVerified}>
                  רק משתמשים רשומים (מומלץ){" "}
                </option>
                {/* <option>contacts only </option>
              <option>only me (and my staff)</option> */}
              </Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Button type="button" onClick={this.editAll}>
              {" "}
              שמור שינויים
            </Button>
          </Row>
          <Row>
            {Object.entries(this.state.selectedItems).map((item) => {
              console.log(item);
              if (item[1] === true) {
                return <div>{item[0]}, </div>;
              }
            })}
          </Row>
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

                {/* <th>קוד וריאציה</th> */}

                <th>תמונה</th>
                <th>שם</th>

                <th> מטבע</th>
                <th> נראות</th>
                <th> קטגוריה</th>
                <th> תת קטגוריה </th>

                {/* <th>תיאור</th> */}
                <th>
                  {" "}
                  {/* <input
                    onChange={(e) => this.handleInputChange(e)}
                    name="allSelected"
                    checked={this.state.allSelected}
                    type="checkbox"
                  ></input> */}
                </th>
              </tr>
            </thead>
            <tbody>{rowsArr}</tbody>
          </Table>
        </div>
      </>
    );
  }
}
