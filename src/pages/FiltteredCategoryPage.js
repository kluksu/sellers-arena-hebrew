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
    };
  }
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
    console.log(newPhraseArr.join(""));

    this.setState({ selectedCategory: newPhraseArr.join("") });
  };

  expandManuHideBurger = () => {
    if (this.state.isColapsed === false) {
      this.setState({ isColapsed: true });
    } else {
      this.setState({ isColapsed: false });
    }
  };

  goToStore = () => {
    //    window.location.assign(`/#/storePage/${}`)
  };
  getItems = () => {
    console.log(this.props.match.params);
    const nextfetch =
      this.state.next !== undefined
        ? this.state.next
        : `${domain}/public-items/?limit=3&offset=0&category=${this.state.selectedCategory}`;
    const authorization = !this.props.accessToken
      ? null
      : `Bearer ${this.props.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    axios.get(nextfetch, config).then(
      (response) => {
        console.log(response);
        this.setState({ ipmortedItems: response.data.results });
        this.setState({ next: response.data.next });
        for (let i = 0; i < this.state.ipmortedItems.length; i++) {
          const item = this.state.ipmortedItems[i];
          axios
            .get(`${domain}/accounts/${item.id}`, config)
            .then((response) => {
              console.log(response);
            });
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
      },
      (error) => {
        console.log(error);
      }
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
    console.log(this.props.match.params);
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
    console.log(categoriesAndSubCategories);
    categoriesAndSubCategories.forEach((category) => {
      showCategories.push(
        <MenuItem>
          <Link to={`/category/${Object.keys(category)}`} />
          {Object.keys(category)}
        </MenuItem>
      );
      //  console.log(Object.keys(category)[0])
      //  console.log(this.state.category)

      //  if((Object.keys(category)[0]===this.state.category)){
      //    Object.values(category).forEach(categoryObj => {
      //      categoryObj.forEach(subcategory => {

      //    showSubCategories.push(<option value={subcategory}>{subcategory}</option>)
      //  });}); }
    });
    let cards = [];
    for (let i = 0; i < this.state.showList.length; i++) {
      const element = this.state.showList[i];
      // let shortName =
      //   element.item.name.length > 11
      //     ? element.item.name.slice(12, element.item.name.length)
      //     : element.item.name;
      // cards.push(<ProductCard productName={element.item.name} price="register to see prices"
      // pictures={element.image}>  </ProductCard>)
      if (!this.props.accessToken) {
        let card =
          element.variation.cost_per_item === null ? (
            <ProductCard
              userDevice={this.props.userDevice}
              screenWidth={this.props.screenWidth}
              item={element.item}
              variation={element.variation}
              productInfoLink={`/#/StorePage/${element.item.account}/product_page/${element.item.id}`}
              linkAllAround={`/#/StorePage/${element.item.account}`}
              currency={""}
              productName={element.item.name}
              price="register to see prices"
              pictures={element.image}
            >
              {" "}
            </ProductCard>
          ) : (
            <ProductCard
              userDevice={this.props.userDevice}
              screenWidth={this.props.screenWidth}
              item={element.item}
              variation={element.variation}
              productInfoLink={`/#/StorePage/${element.item.account}/product_page/${element.item.id}`}
              linkAllAround={`/#/StorePage/${element.item.account}`}
              productName={element.item.name}
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
            userDevice={this.props.userDevice}
            screenWidth={this.props.screenWidth}
            item={element.item}
            variation={element.variation}
            productInfoLink={`/#/StorePage/${element.item.account}/product_page/${element.item.id}`}
            linkAllAround={`/#/StorePage/${element.item.account}`}
            productName={element.item.name}
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
              userDevice={this.props.userDevice}
              screenWidth={this.props.screenWidth}
              item={element.item}
              variation={element.variation}
              productInfoLink={`/#/StorePage/${element.item.account}/product_page/${element.item.id}`}
              linkAllAround={`/#/StorePage/${element.item.account}`}
              productName={element.item.name}
              price="to see price add member to your contacts"
              currency={""}
              pictures={element.image}
            >
              {" "}
            </ProductCard>
          </>
        );
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
          userDevice={this.props.userDevice}
          screenWidth={this.props.screenWidth}
        ></Search>
        <Row>
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
              style={{ paddingLeft: infiniteCrollPaddingLeft }}
              className="homePage"
              dataLength={cards.length}
              next={() => this.getItems()}
              hasMore={true}
              loader={<h4>Loading...</h4>}
            >
              <Row>{cards}</Row>
            </InfiniteScroll>
          </Col>
        </Row>
      </>
    );
  }
}
export default withRouter(FiltteredCategoryPage);
