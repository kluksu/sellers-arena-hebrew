import axios from "axios";
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { domain, logo } from "./utils";

export default class ContactCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isButtonDisabled: false,
    };
  }
  //   getContact = (accountID) => {
  //     return axios.get(`${domain}/public-accounts/${accountID}/`);
  //   };
  //   componentDidMount() {
  //     this.getContact(this.props.accountID).then((res) => {
  //       this.setState({ account: res.data });
  //     });
  //   }
  render() {
    let mockup = {
      id: 17,
      name: "ניסוי",
      image:
        "https://cdn.pixabay.com/photo/2016/01/21/21/23/rose-1154830_960_720.png",
      store_address: "דגהגדעהגדהעגד 2332",
      phone_number: "3456357574",
      account_type: 3,
      category: "צעצועים ומשחקים",
      messages: "",
      about: "",
      country: "usa",
      language: "hebrew",
      tax_id: "45654375747",
    };

    return (
      <div
        className="contactCard"
        onClick={() => window.location.assign(`/#/StorePage/${mockup.id}/`)}
      >
        <div className="contactImageConatianer">
          {this.props.account.image ? (
            <img src={this.props.account.image}></img>
          ) : (
            logo
          )}
          <div> {this.props.account.name}</div>

          <div>קטגוריה: {this.props.account.category}</div>
          <div>{this.props.account.about}</div>
          <Button
            disabled={this.state.isButtonDisabled}
            onClick={(e) => {
              e.stopPropagation(e);
              this.props.postAndGetContacts(this.props.account.id);
              this.setState({ isButtonDisabled: true });
            }}
          >
            הוסף לאנשי קשר
          </Button>
        </div>
      </div>
    );
  }
}
