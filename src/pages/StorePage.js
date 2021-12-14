import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import OrderInfo from "../components/OrderInfo";
import StorePageDetailsNav from "../components/StorePageDetailsNav";
import InfiniteScroll from "react-infinite-scroll-component";

import { Col, NavLink, Row, Button, Form } from "react-bootstrap";
import {
  domain,
  getContacts,
  getData,
  getPublicAccountID,
  postData,
} from "../components/utils";

import NewMessageModal from "../components/NewMessageModal";
import Search from "../components/Search";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { GiConsoleController, GiHamburgerMenu } from "react-icons/gi";
import { CgArrowLeftO, CgEditContrast } from "react-icons/cg";
import { ImProfile } from "react-icons/im";
import { FiPhoneCall } from "react-icons/fi";
import { BiMailSend } from "react-icons/bi";
import FullPageLoader from "../components/FullPageLoader";
import Loader from "react-loader-spinner";
import MyLoader from "../components/myLoader";
import { RiContactsLine } from "react-icons/ri";
import { object } from "prop-types";
import Ticker from "react-ticker";
import DiscountModal from "../components/DiscountModal";
// import MessageBoard from "../components/MessageBoard";

class StorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageText: "",
      messageThreads: "",
      isOpen: false,
      loadShowList: false,
      loadMoreItems: false,
      itemCount: 0,
      itemsLangh: 0,
      showList: [],
      cartItems: {},
      activeCart: null,
      activeCartOrder: [],
      goToCheckout: false,
      quantityValue: 0,
      next: undefined,
      isColapsed: false,
      currentStore: "",
      threadID: "",
      isLoading: "",
      existingCart: false,
      changedQuantities: {},
      LoaderVisibilty: "none",
      searchText: "",
      storeSubCategories: [],
      activeSubCategory: "",
      contactsArr: [],
      selectedContactID: "",
      threadTextRespons: "",
      cartsError: "",
      isDiscountModalOpen: false,
      modalText: "",
      modalTop: "",
      modalBottom: "",
    };
  }
  closeModal = () => this.setState({ isDiscountModalOpen: false });
  openModal = (top, text, bottom) => {
    this.setState({ modalText: text });
    this.setState({ modalTop: top });
    this.setState({ modalBottom: bottom });

    this.setState({ isDiscountModalOpen: true });
  };
  handleOptionsChange = (event) => {
    let obj = JSON.parse(event.target.value);
    console.log(obj);
    this.setState({ selectedContactID: obj });
  };
  createDelta = (key, quantity, price) => {
    if (this.props.activeAccount.account_type == 2) {
      let changedQuantities = this.state.changedQuantities;
      changedQuantities[key] = quantity;
      this.setState({ changedQuantities: changedQuantities });
    } else {
      let changedQuantities = this.state.changedQuantities;

      changedQuantities[key] = {
        quantity: parseInt(quantity),
        cost_per_item: price,
      };
      console.log("!!!!!!!!!!!");
      this.setState({ changedQuantities: changedQuantities });
    }
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  getBuyerCard = () => {
    if (Object.keys(this.state.selectedContactID).length !== 2) {
      getPublicAccountID(
        this.state.selectedContactID,
        this.props.accessToken
      ).then((res) => {
        console.log(res);
        console.log(this.state.currentStore);
        this.setState({ currentStore: res });
      });
    } else {
      console.log(this.state.selectedContactID);
      this.props
        .getUnregistered(this.state.selectedContactID.unregisteredAccountID)
        .then((res) => {
          console.log(res);
          console.log(this.state.currentStore);
          this.setState({ currentStore: res.data });
        });
      ////////
    }
  };
  // <p>{this.state.currentStore.name}</p>
  // <p>{this.state.currentStore.store_address}</p>
  // <p> phone number: {this.state.currentStore.phone_number}</p>
  getStoreSubCategory = (subCategory) => {
    this.setState({ activeSubCategory: subCategory });
  };

  getSearchText = (searchText) => {
    this.setState({ searchText: searchText });
  };

  getCartProducts = (item_variation_id, quantity) => {
    let cart = this.state.cartItems;
    cart[item_variation_id] = parseInt(quantity);
    this.setState({ cartItems: cart });
  };
  getItems = (token) => {
    const next =
      this.state.next !== undefined
        ? this.state.next
        : `${domain}/public-items/?limit=1000&offset=0&account_id=${this.props.match.params.id}`;
    const tokenfull = this.props.accessToken ? this.props.accessToken : token;
    const authorization = !this.props.accessToken
      ? null
      : `Bearer ${tokenfull}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    if (next !== null) {
      axios.get(next, config).then((response) => {
        response.data.results.forEach((item) => {
          if (item.item_variations.length > 0) {
            this.setState({ loadShowList: true });
            return;
          } else if (
            response.data.results.length > 0 &&
            item.item_variations.length === 0
          ) {
            this.setState({ loadMoreItems: true });
            return;
          }
        });
        if (this.state.loadMoreItems === true) {
          this.getItems();
        }
        ////not sure
        // if (this.state.loadShowList === true ) {
        this.setState({
          showList: this.state.showList.concat(response.data.results),
        });
        // }

        this.setState({ itemsLangh: response.data.results.length });
        this.setState({ next: response.data.next });
      });
    }
    this.setState({ loadShowList: false });
    this.setState({ loadMoreItems: false });
  };
  getThreadID = (userID) => {
    this.props.allThreads.forEach((thread) => {
      console.log(thread);
      if (
        thread.participants[0].id == userID ||
        thread.participants[1].id == userID
      ) {
        this.setState({ threadID: thread.id });
        return;
      }
    });
  };
  getStore = () => {
    if (typeof this.state.selectedContactID === "number") {
      let store =
        this.props.activeAccount && this.props.activeAccount.account_type == 2
          ? this.props.match.params.id
          : this.state.selectedContactID;
      getData(`${domain}/public-accounts/${store}/`).then((res) => {
        this.setState({ currentStore: res });
        console.log("!!!!!!!!!!");

        console.log(res);
        this.getThreadID(store);
      });
    }
  };
  loadStoreComponent = () => {
    let userID =
      this.props.activeAccount && this.props.activeAccount.account_type == 2
        ? this.props.match.params.id
        : this.state.selectedContactID;
    if (this.props.match.params.id !== undefined) {
      this.props.getCurrentstore(userID).then((res) => {
        this.setState({ currentStore: res.data });
      });
    }
    this.getStore();
    if (window.innerWidth < 600) {
      this.setState({ isColapsed: true });
    }

    if (this.props.MyShoppingCarts) {
      this.props.MyShoppingCarts.forEach((cart) => {
        if (
          (cart.seller_account == parseInt(this.props.match.params.id) &&
            this.props.activeAccount.account_type == 2) ||
          !this.props.activeAccount
        ) {
          this.setState({ activeCart: cart });
        } else if (
          (cart.buyer_account == parseInt(this.state.selectedContactID) &&
            this.props.activeAccount.account_type == 3) ||
          !this.props.activeAccount
        ) {
          console.log(222);

          this.setState({ activeCart: cart });
        } else if (
          typeof this.state.selectedContactID.unregisteredAccountID ===
            "number" &&
          cart.buyer_unregistered_account ==
            this.state.selectedContactID.unregisteredAccountID
        ) {
          this.setState({ activeCart: cart });
        }
      });
    }
    this.getItems();
  };
  getContactsList = () => {
    let contactsArr = [];

    if (this.props.activeAccount.account_type == 3) {
      let contactsArr = [];

      this.props.getUnregistered().then((res) => {
        res.data.results.forEach((unregisteredAccount) => {
          contactsArr.push(
            <option
              value={JSON.stringify({
                accountID: this.props.activeAccount.id,
                unregisteredAccountID: unregisteredAccount.id,
              })}
            >
              {unregisteredAccount.name} {unregisteredAccount.id}
              {" unregistered account"}
            </option>
          );
        });
      });
      getContacts(this.props.activeAccount.id, this.props.accessToken).then(
        (res) => {
          res.results.forEach((contact) => {
            console.log(
              contact.account_contact.name + " " + contact.account_contact.id
            );
            contactsArr.push(
              <option value={contact.account_contact.id}>
                {contact.account_contact.name} {contact.account_contact.id}
              </option>
            );
          });
          this.setState({ contactsArr: contactsArr });

          console.log(res);
        }
      );
    }
  };

  componentDidMount() {
    this.props.MyShoppingCarts.forEach((cart) => {
      if (cart.seller_account == this.props.match.params.id) {
        this.setState({ existingCart: true });
      }
    });
    if (
      this.props.activeAccount &&
      this.props.activeAccount.account_type === 3
    ) {
      this.getContactsList();
    }
    this.loadStoreComponent();

    /////
  }

  creatCart = (isChangingPage, unregisteredAccountID) => {
    let unregisterConfig = "";
    let buyer =
      this.props.activeAccount && this.props.activeAccount.account_type == 2
        ? this.props.activeAccount.id
        : this.state.selectedContactID;
    if (typeof this.state.selectedContactID !== "number") {
      buyer = this.props.activeAccount.id;

      console.log(this.state.selectedContactID);
      this.setState({
        cartsError: "אופס, או שלא בחרת לקוח או שיש הזמנה ללקוח זה במערכת",
      });
    }
    postData(
      `${domain}/cart/`,
      {
        buyer_unregistered_account:
          this.state.selectedContactID.unregisteredAccountID,

        buyer_account: buyer,
        seller_account: this.props.match.params.id,
      },
      ` ${this.props.accessToken}`
    ).then((data) => {
      this.setState({
        cartsError: "",
      });
      console.log(data);
      this.postAndRetrevData(data.id).then((data) => {
        this.editItem(data.id, this.state.changedQuantities).then(
          this.openModal("הצלחה!", "השינויים נוספו בהצלחה"),
          this.setState({ changedQuantities: {} }),

          this.setState({ activeCart: data }),
          getData(
            `${domain}/cart/${this.state.activeCart.id}/`,
            "",
            ` ${this.props.accessToken}`
          ).then((res) => {
            console.log(res);
            // this.setState({ cartsError: "" });
            this.setState({ activeCart: res });
          }),
          this.setState({ LoaderVisibilty: "none" }),
          this.props.getCarts()
        );

        if (isChangingPage === true) {
          if (this.props.activeAccount.account_type == 3) {
            this.props.checkOut(this.state.activeCart.id).then((res) => {
              this.props.getAllOrders();

              console.log(res);
              if (res.order_id) {
                window.location.assign(`/#/supplier-order/${res.order_id}`);
              }
            });
          } else if (this.props.activeAccount.account_type == 2) {
            this.postAndRetrevData(this.state.activeCart.id).then(
              window.location.assign(
                `/#/order-summery/${this.state.activeCart.id}`
              )
            );
          }
        }
      });

      this.setState({ activeCart: data });
    });

    // this.setState({
    //   cartsError: "",
    // }),
    // this.setState({
    //   cartsError:
    //     "oops, either you didnt pick a client or there is an order in progress",
    // })
  };

  addCartItemsAndCheckout = () => {
    if (this.state.activeCart == null || this.state.activeCart.id === "notID") {
      this.creatCart(true);
      this.props.getAllOrders();
    } else {
      // this.postAndRetrevData(this.state.activeCart.id)
      this.postAndRetrevData(this.state.activeCart.id).then((data) => {
        this.editItem(data.id, this.state.changedQuantities).then(
          this.setState({ changedQuantities: {} }),

          this.setState({ activeCart: data }),
          getData(
            `${domain}/cart/${this.state.activeCart.id}/`,
            "",
            ` ${this.props.accessToken}`
          ).then((res) => {
            this.setState({ activeCart: res });
            console.log(res);

            if (this.props.activeAccount.account_type == 3) {
              this.props.checkOut(this.state.activeCart.id).then((res) => {
                console.log(res);
                if (res.order_id) {
                  this.props.getAllOrders();

                  window.location.assign(`/#/supplier-order/${res.order_id}`);
                }
              });
            }
          })
        );
        if (this.props.activeAccount.account_type == 2) {
          this.props.getCarts();
          this.setState({ LoaderVisibilty: "none" });
          window.location.assign(
            `/#/order-summery/${this.state.activeCart.id}`
          );
        }
      });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getContactsList();
    }
    if (this.state.activeCart !== prevState.activeCart) {
      this.props.getActiveCart(this.state.activeCart);
    }
    if (
      this.state.currentStore !== prevState.currentStore &&
      this.props.activeAccount.account_type == 2
    ) {
      console.log(this.state.currentStore);
      this.setState({ messagesBoardText: this.state.currentStore.messages });
    }
    if (this.props.myContacts !== prevProps.myContacts) {
      this.getContactsList();
    }
    if (this.props.allThreads !== prevProps.allThreads) {
      let messageUserID =
        this.props.activeAccount && this.props.activeAccount.account_type == 3
          ? this.state.selectedContactID
          : this.props.match.params.id;
      this.getThreadID(messageUserID);
    }
    if (this.props.activeAccount !== prevProps.activeAccount) {
      this.loadStoreComponent();
      this.getContactsList();
    }

    if (this.props.MyShoppingCarts !== prevProps.MyShoppingCarts) {
      this.loadStoreComponent();
    }
    if (this.state.selectedContactID !== prevState.selectedContactID) {
      this.setState({
        activeCart: {
          all_item_variations: [],
          buyer_account: 0,
          created_by_seller: true,
          estimated_tax: 0.1,
          id: "notID",
          reopen_reason: null,
          seller_account: 0,
          total_price_after_tax: 0,
          total_price_before_tax: 0,
        },
      });
      this.loadStoreComponent();
      console.log(this.state.selectedContactID);
      let messageUserID =
        this.props.activeAccount && this.props.activeAccount.account_type == 3
          ? this.state.selectedContactID
          : this.props.match.params.id;
      this.getBuyerCard();
      console.log(messageUserID);

      this.getThreadID(messageUserID);
    }
    if (this.state.threadID !== prevState.threadID) {
      console.log(this.state.threadID);
      this.props.getMessagesArcive(this.state.threadID).then((res) => {
        this.setState({ threadTextRespons: res });
      });
    }
  }

  addCartItems = (func) => {
    if (this.state.activeCart == null || this.state.activeCart.id === "notID") {
      this.creatCart();
    } else {
      console.log(this.state.activeCart.id);
      this.postAndRetrevData(this.state.activeCart.id).then((data) => {
        this.openModal("הצלחה!", "השינויים נוספו להזמנה");
        this.editItem(data.id, this.state.changedQuantities).then(
          this.openModal("הצלחה!", "השינויים נוספו להזמנה"),
          this.setState({ changedQuantities: {} }),
          this.setState({ activeCart: data }),
          getData(
            `${domain}/cart/${this.state.activeCart.id}/`,
            "",
            ` ${this.props.accessToken}`
          ).then((res) => {
            this.setState({ activeCart: res });
          }),
          this.setState({ LoaderVisibilty: "none" })
          // window.location.reload()
        );
      });
    }
  };
  editItem = (id, delta) => {
    let obj = { variations_json: delta };
    return postData(
      `${domain}/cart/${id}/edit/`,
      obj,
      ` ${this.props.accessToken}`
    );
  };

  postAndRetrevData = (id) => {
    this.setState({ LoaderVisibilty: "" });
    let keys = Object.keys(this.state.cartItems).length;
    let i = 0;
    for (const [key, value] of Object.entries(this.state.cartItems)) {
      i++;
      // if (
      //   value == 0 &&
      //   this.state.changedQuantities[key] &&
      //   this.state.changedQuantities[key] !== 0
      // ) {
      //   console.log(this.state.changedQuantities);
      //   let changedQuantities = this.state.changedQuantities;
      //   changedQuantities[key] = value;
      //   console.log(this.state.changedQuantities);
      //   this.setState({ changedQuantities: changedQuantities });
      // }

      postData(
        `${domain}/cart/${id}/add/`,
        { item_variation_id: key, quantity: parseInt(value) },
        ` ${this.props.accessToken}`
      ).then((data) => {
        console.log(data);
        if (data.error) {
          console.log(this.state.changedQuantities);
          let changedQuantities = this.state.changedQuantities;
          changedQuantities[key] = value;
          console.log(this.state.changedQuantities);
          this.setState({ changedQuantities: changedQuantities });
        }
      });
      if (keys === i) {
        return getData(
          `${domain}/cart/${id}/`,
          "",
          ` ${this.props.accessToken}`
        );
      }
    }
    return getData(`${domain}/cart/${id}/`, "", ` ${this.props.accessToken}`);
  };

  expandManuHideBurger = () => {
    if (this.state.isColapsed === false) {
      this.setState({ isColapsed: true });
    } else {
      this.setState({ isColapsed: false });
    }
  };

  render() {
    let unregisterDisable =
      this.state.currentStore &&
      this.state.currentStore.parent_account == this.props.match.params.id
        ? true
        : false;
    let ticker =
      this.props.activeAccount &&
      this.props.activeAccount.account_type == 2 &&
      this.state.messagesBoardText ? (
        <Ticker mode="chain" className="ticker" direction={"toRight"}>
          {({ index }) => (
            <>
              <p
                style={{
                  color: " #ffffff",
                  opacity: 4,
                  fontSize: "0.1px",
                }}
              >
                {index}
              </p>

              <h1>` {this.state.messagesBoardText} `</h1>
            </>
          )}
        </Ticker>
      ) : (
        ""
      );
    if (
      this.props.activeAccount &&
      this.props.activeAccount.account_type == 2 &&
      !this.state.currentStore
    ) {
      return <FullPageLoader></FullPageLoader>;
    }
    console.log(this.props.MyShoppingCarts);
    if (this.state.activeCart) {
      console.log(this.state.activeCart);
    }
    let messageUserID =
      this.props.activeAccount && this.props.activeAccount.account_type == 3
        ? this.state.selectedContactID
        : this.props.match.params.id;
    let clientsDropDown = "";
    if (
      this.props.activeAccount &&
      this.props.activeAccount.id == this.props.match.params.id
    ) {
      clientsDropDown =
        this.props.activeAccount.account_type == 3 ? (
          <Col>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>בחר לקוח </Form.Label>
              <Form.Control
                onChange={this.handleOptionsChange}
                as="select"
                name="selectedContactID"
                className=" m-auto"
              >
                <option value={0}>------------</option>
                {this.state.contactsArr}
              </Form.Control>
            </Form.Group>
          </Col>
        ) : null;
    }
    // let clinetsList=(this.props.activeAccount.account_type==3)?
    let isCartIncludes = false;
    this.props.MyShoppingCarts.forEach((cart) => {
      if (cart.seller_account == this.props.match.params.id) {
        return (isCartIncludes = true);
      }
    });
    if (
      isCartIncludes === true &&
      !this.state.activeCart &&
      this.props.activeAccount.account_type == 2
    ) {
      return <FullPageLoader></FullPageLoader>;
    }
    let loader = (
      <Loader
        className="m-auto"
        Color="blue"
        height={100}
        type="ThreeDots"
      ></Loader>
    );

    let supplierCard =
      !this.props.activeAccount ||
      (this.props.activeAccount &&
        this.props.match.params.id == this.props.activeAccount.id) ||
      this.props.activeAccount.account_type == 2 ? (
        <Col className="avatarDiv" xl={12}>
          <Row>
            <Col xl={4}>
              {" "}
              <ImProfile className="profileIcon" />
            </Col>
            <Col xl={4}>
              {clientsDropDown}

              <p>{this.state.currentStore.name}</p>
              <p>{this.state.currentStore.store_address}</p>
              <p> טלפון: {this.state.currentStore.phone_number}</p>
            </Col>
            <Col className="buttonsCol" xl={4} lg={12}>
              <Button
                disabled={unregisterDisable}
                onclick={() =>
                  window.open(`tel:${this.state.currentStore.phone_number}`)
                }
                className="w-50"
                variant="success"
              >
                התקשר <FiPhoneCall />
              </Button>{" "}
              <Button
                disabled={unregisterDisable}
                className="w-50"
                variant="success"
                onClick={
                  () =>
                    this.props.handleOpenMessage(
                      messageUserID,
                      this.state.threadID
                    ) /////////////////////////////////////////////////////////////////////////////////////
                }
              >
                שלח הודעה <BiMailSend />
              </Button>
              {this.props.activeAccount &&
              this.props.match.params.id ==
                this.props.activeAccount.id ? null : (
                <Button
                  onClick={() => this.props.postAndGetContacts(messageUserID)}
                  className="w-50"
                  variant="success"
                >
                  הוסף לאנשי הקשר <RiContactsLine />{" "}
                </Button>
              )}
              <a
                target="_blank"
                href="https://meet.google.com/_meet/iah-uyfs-bdu?authuser=0&ijlm=1628853707454&adhoc=1&hs=187"
              >
                {/* <Button className="w-50" variant="success">
                  shared screen order
                </Button>{" "} */}
              </a>
            </Col>
            <Col>
              {ticker}{" "}
              <div className={"messagesBoardText hidden"}>
                {this.state.messagesBoardText}
              </div>
            </Col>

            {/* <MessageBoard></MessageBoard> */}
          </Row>

          <div className={"messagesBoardText hidden"}>
            {this.state.messagesBoardText}
          </div>
        </Col>
      ) : null;
    let toggleIcon =
      this.state.isColapsed === true ? (
        <GiHamburgerMenu onClick={this.expandManuHideBurger} />
      ) : (
        <CgArrowLeftO onClick={this.expandManuHideBurger} />
      );

    let orderInfo = this.state.activeCart ? (
      <OrderInfo
        isPriceFiledDisabled={"disabled"}
        createDelta={this.createDelta}
        getCartProducts={this.getCartProducts}
        activeAccount={this.props.activeAccount}
        accessToken={this.props.accessToken}
        activeCart={this.state.activeCart}
      ></OrderInfo>
    ) : null;
    ////posibble bug in dataLength
    /////////
    let cards = [];
    let cardsIdObj = {};
    for (let i = 0; i < this.state.showList.length; i++) {
      const item = this.state.showList[i];
      for (let j = 0; j < item.item_variations.length; j++) {
        const variation = item.item_variations[j];
        let value = 0;
        if (this.state.activeCart !== null) {
          this.state.activeCart.all_item_variations.forEach((CartVariation) => {
            if (CartVariation.item_variation.id === variation.id) {
              return (value = CartVariation.quantity);
            }
          });
        }

        // cards.push(<ProductCard productName={`${shortName}.....`} price="register to see prices"
        // pictures={element.image}>  </ProductCard>)
        let searchTextsplit = this.state.searchText.toUpperCase().split(" ");
        let lastWord = searchTextsplit[searchTextsplit.length - 1];
        searchTextsplit.pop();
        let variationValues = [];
        let category = item.category.toUpperCase().split(" ");

        let itemName = item.name.toUpperCase();
        let spltName = itemName.split(" ");
        if (!this.state.storeSubCategories.includes(item.subcategory)) {
          this.setState({
            storeSubCategories: this.state.storeSubCategories.concat(
              item.subcategory
            ),
          });
        }
        if (!this.state.storeSubCategories.includes("אפס חיפוש")) {
          ////change to clear all
          this.setState({
            storeSubCategories:
              this.state.storeSubCategories.concat("אפס חיפוש"),
          });
        }
        Object.values(variation.variation).forEach((value) => {
          variationValues.push(value.toUpperCase());
        });
        let allValuesArr = variationValues.concat(spltName, category);

        const found = allValuesArr.find((element) =>
          element.includes(lastWord)
        );

        searchTextsplit.push(found);
        function isSubset(array1, array2) {
          // returns true if array2 is a subset of array1

          return array2.every(function (element) {
            return array1.includes(element);
          });
        }
        if (
          !this.state.activeSubCategory ||
          this.state.activeSubCategory.toUpperCase() ===
            item.subcategory.toUpperCase()
        ) {
          if (
            isSubset(allValuesArr, searchTextsplit) === true ||
            !this.state.searchText
          ) {
            if (!cardsIdObj[variation.id]) {
              cardsIdObj[variation.id] = variation.id;
              if (!this.props.accessToken) {
                let card =
                  variation.cost_per_item === null ? (
                    <ProductCard
                      userDevice={this.props.userDevice}
                      screenWidth={this.props.screenWidth}
                      activeAccount={this.props.activeAccount}
                      getCartProducts={this.getCartProducts}
                      variation={variation}
                      item={item}
                      productInfoLink={`/#/storePage/${this.props.match.params.id}/product_page/${item.id}`}
                      currency={""}
                      productName={item.name}
                      price="הרשם על מנת לראות מחירים"
                      pictures={variation.image}
                    >
                      {" "}
                    </ProductCard>
                  ) : (
                    <ProductCard
                      screenWidth={this.props.screenWidth}
                      userDevice={this.props.userDevice}
                      activeAccount={this.props.activeAccount}
                      getCartProducts={this.getCartProducts}
                      variation={variation}
                      item={item}
                      productInfoLink={`/#/storePage/${this.props.match.params.id}/product_page/${item.id}`}
                      productName={item.name}
                      price={variation.cost_per_item}
                      pictures={variation.image}
                      currency={item.currency}
                    >
                      {" "}
                    </ProductCard>
                  );

                cards.push(card);
              } else if (
                this.props.accessToken &&
                variation.cost_per_item !== null
              ) {
                cards.push(
                  <ProductCard
                    screenWidth={this.props.screenWidth}
                    userDevice={this.props.userDevice}
                    activeAccount={this.props.activeAccount}
                    value={value}
                    getCartProducts={this.getCartProducts}
                    variation={variation}
                    item={item}
                    productInfoLink={`/#/storePage/${this.props.match.params.id}/product_page/${item.id}`}
                    productName={item.name}
                    currency={item.currency}
                    price={variation.cost_per_item}
                    pictures={variation.image}
                  ></ProductCard>
                );
              } else if (
                this.props.accessToken &&
                variation.cost_per_item == null
              )
                cards.push(
                  <ProductCard
                    screenWidth={this.props.screenWidth}
                    userDevice={this.props.userDevice}
                    activeAccount={this.props.activeAccount}
                    value={value}
                    getCartProducts={this.getCartProducts}
                    variation={variation}
                    item={item}
                    productInfoLink={`/#/storePage/${this.props.match.params.id}/product_page/${item.id}`}
                    productName={item.name}
                    price="עליך להיות ברשימת אנשי הקשר של ספק זה על מנת לראות מחירים"
                    currency={""}
                    pictures={variation.image}
                  >
                    {" "}
                  </ProductCard>
                );
            }
          }
        }
      }
    }

    return (
      <>
        <FullPageLoader
          LoaderVisibilty={this.state.LoaderVisibilty}
        ></FullPageLoader>
        {/* <Container>
                        <ListGroup >
                        <ListGroup.Item>{category}</ListGroup.Item>
                            
                        </ListGroup>
        
                        </Container> */}

        <Row>
          {supplierCard}
          <Col className="searchPageContainer storePage" xl={12}>
            <Search
              screenWidth={this.props.screenWidth}
              activeSubCategory={this.state.activeSubCategory}
              getStoreSubCategory={this.getStoreSubCategory}
              storeSubCategories={this.state.storeSubCategories}
              getSearchText={this.getSearchText}
            ></Search>
          </Col>
        </Row>

        <Row>
          {/* <Col xl={0.1}> */}
          {/* <ProSidebar collapsed={this.state.isColapsed}>
                        <Menu iconShape="circle">
                            <MenuItem > {toggleIcon} </MenuItem>

                        </Menu>
                        <Menu iconShape="circle" onMouseLeave={() => this.setState({ isColapsed: true })} onMouseOver={() => this.setState({ isColapsed: false })}> */}

          {/* <SubMenu title="Components" >
    </SubMenu> */}

          {/* <MenuItem>Component 1</MenuItem>
      <MenuItem>Component 2</MenuItem> */}
          {/* </Menu>
                    </ProSidebar>
                </Col> */}
          <Col>
            {/* <InfiniteScroll className="homePage" dataLength={cards.length} next={() => this.getItems()} hasMore={true} loader={loader}> */}

            <Row className="productCardsRow">
              {" "}
              {<br></br>}
              {(this.props.activeAccount &&
                this.props.activeAccount.account_type == 3 &&
                this.state.selectedContactID &&
                this.state.selectedContactID !== 0) ||
              (this.props.activeAccount &&
                this.props.activeAccount.account_type == 2) ||
              !this.props.activeAccount ? (
                cards
              ) : (
                <h1 style={{ color: "red" }}>
                  {this.props.activeAccount.id == this.props.match.params.id
                    ? "בבקשה בחר לקוח מהאפשרויות למעלה"
                    : "רק חשבונות קונים יכולים לראות את המידע המוצג בעמוד זה"}
                </h1>
              )}
            </Row>

            {/* </InfiniteScroll> */}
          </Col>
        </Row>
        <Row>{orderInfo}</Row>
        <StorePageDetailsNav
          screenWidth={this.props.screenWidth}
          activeAccount={this.props.activeAccount}
          cartsError={this.state.cartsError}
          addCartItemsAndCheckout={this.addCartItemsAndCheckout}
          addCartItems={this.addCartItems}
          activeCart={this.state.activeCart}
        >
          {" "}
        </StorePageDetailsNav>

        {/* <NewMessageModal
          removeContact={this.props.removeContact}
          threadTextRespons={this.state.threadTextRespons}
          threadID={this.state.threadID}
          getMessageText={this.getMessageText}
          sendMessage={this.sendMessage}
          currentStore={this.state.currentStore}
          handleClose={this.handleClose}
          isOpen={this.state.isOpen}
        ></NewMessageModal> */}
        <DiscountModal
          bottom={this.state.modalBottom}
          top={this.state.modalTop}
          text={this.state.modalText}
          closeModal={this.closeModal}
          isDiscountModalOpen={this.state.isDiscountModalOpen}
        ></DiscountModal>
      </>
    );
  }
}
export default withRouter(StorePage);
