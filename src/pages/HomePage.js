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

  goToStore = () => {
    //    window.location.assign(`/#/storePage/${}`)
  };
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
        : `${domain}/public-items/?limit=3&search=${searchTerm}`;

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
          this.setState({ ipmortedItems: response.data.results });
          this.setState({ itemsCount: response.data.count });
          this.setState({ next: response.data.next });
          for (let i = 0; i < this.state.ipmortedItems.length; i++) {
            const item = this.state.ipmortedItems[i];
            // axios
            //   .get(`${domain}/accounts/${item.id}`, config)
            //   .then((response) => {});
            for (let j = 0; j < item.item_variations.length; j++) {
              const variation = item.item_variations[j];

              this.setState({
                variations: this.state.variations.concat(variation),
              });

              let fullItem = {
                item: item,
                variation: variation,
                image: variation.image,
              };
              this.setState({ showList: this.state.showList.concat(fullItem) });
            }
          }
        }
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

    categoriesAndSubCategories.forEach((category) => {
      showCategories.push(
        <MenuItem>
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
    let cards = [];
    for (let i = 0; i < this.state.showList.length; i++) {
      const element = this.state.showList[i];
      let shortName =
        element.item.name.length > 11
          ? element.item.name.slice(12, element.item.name.length)
          : element.item.name;
      // cards.push(<ProductCard productName={`${shortName}.....`} price="register to see prices"
      // pictures={element.image}>  </ProductCard>)
      /*search if*/
      //  if (
      //   element.item.name
      //     .toUpperCase()
      //     .includes(this.state.searchText.toUpperCase())
      // ) {
      if (!this.props.accessToken) {
        let card =
          element.variation.cost_per_item === null ? (
            <ProductCard
              // type={1}
              userDevice={this.props.userDevice}
              screenWidth={this.props.screenWidth}
              activeAccount={this.props.activeAccount}
              item={element.item}
              variation={element.variation}
              productInfoLink={`/#/StorePage/${element.item.account}/product_page/${element.item.id}`}
              linkAllAround={`StorePage/${element.item.account}`}
              currency={""}
              productName={`${shortName}.....`}
              price="הרשם על מנת לראות את המחיר"
              pictures={element.image}
            >
              {" "}
            </ProductCard>
          ) : (
            <ProductCard
              // type={1}
              userDevice={this.props.userDevice}
              screenWidth={this.props.screenWidth}
              activeAccount={this.props.activeAccount}
              item={element.item}
              variation={element.variation}
              productInfoLink={`/#/StorePage/${element.item.account}/product_page/${element.item.id}`}
              linkAllAround={`StorePage/${element.item.account}`}
              productName={`${shortName}.....`}
              price={element.variation.cost_per_item}
              pictures={element.image}
              currency={element.item.currency}
            >
              {" "}
            </ProductCard>
          );

        cards.push(card);
      } else if (
        this.props.accessToken &&
        element.variation.cost_per_item !== null
      ) {
        cards.push(
          <ProductCard
            // type={1}
            userDevice={this.props.userDevice}
            screenWidth={this.props.screenWidth}
            activeAccount={this.props.activeAccount}
            item={element.item}
            variation={element.variation}
            productInfoLink={`/#/StorePage/${element.item.account}/product_page/${element.item.id}`}
            linkAllAround={`StorePage/${element.item.account}`}
            productName={`${shortName}.....`}
            currency={element.item.currency}
            price={element.variation.cost_per_item}
            pictures={element.image}
          >
            {" "}
          </ProductCard>
        );
      } else if (
        this.props.accessToken &&
        element.variation.cost_per_item == null
      )
        cards.push(
          <>
            {" "}
            <ProductCard
              // type={1}
              userDevice={this.props.userDevice}
              screenWidth={this.props.screenWidth}
              activeAccount={this.props.activeAccount}
              item={element.item}
              variation={element.variation}
              productInfoLink={`/#/StorePage/${element.item.account}/product_page/${element.item.id}`}
              linkAllAround={`StorePage/${element.item.account}`}
              productName={`${shortName}.....`}
              price="על מנת לראות את המחיר עליך להיות ברשימת אנשי הקשר של ספק זה"
              currency={""}
              pictures={element.image}
            >
              {" "}
            </ProductCard>
          </>
        );
      // }
    }

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
          <Col style={{ paddingLeft: "0px" }}>
            <InfiniteScroll
              style={{
                // paddingRight: infiniteCrollPaddingLeft,
                marginRight: "20px",
              }}
              className="homePage"
              dataLength={cards.length}
              next={() => this.getItems()}
              hasMore={true}
              loader={
                <Loader
                  className="m-auto"
                  Color="blue"
                  height={100}
                  type="ThreeDots"
                ></Loader>
              }
            >
              <Row className="homePage"> {cards}</Row>
            </InfiniteScroll>
          </Col>
        </Row>
      </>
    );
  }
}
export default withRouter(HomePage);
