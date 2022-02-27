import React, { Component } from "react";
import { Form, Button, Container, Col, Row, Carousel } from "react-bootstrap";
import Ticker from "react-ticker";
import InStoreCategoryButton from "./InStoreCategoryButton";
import MyCarousl from "./MyCarousl";
import {
  handleKeyDown,
  logo,
  logoWithText,
  subcategoriesAndPics,
} from "./utils";
import ScrollButtons from "./ScrollButtons";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollNum: 0,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.scrollNum !== prevState.scrollNum) {
    }
  }
  render() {
    // let ticker =
    //   this.props.screenWidth > 800 ? (
    //     <Ticker mode="chain" className="ticker" direction={"toLeft"}>
    //       {({ index }) => (
    //         <>
    //           <p
    //             style={{
    //               color: " #ffffff",
    //               opacity: 4,
    //               fontSize: "0.1px",
    //             }}
    //           >
    //             {index}
    //             <span>
    //               <img src="https://cdn.pixabay.com/photo/2017/09/07/22/35/lipstick-2726998_960_720.png"></img>
    //             </span>{" "}
    //             <span>
    //               <img src="https://cdn.pixabay.com/photo/2016/06/18/16/30/bread-1465232_960_720.png"></img>
    //             </span>{" "}
    //             <span>
    //               <img src="https://cdn.pixabay.com/photo/2016/11/29/08/41/apple-1868496_960_720.jpg"></img>
    //             </span>{" "}
    //             <span>
    //               <img src="https://cdn.pixabay.com/photo/2016/12/09/11/33/smartphone-1894723_960_720.jpg"></img>
    //             </span>
    //             <span>
    //               <img src="https://cdn.pixabay.com/photo/2014/08/29/14/53/camera-431119_960_720.jpg"></img>
    //             </span>{" "}
    //             <span>
    //               <img src="https://cdn.pixabay.com/photo/2016/11/20/08/03/cactus-1842095_960_720.jpg"></img>
    //             </span>{" "}
    //             <span>
    //               <img src="https://cdn.pixabay.com/photo/2017/12/05/20/43/spring-3000336_960_720.png"></img>
    //             </span>{" "}
    //             <span>
    //               <img src="https://cdn.pixabay.com/photo/2017/12/20/21/42/gift-3030693_960_720.png"></img>
    //             </span>{" "}
    //             <span>
    //               <img src="https://cdn.pixabay.com/photo/2018/03/09/15/57/brush-3211835_960_720.png"></img>{" "}
    //             </span>
    //           </p>{" "}
    //         </>
    //       )}
    //     </Ticker>
    //   ) : null;
    let categoriesArr = [];

    let searchLogo = this.props.screenWidth < 1300 ? "" : logoWithText;
    searchLogo = this.props.screenWidth < 650 ? "" : searchLogo;
    let storeCategoriesButtons = [];
    let carouselItems = [];
    if (this.props.storeSubCategories) {
      this.props.storeSubCategories.forEach((subCategory, i) => {
        let clearAll = subCategory === "כל החנות" ? "warning" : "primary";
        let fontSize = this.props.storeSubCategories.length > 15 ? 10 : 12;
        let variant =
          this.props.activeSubCategory === subCategory ? "success" : clearAll;
        //
        let funcCatogory = subCategory === "כל החנות" ? "" : subCategory;

        carouselItems.push(
          <Carousel.Item>
            {" "}
            <img
              onClick={(e) => {
                this.props.getStoreSubCategory(e, funcCatogory);
              }} // className="d-block w-100"
              src={subcategoriesAndPics[subCategory]}
              alt={subCategory}
            />{" "}
            <Carousel.Caption>
              {" "}
              <h3>{subCategory}</h3>
            </Carousel.Caption>{" "}
          </Carousel.Item>
        );
        categoriesArr.push(
          <div
            className="instoreCategoryNames"
            onClick={(e) => {
              this.props.getStoreSubCategory(e, funcCatogory);
            }}
          >
            {" "}
            <>
              &nbsp; {subCategory} &nbsp;
              {i !== this.props.storeSubCategories.length - 1 ? `${"| "} ` : ""}
            </>{" "}
          </div>
        );
        storeCategoriesButtons.push(
          <>
            <InStoreCategoryButton
              style={{ fontSize: fontSize }}
              funcCatogory={funcCatogory}
              getStoreSubCategory={this.props.getStoreSubCategory}
              // onClick={() => this.props.getStoreSubCategory(funcCatogory)}
              subCategory={subCategory}
            ></InStoreCategoryButton>
          </>
        );
      });
    }
    return (
      <div className="searchPage">
        {/* {ticker} */}{" "}
        <Carousel fade className="storeCategoriesCarousel">
          {carouselItems}
        </Carousel>
        <div className="subcategoryButtonsDiv">
          <div className="subcategoryButtonsDiv" id="subcategoryButtonsDiv">
            {storeCategoriesButtons}
          </div>

          {this.props.storeSubCategories ? (
            <ScrollButtons
              elementID={"subcategoryButtonsDiv"}
              scrollLeft={this.props.screenWidth}
              scrollRight={this.props.screenWidth}
            ></ScrollButtons>
          ) : null}
        </div>
        <Container
          onKeyDown={(event) => handleKeyDown(event, this.props.searchItems)}
          className="searchContainer"
        >
          {/* {searchLogo} */}

          {/* <p>earch for suppliers</p> */}
          <Form className="search">
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                onChange={(event) =>
                  this.props.getSearchText(event.target.value)
                }
                type="text"
                value={this.props.searchText}
                placeholder="...חפש"
              />
            </Form.Group>

            {this.props.searchButton === true ? (
              <Button
                type="button"
                className="w-100"
                onClick={this.props.searchItems}
              >
                חפש
              </Button>
            ) : null}
          </Form>
        </Container>
        <div className="subCategoriesDiv"> {categoriesArr}</div>
      </div>
    );
  }
}
