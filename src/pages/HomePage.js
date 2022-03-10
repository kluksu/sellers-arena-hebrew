import axios from "axios";
import React, { Component } from "react";
import {
  categoriesAndSubCategories,
  categoriesList,
  domain,
  getData,
} from "../components/utils";
import {
  Container,
  Navbar,
  ListGroup,
  Row,
  Col,
  Button,
  Table,
  Nav,
} from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Search from "../components/Search";
import ProductCard from "../components/ProductCard";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgArrowLeftO } from "react-icons/cg";
import Loader from "react-loader-spinner";
import { uniqueId } from "lodash";
import { v4 as uuidv4 } from "uuid";
import BottomNav from "../components/BottomNav";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ipmortedItems: [],
      variations: [],
      showList: [],
      count: "",
      next: undefined,
      previous: "",
      isColapsed: false,
      searchText: "",
      itemsCount: this.getRandomNumberBetween(1, 300),
    };
  }
  componentDidUpdate = async (prevProps, prevState) => {
    if (this.props.accessToken !== prevProps.accessToken) {
      await this.setState({ showList: [], next: undefined });
      this.getItems();
    }
  };
  getSearchText = (searchText) => {
    this.setState({ searchText: searchText });
  };

  expandManuHideBurger = () => {
    if (this.state.isColapsed === false) {
      this.setState({ isColapsed: true });
    } else {
      this.setState({ isColapsed: false });
    }
  };
  getRandomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  goToStore = () => {};
  searchItems = async () => {
    this.setState({ next: undefined });
    await this.setState({ showList: [] });
    this.getItems();
  };
  getItems = () => {
    let random = this.getRandomNumberBetween(1, this.state.itemsCount);

    let searchTerm = this.state.searchText;
    // const nextfetch = `${domain}/public-items/?limit=3&offset=${random}`;
    const nextfetch =
      this.state.next !== undefined
        ? this.state.next
        : `${domain}/public-items/?limit=20&search=${this.state.searchText}`;

    const authorization = !this.props.accessToken
      ? null
      : `Bearer ${this.props.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };

    axios
      .get(nextfetch, config)
      .then(
        (response) => {
          // this.setState({ ipmortedItems: response.data.results });
          this.setState({ itemsCount: response.data.count });
          this.setState({ next: response.data.next });
          // for (let i = 0; i < response.data.results.length; i++) {
          //   const item = response.data.results[i];
          //   // axios
          //   //   .get(`${domain}/accounts/${item.id}`, config)
          //   //   .then((response) => {});
          //   for (let j = 0; j < item.item_variations.length; j++) {
          //     const variation = item.item_variations[j];

          //     // this.setState({
          //     //   variations: this.state.variations.concat(variation),
          //     // });

          //     let fullItem = {
          //       item: item,
          //       variation: variation,
          //       image: variation.image,
          //     };

          this.setState({
            showList: this.state.showList.concat(response.data.results),
          });
        }
        // }
        // }
        // () => {
        //   this.getItems();
        // }
      )
      .catch(() => {
        // this.getItems();
      });
  };

  componentDidMount() {
    if (window.innerWidth < 600) {
      this.setState({ isColapsed: true });
    }
    this.getItems();
  }
  render() {
    let infiniteCrollPaddingLeft =
      this.props.screenWidth < 500 ? "0px" : "26px";
    let toggleIcon =
      this.state.isColapsed === true ? (
        <GiHamburgerMenu onClick={this.expandManuHideBurger} />
      ) : (
        <CgArrowLeftO onClick={this.expandManuHideBurger} />
      );
    const authorization = !this.props.accessToken
      ? null
      : `Bearer ${this.props.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    //  let showSubCategories=[]
    let showCategories = [];

    categoriesAndSubCategories.forEach((category, i) => {
      showCategories.push(
        <MenuItem key={i}>
          <Link to={`/category/${Object.keys(category)}`} />
          {Object.keys(category)}
        </MenuItem>
      );
      //
      //

      //  if((Object.keys(category)[0]===this.state.category)){
      //    Object.values(category).forEach(categoryObj => {
      //      categoryObj.forEach(subcategory => {

      //    showSubCategories.push(<option value={subcategory}>{subcategory}</option>)
      //  });}); }
    });
    // let cards = [];
    // for (let i = 0; i < this.state.showList.length; i++) {
    //   const element = this.state.showList[i];

    // cards.push(<ProductCard productName={`${item.name}.....`} price="register to see prices"
    // pictures={element.image}>  </ProductCard>)
    /*search if*/
    //  if (
    //   element.item.name
    //     .toUpperCase()
    //     .includes(this.state.searchText.toUpperCase())
    // ) {
    let cards =
      this.state.showList.length != 0
        ? this.state.showList.map((item, i) => {
            return item.item_variations.map((variation) => {
              if (!this.props.accessToken) {
                let card =
                  variation.cost_per_item === null ? (
                    <ProductCard
                      // type={1}
                      key={uuidv4()}
                      closeGenericModal={this.props.closeGenericModal}
                      openGenericModal={this.props.openGenericModal}
                      userDevice={this.props.userDevice}
                      screenWidth={this.props.screenWidth}
                      activeAccount={this.props.activeAccount}
                      item={item}
                      variation={variation}
                      productInfoLink={`/#/StorePage/${item.account}/product_page/${item.id}`}
                      linkAllAround={`/#/StorePage/${item.account}`}
                      currency={""}
                      productName={`${item.name}`}
                      price="הרשם  חינם לקבלת מידע נוסף"
                      pictures={variation.image ? variation.image : item.image}
                    >
                      {" "}
                    </ProductCard>
                  ) : (
                    <ProductCard
                      // type={1}
                      key={uuidv4()}
                      closeGenericModal={this.props.closeGenericModal}
                      openGenericModal={this.props.openGenericModal}
                      userDevice={this.props.userDevice}
                      screenWidth={this.props.screenWidth}
                      activeAccount={this.props.activeAccount}
                      item={item}
                      variation={variation}
                      productInfoLink={`/#/StorePage/${item.account}/product_page/${item.id}`}
                      linkAllAround={`/#/StorePage/${item.account}`}
                      productName={`${item.name}`}
                      price={variation.cost_per_item}
                      pictures={variation.image ? variation.image : item.image}
                      currency={item.currency}
                    >
                      {" "}
                    </ProductCard>
                  );

                return card;
              } else if (
                this.props.accessToken &&
                variation.cost_per_item !== null
              ) {
                return (
                  <ProductCard
                    // type={1}
                    key={uuidv4()}
                    closeGenericModal={this.props.closeGenericModal}
                    openGenericModal={this.props.openGenericModal}
                    userDevice={this.props.userDevice}
                    screenWidth={this.props.screenWidth}
                    activeAccount={this.props.activeAccount}
                    item={item}
                    variation={variation}
                    productInfoLink={`/#/StorePage/${item.account}/product_page/${item.id}`}
                    linkAllAround={`/#/StorePage/${item.account}`}
                    productName={`${item.name}`}
                    currency={item.currency}
                    price={variation.cost_per_item}
                    pictures={variation.image ? variation.image : item.image}
                  >
                    {" "}
                  </ProductCard>
                );
              } else if (
                this.props.accessToken &&
                variation.cost_per_item == null
              )
                return (
                  <ProductCard
                    // type={1}
                    key={uuidv4()}
                    closeGenericModal={this.props.closeGenericModal}
                    openGenericModal={this.props.openGenericModal}
                    userDevice={this.props.userDevice}
                    screenWidth={this.props.screenWidth}
                    activeAccount={this.props.activeAccount}
                    item={item}
                    variation={variation}
                    productInfoLink={`/#/StorePage/${item.account}/product_page/${item.id}`}
                    linkAllAround={`/#/StorePage/${item.account}`}
                    productName={`${item.name}`}
                    price="על מנת לראות את המחיר עליך להיות ברשימת אנשי הקשר של ספק זה"
                    currency={""}
                    pictures={variation.image ? variation.image : item.image}
                  >
                    {" "}
                  </ProductCard>
                );
            });
          })
        : "";

    // }
    // }

    // {  <Col xl={4} className="productCardContainer">
    //   <img src={this.props.pictures} alt="product picture"/>
    //   <div className= "lowerProductCard">
    //   <div >{this.props.productName}</div>
    //   <div>{this.props.currency}</div>
    //   </div>
    //   </Col>}

    return (
      <>
        {/* <Container>
                <ListGroup >
                <ListGroup.Item>{category}</ListGroup.Item>
                    
                </ListGroup>

                </Container> */}
        <Search
          searchText={this.state.searchText}
          searchItems={this.searchItems}
          screenWidth={this.props.screenWidth}
          getSearchText={this.getSearchText}
        ></Search>
        <Row style={{ marginLeft: "0px" }}>
          <Col xl={0.1}>
            <ProSidebar collapsed={this.state.isColapsed}>
              <Menu>
                <MenuItem> {toggleIcon} </MenuItem>
              </Menu>
              <Menu
                iconShape="circle"
                onMouseLeave={() => this.setState({ isColapsed: true })}
                onMouseOver={() => this.setState({ isColapsed: false })}
              >
                {/* <SubMenu title="Components" >
    </SubMenu> */}
                {showCategories}
                {/* <MenuItem>Component 1</MenuItem>
      <MenuItem>Component 2</MenuItem> */}
              </Menu>
            </ProSidebar>
          </Col>
          <Col className="homePageCol" style={{ paddingLeft: "0px" }}>
            <InfiniteScroll
              // scrollThreshold={0.1}
              style={{
                // paddingRight: infiniteCrollPaddingLeft,
                marginRight: "20px",
              }}
              className="homePage"
              dataLength={cards.length}
              next={() => this.getItems()}
              hasMore={true}
              endMessage={"אין עוד תוצאות"}
              loader={
                this.state.next !== null ? (
                  <Loader
                    className="m-auto"
                    Color="blue"
                    height={100}
                    type="ThreeDots"
                  ></Loader>
                ) : (
                  "אין מוצרים נוספים"
                )
              }
            >
              <Row className="homePage"> {cards}</Row>
            </InfiniteScroll>
          </Col>
        </Row>
        {/* <BottomNav></BottomNav> */}
      </>
    );
  }
}
export default withRouter(HomePage);
