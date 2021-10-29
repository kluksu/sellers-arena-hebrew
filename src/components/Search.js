import React, { Component } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import Ticker from "react-ticker";
import { logo, logoWithText } from "./utils";

export default class Search extends Component {
  render() {
    // let ticker =
    // this.props.screenWidth > 800 ? (
    //   <Ticker mode="chain" className="ticker" direction={"toLeft"}>
    //     {({ index }) => (
    //       <>
    //         <p
    //           style={{
    //             color: " #ffffff",
    //             opacity: 4,
    //             fontSize: "0.1px",
    //           }}
    //         >
    //           {index}
    //         </p>{" "}
    //         <img src="https://cdn.pixabay.com/photo/2017/09/07/22/35/lipstick-2726998_960_720.png"></img>
    //         <img src="https://cdn.pixabay.com/photo/2016/06/18/16/30/bread-1465232_960_720.png"></img>
    //         <img src="https://cdn.pixabay.com/photo/2016/11/29/08/41/apple-1868496_960_720.jpg"></img>
    //         <img src="https://cdn.pixabay.com/photo/2016/12/09/11/33/smartphone-1894723_960_720.jpg"></img>
    //         <img src="https://cdn.pixabay.com/photo/2014/08/29/14/53/camera-431119_960_720.jpg"></img>
    //         <img src="https://cdn.pixabay.com/photo/2016/11/20/08/03/cactus-1842095_960_720.jpg"></img>
    //         <img src="https://cdn.pixabay.com/photo/2017/12/05/20/43/spring-3000336_960_720.png"></img>
    //         <img src="https://cdn.pixabay.com/photo/2017/12/20/21/42/gift-3030693_960_720.png"></img>
    //         <img src="https://cdn.pixabay.com/photo/2018/03/09/15/57/brush-3211835_960_720.png"></img>{" "}
    //       </>
    //     )}
    //   </Ticker>
    // ) : null;
    let searchLogo = this.props.screenWidth < 1300 ? "" : logoWithText;
    searchLogo = this.props.screenWidth < 650 ? "" : searchLogo;
    let storeCategoriesButtons = [];
    if (this.props.storeSubCategories) {
      this.props.storeSubCategories.forEach((subCategory) => {
        let clearAll = subCategory === " אפס חיפוש" ? "warning" : "primary";
        let fontSize = this.props.storeSubCategories.length > 15 ? 10 : 12;
        let variant =
          this.props.activeSubCategory === subCategory ? "success" : clearAll;

        let funcCatogory = subCategory === "אפס חיפוש" ? "" : subCategory;

        storeCategoriesButtons.push(
          <Button
            style={{ fontSize: fontSize }}
            type="button"
            variant={`${variant}`}
            onClick={() => this.props.getStoreSubCategory(funcCatogory)}
          >
            {subCategory}
          </Button>
        );
      });
    }
    return (
      <div className="searchPage">
        {/* {ticker} */}
        <Container className="searchContainer">
          {searchLogo}
          {/* <p>earch for suppliers</p> */}
          <Form className="search">
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                onChange={(event) =>
                  this.props.getSearchText(event.target.value)
                }
                type="text"
                placeholder="...חפש"
              />
            </Form.Group>
          </Form>
        </Container>
        <div>{storeCategoriesButtons}</div>
      </div>
    );
  }
}
