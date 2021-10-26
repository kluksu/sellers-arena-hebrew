import axios from "axios";
import React, { Component } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import Search from "../components/Search";
import Category from "../components/Category";
import ProductCard from "../components/ProductCard";
import EditItemPage2 from "../pages/EditItemPage2";
import { HashRouter, Route, withRouter } from "react-router-dom";
import { domain } from "../components/utils";

class AddMyItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: "",
      variations: "",
      categories: "",
      fullItemsList: [],
      searchText: "",
    };
  }

  getSearchText = (searchText) => {
    this.setState({ searchText: searchText });
    console.log(this.state);
  };
  componentDidMount = () => {
    console.log(this.props.match);
    let categories = [];
    let categoriesList = {};

    const config = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    axios.get(`${domain}/items/`, config).then((response) => {
      console.log(response); ////////////////////////////////////////////////////////////////////////////////////
      for (let i = 0; i < response.data.results.length; i++) {
        const item = response.data.results[i];
        const category = item.category;
        let subcategory = item.subcategory;
        let fullItem = { category: category, item: item };
        this.setState({
          fullItemsList: this.state.fullItemsList.concat(fullItem),
        });
        if (!(`${category}` in categoriesList)) {
          categoriesList[category] = category;
          categories.push(category);
        }
        //    for (let j = 0; j < item.item_variations.length; j++) {
        //        const variation =  item.item_variations[j];
        //        let fullItem={category:category, item:item, variation:variation}
        //        this.setState({fullItemsList:this.state.fullItemsList.concat(fullItem)})
        //       console.log(categories)
        //    } this.setState({categories:categories})
        //    console.log(this.state.fullItemsList)
      }
      //////////////////////////////////////////////////////////////
    });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    console.log(this.state.fullItemsList);
    let showCategories = [];
    let showItems = [];
    for (let i = 0; i < this.state.categories.length; i++) {
      const category = this.state.categories[i];
      console.log(category);
      if (
        category.toUpperCase().includes(this.state.searchText.toUpperCase())
      ) {
        showCategories.push(
          <Col xl={3} lg={3} md={4} sm={6} xs={1}>
            {" "}
            <Category
              fullItemsList={this.state.fullItemsList}
              category={category}
            ></Category>
          </Col>
        );
      }
    }
    for (let j = 0; j < this.state.fullItemsList.length; j++) {
      const fullItem = this.state.fullItemsList[j];
      if (
        fullItem.item.name
          .toUpperCase()
          .includes(this.state.searchText.toUpperCase())
      ) {
        showItems.push(
          <ProductCard
            item={fullItem.item}
            onclickFunc={this.additMyItems}
            pictures={fullItem.item.image}
            supplier={""}
            productName={fullItem.item.name}
            price={""}
            currency=""
            fullItem={fullItem}
            linkAllAround={`/#/edit_item/${fullItem.item.id}`}
          ></ProductCard>
        );
      }
    } ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
      <>
        <Search
          screenWidth={this.props.screenWidth}
          getSearchText={this.getSearchText}
        ></Search>

        <div className="homePage ">
          <Row className="upperProductEdit">{showCategories}</Row>
          <Row>{showItems}</Row>
        </div>
      </>
    );
  }
}
export default withRouter(AddMyItems);
