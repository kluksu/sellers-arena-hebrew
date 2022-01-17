import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { FcPicture } from "react-icons/fc";
import { BiWinkSmile } from "react-icons/bi";

import Picker from "emoji-picker-react";
import axios from "axios";
import { domain } from "./utils";

export default class PostComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenEmoji: null,
      text: "",
      pickerDisplay: "none",
      myItems: [],
      selectedItem: "",
      selectedVariation: "",
    };
  }
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
    this.getItems()
      .then((res) => {
        this.setState({ myItems: res.data.results });
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  componentDidMount = () => {
    this.onMount();
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.activeAccount !== prevProps.activeAccount) {
      this.onMount();
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
    let allitems = this.state.myItems.map((item) => {
      return <option value={item.id}>{`${item.id}, ${item.name}`}</option>;
    });
    console.log(this.state.selectedItem);
    // this.setState((prevState) => {
    //   let jasper = Object.assign({}, prevState.jasper); // creating copy of state variable jasper
    //   jasper.name = "someothername"; // update the name property, assign a new value
    //   return { jasper }; // return new object jasper object
    // });
    let obj = this.state.selectedItem;
    console.log(obj);
    return (
      <div className="postComponent">
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>פרסום</Form.Label>
          <Form.Control
            onChange={this.handleChange}
            type="text"
            name="text"
            as="textarea"
            value={this.state.text}
            placeholder={"ספר לקונים מה שבא לך.."}
          ></Form.Control>

          <div className="formBar">
            <Form.Group>
              <Form.Control
                onChange={this.handleChange}
                // type="text"
                name="selectedItem"
                as="select"

                // value={this.state.text}
                // placeholder={"ספר לקונים מה שבא לך.."}
              >
                <option value={""}>בחר מוצר</option>
                {allitems}
              </Form.Control>
              <Button>הוסף תמונת מוצר לפוסט</Button>

              <Form.Control
                onChange={this.handleChange}
                // type="text"
                name="selectedVariation"
                as="select"

                // value={this.state.text}
                // placeholder={"ספר לקונים מה שבא לך.."}
              >
                <option>בחר וריאציה</option>
              </Form.Control>
            </Form.Group>
            <Button>הוסף תמונת וריאציה לפוסט</Button>

            <div
              style={{
                maxWidth: "100%",
                display: "flex",
                justifyContent: "left",
              }}
            >
              <BiWinkSmile
                style={{
                  background: "yellow",
                  fontWeight: "100",
                  borderRadius: "50%",
                }}
                onClick={(e) => this.togglePicker(e)}
              ></BiWinkSmile>
              {/* <FcPicture></FcPicture> */}
            </div>

            <Button>פרסם</Button>
          </div>
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
