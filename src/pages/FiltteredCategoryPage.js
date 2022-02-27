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

class FiltteredCategoryPage extends React.Component {
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
      selectedCategory: "",
      searchText: "",
      hasMore: false,
    };
  }
  getSearchText = (searchText) => {
    this.setState({ searchText: searchText });
  };

  filterCategory = (category) => {
    let newPhraseArr = [];
    let splitArr = this.props.match.params.name.split("");
    splitArr.forEach((character) => {
      if (character === " ") {
        newPhraseArr.push("%20");
      } else if (character === "&") {
        newPhraseArr.push("%26");
      } else {
        newPhraseArr.push(character);
      }
    });

    this.setState({ selectedCategory: newPhraseArr.join("") });
  };

  expandManuHideBurger = () => {
    if (this.state.isColapsed === false) {
      this.setState({ isColapsed: true });
    } else {
      this.setState({ isColapsed: false });
    }
  };

  goToStore = () => {};
  searchItems = async () => {
    this.setState({ next: undefined });
    await this.setState({ showList: [] });
    this.getItems();
  };
  getItems = () => {
    this.setState({ hasMore: false });
    const nextfetch =
      this.state.next !== undefined
        ? this.state.next
        : `${domain}/public-items/?limit=25&offset=0&category=${this.state.selectedCategory}&search=${this.state.searchText}`;
    const authorization = !this.props.accessToken
      ? null
      : `Bearer ${this.props.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    axios.get(nextfetch, config).then(
      (response) => {
        // this.setState({ ipmortedItems: response.data.results });
        this.setState({ next: response.data.next });
        if (response.data.results !== null) {
          this.setState({ hasMore: true });
        }
        // for (let i = 0; i < this.state.ipmortedItems.length; i++) {
        //   const item = this.state.ipmortedItems[i];
        // axios
        //   .get(`${domain}/accounts/${item.id}`, config)
        //   .then((response) => {});
        // for (let j = 0; j < item.item_variations.length; j++) {
        //   const variation = item.item_variations[j];

        // this.setState({
        //   variations: this.state.variations.concat(variation),
        // });

        // // let fullItem = {
        // //   item: item,
        // //   variation: variation,
        // //   image: variation.image,
        // // };

        this.setState({
          showList: this.state.showList.concat(response.data.results),
        });
      }
      // }
      // },
      // (error) => {}
    );
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.name !== prevProps.match.params.name) {
      window.location.reload();
    }
    if (this.state.selectedCategory !== prevState.selectedCategory) {
      this.getItems();
    }
  }

  componentDidMount() {
    if (window.innerWidth < 600) {
      this.setState({ isColapsed: true });
    }
    this.filterCategory();
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
    // let cards = [];
    // for (let i = 0; i < this.state.showList.length; i++) {
    //   const element = this.state.showList[i];
    // let shortName =
    //   element.item.name.length > 11
    //     ? element.item.name.slice(12, element.item.name.length)
    //     : element.item.name;
    // cards.push(<ProductCard productName={element.item.name} price="register to see prices"
    // pictures={element.image}>  </ProductCard>)
    let cards =
      this.state.showList.length != 0
        ? this.state.showList.map((item, i) => {
            return item.item_variations.map((variation) => {
              if (!this.props.accessToken) {
                let card =
                  variation.cost_per_item === null ? (
                    <ProductCard
                      key={variation.id}
                      closeGenericModal={this.props.closeGenericModal}
                      openGenericModal={this.props.openGenericModal}
                      userDevice={this.props.userDevice}
                      screenWidth={this.props.screenWidth}
                      item={item}
                      variation={variation}
                      productInfoLink={`/#/StorePage/${item.account}/product_page/${item.id}`}
                      linkAllAround={`/#/StorePage/${item.account}`}
                      currency={""}
                      productName={item.name}
                      price="הרשם  חינם לקבלת מידע נוסף"
                      pictures={variation.image ? variation.image : item.image}
                    >
                      {" "}
                    </ProductCard>
                  ) : (
                    <ProductCard
                      key={variation.id}
                      closeGenericModal={this.props.closeGenericModal}
                      openGenericModal={this.props.openGenericModal}
                      userDevice={this.props.userDevice}
                      screenWidth={this.props.screenWidth}
                      item={item}
                      variation={variation}
                      productInfoLink={`/#/StorePage/${item.account}/product_page/${item.id}`}
                      linkAllAround={`/#/StorePage/${item.account}`}
                      productName={item.name}
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
                    key={variation.id}
                    closeGenericModal={this.props.closeGenericModal}
                    openGenericModal={this.props.openGenericModal}
                    userDevice={this.props.userDevice}
                    screenWidth={this.props.screenWidth}
                    item={item}
                    variation={variation}
                    productInfoLink={`/#/StorePage/${item.account}/product_page/${item.id}`}
                    linkAllAround={`/#/StorePage/${item.account}`}
                    productName={item.name}
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
                  <>
                    {" "}
                    <ProductCard
                      key={variation.id}
                      closeGenericModal={this.props.closeGenericModal}
                      openGenericModal={this.props.openGenericModal}
                      userDevice={this.props.userDevice}
                      screenWidth={this.props.screenWidth}
                      item={item}
                      variation={variation}
                      productInfoLink={`/#/StorePage/${item.account}/product_page/${item.id}`}
                      linkAllAround={`/#/StorePage/${item.account}`}
                      productName={item.name}
                      price="על מנת לראות את המחיר עליך להיות ברשימת אנשי הקשר של ספק זה"
                      currency={""}
                      pictures={variation.image ? variation.image : item.image}
                    >
                      {" "}
                    </ProductCard>
                  </>
                );
            });
          })
        : "";

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
          getSearchText={this.getSearchText}
          searchItems={this.searchItems}
          userDevice={this.props.userDevice}
          screenWidth={this.props.screenWidth}
        ></Search>
        <Row className="categoryPageRow">
          <Col xl={0.1}>
            <ProSidebar
              // style={{ position: "absolute" }}
              collapsed={this.state.isColapsed}
            >
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
          <Col
            className="homePageCol"
            //  style={{ paddingRight: "79px" }}
          >
            <InfiniteScroll
              style={{ overflowX: "hidden" }}
              style={{ paddingLeft: infiniteCrollPaddingLeft }}
              className="homePage"
              dataLength={cards.length}
              next={() => this.getItems()}
              hasMore={this.state.hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={"אין עוד תוצאות"}
            >
              <Row className="homePage">{cards}</Row>
            </InfiniteScroll>
          </Col>
        </Row>
      </>
    );
  }
}
export default withRouter(FiltteredCategoryPage);
