import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { isOverflown } from "./utils";

export default class PostItemInfo extends Component {
  componentDidMount() {
    if (isOverflown("PostDescriptionRow" + this.props.post.id, "y") === false) {
      this.setState({ readMore: true });
    }
  }
  render() {
    let item = this.props.item;
    return (
      <>
        <Row>{item.name}</Row>
        <Row>
          {" "}
          {item && item.item_variations ? (
            <>
              {" "}
              {` מספר וריאציות : ${item.item_variations.length} `}{" "}
              <a
                href={window.location.href}
                onClick={() =>
                  this.props.openGenericModal(
                    "",
                    <ProductModal
                      selectedVariation={item.item_variations[0]}
                      // cartItems={this.props.cartItems}
                      // accessToken={this.props.accessToken}
                      // activeCart={this.props.activeCart}
                      // getCartProducts={this.props.getCartProducts}
                      item={item}
                      activeAccount={this.props.activeAccount}
                      accessToken={this.props.accessToken}
                      buttons={buttons}
                    ></ProductModal>,
                    <>
                      {" "}
                      {window.location.href.includes("StorePage")
                        ? // <Button onClick={this.props.addCartItems} variant="success">
                          //   הוסף לעגלה
                          // </Button>
                          ""
                        : ""}
                    </>,
                    "",
                    "modal90W"
                  )
                }
              >
                {" "}
                &nbsp; לכל הוריאציות &nbsp;
              </a>
            </>
          ) : null}
        </Row>{" "}
        <Row> {`קטגוריה : ${item.category}`}</Row>{" "}
        <Row> {`תת קטגוריה : ${item.subcategory}`}</Row>{" "}
        <Row
          style={{
            height: this.state.readMore === true ? "fit-content" : "70px",
          }}
          id={"PostDescriptionRow" + this.props.post.id}
          // className="PostDescriptionRow" + this.props.post.id
        >
          {" "}
          {item.description !== null ? `תיאור : ${item.description}` : null}
        </Row>{" "}
        <Row
          style={{ display: this.state.readMore === true ? "none" : "" }}
          className="readMore"
          onClick={this.readMore}
        >
          קרא עוד...
        </Row>
      </>
    );
  }
}
