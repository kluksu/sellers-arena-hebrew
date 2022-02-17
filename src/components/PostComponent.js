import React, { Component } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { FcPicture } from "react-icons/fc";
import { BiWinkSmile } from "react-icons/bi";

import Picker from "emoji-picker-react";
import axios from "axios";
import { domain } from "./utils";
import DropDownSearch from "./DropDownSearch";
import InfoBox from "./InfoBox";

export default class PostComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenEmoji: null,
      text: "",
      pickerDisplay: "none",
      myItems: [],
      selectedItemID: "",
      selectedItem: "",
      selectedVariationID: "",
      selectedVariation: "",
      picturesArr: [],
      itemSearchText: "",
      variationSearchText: "",
    };
  }

  handleDropDownPick = (state, value) => {
    this.setState({ [state]: value });
  };
  removePicture = (i) => {
    let picturesArr = this.state.picturesArr;
    picturesArr.splice(i, 1);
    this.setState({ picturesArr: picturesArr });
  };
  post = () => {
    const authorization = !this.props.accessToken
      ? null
      : `Bearer ${this.props.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    axios
      .post(
        `${domain}/my-accounts/${this.props.activeAccount.id}/add_post/`,
        {
          text: this.state.text + ` pictures//${this.state.picturesArr}`,
        },
        config
      )
      .then((res) => {
        this.props.openGenericModal(
          this.props.deletePost ? "הפוסט נערך בהצלחה" : "הפוסט עלה בהצלחה"
        );
        if (this.props.deletePost) {
          this.props.deletePost(this.props.post.id).then((res) => {
            this.props.hidePost(this.props.post.id);
          });
        }
      })
      .catch((error) => {
        this.props.openGenericModal(
          "אופס, משהו השתבש, אנא נסה שנית מאוחר יותר"
        );
      });
  };
  addPictureToPost = (itemOrvariation) => {
    if (itemOrvariation === "item") {
      this.setState({
        picturesArr: this.state.picturesArr.concat(
          this.state.selectedItem.image
        ),
      });
    } else if (itemOrvariation === "variation") {
      this.setState({
        picturesArr: this.state.picturesArr.concat(
          this.state.selectedVariation.image
        ),
      });
    }
  };
  getItems = () => {
    const authorization = !this.props.accessToken
      ? null
      : `Bearer ${this.props.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    return axios.get(`${domain}/items/`, config);
  };
  onMount = () => {
    if (!this.props.myItems) {
      this.getItems()
        .then((res) => {
          this.setState({ myItems: res.data.results });
        })
        .catch((error) => {});
    } else {
      this.setState({ myItems: this.props.myItems });
    }
  };
  componentDidMount = () => {
    if (this.props.post) {
      let text = this.props.post.text;
      let textArr = text.split("pictures//");
      let newText = textArr[0].split(`:`);
      this.setState({ text: newText[1] });
      let picturesArr = textArr[1].split(",");
      this.setState({ picturesArr: picturesArr });

      // this.setState({ picturesArr: textArr[1] });
    }
    this.onMount();
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.myItems !== prevState.myItems && this.props.getStateInfo) {
      this.props.getStateInfo("myItems", this.state.myItems);
    }
    if (this.props.activeAccount !== prevProps.activeAccount) {
      this.onMount();
    }
    if (this.state.selectedItemID !== prevState.selectedItemID) {
      this.state.myItems.forEach((item) => {
        if (this.state.selectedItemID == item.id) {
          this.setState({ selectedItem: item });
        }
      });
    }
    if (this.state.selectedVariationID !== prevState.selectedVariationID) {
      this.state.selectedItem.item_variations.forEach((variation) => {
        if (this.state.selectedVariationID == variation.id) {
          this.setState({ selectedVariation: variation });
        }
      });
    }
  }
  onEmojiClick = (e, emojiObject) => {
    this.setState({ chosenEmoji: emojiObject });
    this.setState({ text: this.state.text + emojiObject.emoji });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  togglePicker = (e) => {
    e.stopPropagation();
    this.setState({
      pickerDisplay: this.state.pickerDisplay === "none" ? "flex" : "none",
    });
  };
  render() {
    let variations = [];
    let allitems = this.state.myItems.map((item) => {
      if (this.state.selectedItemID == item.id) {
        item.item_variations.forEach((variation, i) => {
          if (`${variation.id}`.includes(this.state.variationSearchText)) {
            variations.push(
              <NavDropdown.Item
                onClick={() =>
                  this.handleDropDownPick("selectedVariationID", variation.id)
                }
              >
                {variation.id}{" "}
                <img className="dropDownImg" src={variation.image}></img>{" "}
                <div onto className="cardInfo">
                  i
                </div>
                <InfoBox
                  className="infoBox"
                  variation={variation}
                  item={item}
                ></InfoBox>{" "}
              </NavDropdown.Item>
            );
          }
        });
      }
      if (
        `${item.id}`.includes(this.state.itemSearchText) ||
        `${item.name}`.includes(this.state.itemSearchText)
      ) {
        return (
          <>
            {" "}
            <NavDropdown.Item
              onClick={() => this.handleDropDownPick("selectedItemID", item.id)}
            >
              {/* <div value={item.id}> */}
              {`${item.id}, ${item.name}`}{" "}
              <img className="dropDownImg" src={item.image}></img>
              {/* </div>{" "} */}
            </NavDropdown.Item>
            {/* <option value={item.id}>
            {`${item.id}, ${item.name} `} 
          </option>{" "} */}
          </>
        );
      }
    });

    // this.setState((prevState) => {
    //   let jasper = Object.assign({}, prevState.jasper); // creating copy of state variable jasper
    //   jasper.name = "someothername"; // update the name property, assign a new value
    //   return { jasper }; // return new object jasper object
    // });

    return (
      <div className="postComponent">
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>פרסום</Form.Label>
          <div className="postPictures">
            {" "}
            {this.state.picturesArr.map((link, i) => {
              return (
                <div key={i}>
                  <img src={link}></img>
                  <Button
                    onClick={() => this.removePicture(i)}
                    variant="danger"
                  >
                    x
                  </Button>
                </div>
              );
            })}
          </div>
          <Form.Control
            onChange={this.handleChange}
            type="text"
            name="text"
            as="textarea"
            value={this.state.text}
            maxLength={500}
            placeholder={"ספר לקונים מה שבא לך.."}
          ></Form.Control>
          {/* <div className="formBar"> */}
          <Navbar className="formBar" bg="dark" variant="dark" expand="xl">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                {" "}
                {/* <Form.Group> */}
                <div>
                  <NavDropdown
                    title={`${
                      this.state.selectedItem
                        ? this.state.selectedItem.name
                        : "בחר מוצר"
                    }`}
                    id="basic-nav-dropdown"
                  >
                    {" "}
                    <DropDownSearch
                      handleChange={this.handleChange}
                      state={"itemSearchText"}
                    ></DropDownSearch>
                    {allitems}
                  </NavDropdown>
                  {/* <Form.Control
                    onChange={this.handleChange}
                    // type="text"
                    name="selectedItemID"
                    as="select"

                    // value={this.state.text}
                    // placeholder={"ספר לקונים מה שבא לך.."}
                  >
                    <option value={""}>בחר מוצר</option>
                    {allitems}
                  </Form.Control> */}
                  <Button onClick={() => this.addPictureToPost("item")}>
                    הוסף תמונת מוצר לפוסט
                  </Button>
                </div>
                <div>
                  <NavDropdown
                    title={`${
                      this.state.selectedVariation
                        ? this.state.selectedVariation.id
                        : "בחר וריאציה"
                    }`}
                    id="basic-nav-dropdown"
                  >
                    {" "}
                    <DropDownSearch
                      handleChange={this.handleChange}
                      state={"variationSearchText"}
                    ></DropDownSearch>
                    {variations}
                  </NavDropdown>
                  {/* <Form.Control
                    onChange={this.handleChange}
                    // type="text"
                    name="selectedVariationID"
                    as="select"

                    // value={this.state.text}
                    // placeholder={"ספר לקונים מה שבא לך.."}
                  >
                    <option>בחר וריאציה</option>
                    {variations}
                  </Form.Control> */}
                  {/* </Form.Group> */}
                  <Button onClick={() => this.addPictureToPost("variation")}>
                    הוסף תמונת וריאציה לפוסט
                  </Button>
                </div>
                {/* <div
                  style={{
                    maxWidth: "100%",
                    display: "flex",
                    justifyContent: "left",
                  }}
                  > */}
                <Button variant="warning" onClick={(e) => this.togglePicker(e)}>
                  <BiWinkSmile
                    style={{
                      // background: "yellow",
                      fontWeight: "100",
                      borderRadius: "50%",
                      color: "black",
                    }}
                  ></BiWinkSmile>
                  {/* <FcPicture></FcPicture> */}
                  {/* </div> */}
                </Button>
              </Nav>
            </Navbar.Collapse>
            <Button onClick={this.post}>פרסם</Button>
          </Navbar>{" "}
          {/* </div> */}
          <Picker
            disableSearchBar={true}
            disableSkinTonePicker={true}
            onEmojiClick={this.onEmojiClick}
            pickerStyle={{
              //   height: this.state.pickerHeight,
              border: "none",
              background: "none",
              boxShadow: "none",
              //   overFlowX: "scroll",
              maxWidth: "80%",
              padding: "0px",
              position: "static",
              margin: "auto",
              display: this.state.pickerDisplay,
            }}
          />
        </Form.Group>
      </div>
    );
  }
}
