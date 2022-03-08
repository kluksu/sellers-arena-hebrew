import React, { Component } from "react";
import Profile from "../pages/Profile";
import { whiteLableStores } from "./utils";

export default class SeparateAccountsManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAccount: {
        account_type: "",
        category: " ",
        country: "",
        id: "",
        image: null,
        is_active: "",
        language: "",
        messages: "",
        name: "",
        phone_number: "",
        store_address: "",
        tax_id: "",
      },
      selectedUser: {
        email: "",
        first_name: "",
        id: "",
        is_active: "",
        last_name: "",
        phone_number: "",
        privacy_policy_datetime: "",
        privacy_policy_revision: "",
        terms_agreed_datetime: "",
        terms_revision: "",
        type: "",
      },
    };
  }
  render() {
    return (
      <div>
        {this.state.selectedAccount.id !== "" ? (
          <Profile
            accountID={whiteLableStores[this.props.href]}
            path={"separated-accounts/"}
            activeAccount={this.props.activeAccount}
            accessToken={this.props.accessToken}
            deleteAccount={this.props.deleteAccount}
            resetPassword={this.props.resetPassword}
            me={this.props.me}
            href={this.props.href}
            closeGenericModal={this.props.closeGenericModal}
            openGenericModal={this.props.openGenericModal}
          ></Profile>
        ) : (
          ""
        )}
      </div>
    );
  }
}
