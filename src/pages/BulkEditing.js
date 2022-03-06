import axios from "axios";
import React, { Component } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { GiConsoleController } from "react-icons/gi";
import InfiniteScroll from "react-infinite-scroll-component";
import BulkEditRow from "../components/BulkEditRow";
import Search from "../components/Search";
import { domain } from "../components/utils";

export default class BulkEditing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myItems: [],
      next: undefined,
      searchText: "",
      activeSubCategory: "",
      storeSubCategories: ["כל החנות"],
    };
  }
  getSearchText = (searchText) => {
    this.setState({ searchText: searchText });
  };
  getStoreSubCategory = (e, subCategory) => {
    this.setState({ activeSubCategory: subCategory });
    // window.scrollTo(0, document.getElementById("productCardsRow").scrollHeight);
    document.getElementById("productCardsRow").scrollIntoView();
  };
  searchItems = async () => {
    await this.setState({ next: undefined });
    await this.setState({ myItems: [] });

    await this.getMyItems();
    // this.setState({ searchText: "" });
  };
  getStoreCategoriesList = async (accountID) => {
    axios.get(`${domain}/account-subcategories/${accountID}/`).then((res) => {
      res.data.results.forEach((pair) => {
        if (!this.state.storeSubCategories.includes(pair["subcategory"])) {
          this.setState({
            storeSubCategories: this.state.storeSubCategories.concat(
              pair["subcategory"]
            ),
          });
        }
      });
    });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  componentDidMount() {
    if (this.props.activeAccount) {
      this.getStoreCategoriesList(this.props.activeAccount.id);
      this.getMyItems();
    }
  }
  componentDidUpdate = async (prevProps, prevState) => {
    if (this.props.activeAccount !== prevProps.activeAccount) {
      this.getMyItems();
      this.getStoreCategoriesList(this.props.activeAccount.id);
    }
    if (this.state.activeSubCategory !== prevState.activeSubCategory) {
      await this.setState({ myItems: [], next: undefined });

      this.getMyItems();
    }
  };
  getMyItems = () => {
    console.log(this.state.myItems.length);
    const config = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    let path =
      this.state.next !== undefined
        ? this.state.next
        : `${domain}/items/?limit=20&account_id=${this.props.activeAccount.id}&search=${this.state.searchText}&subcategory=${this.state.activeSubCategory}`;
    axios.get(path, config).then(async (response) => {
      this.setState({ next: response.data.next });
      this.setState({
        myItems: this.state.myItems.concat(response.data.results),
      });
    });
  };

  render() {
    // if (this.state.myItems.length !== 0) {
    //   window.onscroll = function (ev) {
    //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    //       // alert();
    //       //
    //       // if (this.state.next !== null) {
    //       this.getMyItems();
    //       // }
    //     }
    //   };
    // }

    let rowsArr = [];
    if (this.state.myItems.length > 0) {
      this.state.myItems.forEach((item) => {
        item.item_variations.forEach((variation, i) => {
          rowsArr.push(
            <BulkEditRow
              screenWidth={this.props.screenWidth}
              item={item}
              patchVariation={this.props.patchVariation}
              variation={variation}
            ></BulkEditRow>
          );
        });
      });
    }

    return (
      <>
        <div className="myItemsSearch">
          {/* <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label></Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="text"
              name="serachText"
              placeholder="חפש מספר מוצר,שם מוצר, מספר וריאציה, תיאור או ערך לדוגמא 'אדום'"
            />
            <Form.Text></Form.Text>
          </Form.Group> */}
          <Search
            searchText={this.state.searchText}
            searchButton={false}
            searchItems={this.searchItems}
            screenWidth={this.props.screenWidth}
            screenWidth={this.props.screenWidth}
            activeSubCategory={this.state.activeSubCategory}
            getStoreSubCategory={this.getStoreSubCategory}
            storeSubCategories={this.state.storeSubCategories}
            getSearchText={this.getSearchText}
          ></Search>
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
            {/* <thead>
              <tr>
                <th>קוד מוצר</th>

                <th>קוד וריאציה</th>

                <th>תמונה</th>
                <th>שם</th>

                <th>גודל מנה</th>
                <th>מחיר יחידה</th>
                <th>מלאי זמין</th>

                {/* <th>תיאור</th> */}
            {/* <th></th>
              </tr>
            </thead>
            <tbody>  */}
            <InfiniteScroll
              style={{ width: "100vw" }} //To put endMessage and loader to the top.
              // className="productCardsRow"
              dataLength={rowsArr.length}
              next={
                this.state.myItems.length !== 0 ? () => this.getMyItems() : ""
              }
              hasMore={
                true
                // this.state.next !== null ? true : false
              }
              loader={this.state.next !== null ? "loader" : "אין עוד מוצרים"}
            >
              {rowsArr}
            </InfiniteScroll>
            {/* </tbody> */}
          </Table>
        </div>
      </>
    );
  }
}
