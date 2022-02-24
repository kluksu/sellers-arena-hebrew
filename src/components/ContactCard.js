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
    let random100 = Math.floor(Math.random() * 100) + 1;
    let random300 = Math.floor(Math.random() * 500) + 1;

    return (
      <div
        className="contactCard"
        onClick={() =>
          this.props.activeAccount && this.props.activeAccount.account_type == 2
            ? window.location.assign(`/#/StorePage/${this.props.account.id}/`)
            : this.props.openGenericModal(
                ` על מנת לראות מידע נוסף על הספק כמו מחירים מוצרים ולקבל עדכונים, עליך להיתחבר לחשבונך, במידע ואין לך חשבון אתה יכול להרשם חינם בלחיצה על הלחצן הירוק`,
                "",
                <Button
                  variant="success"
                  onClick={() => {
                    window.location.assign("/#/register");
                    this.props.closeGenericModal();
                  }}
                >
                  הירשם חינם!
                </Button>
              )
        }
      >
        <div className="contactImageConatianer">
          {this.props.account.image ? (
            <img src={this.props.account.image}></img>
          ) : (
            // <img
            //   src={`https://picsum.photos/id/${random100}/${random300}/${random300}`}
            // ></img>
            logo
          )}
        </div>

        <div> {this.props.account.name}</div>

        <div> {this.props.account.category}</div>
        <div>{this.props.account.about}</div>
        {this.props.activeAccount &&
        this.props.activeAccount.account_type == 2 ? (
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
        ) : (
          ""
        )}
      </div>
    );
  }
}
