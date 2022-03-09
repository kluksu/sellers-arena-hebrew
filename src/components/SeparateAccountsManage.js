import axios from "axios";
import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "react-loader-spinner";
import Profile from "../pages/Profile";
import DropDownSearch from "./DropDownSearch";
import { domain, whiteLableStores } from "./utils";

export default class SeparateAccountsManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountsList: [],
      next: undefined,
      accountSearchText: "",
      //   selectedAccountID: "",
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
  //   getUsers=()=>{
  //     const authorization = !this.props.accessToken
  //     ? null
  //     : `Bearer ${this.props.accessToken}`;
  //   const config = {
  //     headers: { "Content-Type": "application/json", authorization },
  //   };
  //   let next =
  //     this.state.next === undefined
  //       ? `${domain}/separated-users/?search=${this.state.accountSearchText}`
  //       : this.state.next;
  //   axios.get(next, config).then((res) => {
  //     console.log(res.data.results);
  //     this.setState({
  //       accountsList: this.state.accountsList.concat(res.data.results),
  //       next: res.data.next,
  //     });
  //   });

  //   }

  getMyWhiteLableAccounts = () => {
    // const tokenfull = this.props.accessToken ? this.props.accessToken : token;
    const authorization = !this.props.accessToken
      ? null
      : `Bearer ${this.props.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    let next =
      this.state.next === undefined
        ? `${domain}/separated-accounts/?search=${this.state.accountSearchText}`
        : this.state.next;
    axios.get(next, config).then((res) => {
      console.log(res.data.results);
      this.setState({
        accountsList: this.state.accountsList.concat(res.data.results),
        next: res.data.next,
      });
    });
  };
  toDefault = async (state) => {
    this.setState({ next: undefined, [state]: [] });
    // await this.getMyWhiteLableAccounts();
  };
  componentDidMount() {
    console.log(this.props);
    this.getMyWhiteLableAccounts();
  }
  componentDidUpdate(prevProps, prevState) {
    // if (this.state.selectedAccount !== prevState.selectedAccount) {
    //   this.getUsers();
    // }
    if (this.state.accountSearchText !== prevState.accountSearchText) {
      //   this.setState({ next: undefined, accountsList: [] });
      this.toDefault("accountsList");
    }
    if (this.state.next !== prevState.next && this.state.next === undefined) {
      this.getMyWhiteLableAccounts();
    }
    if (this.state.selectedAccount.id !== prevState.selectedAccount.id) {
      console.log(this.state.selectedAccount);
    }
    if (this.props.activeAccount !== prevProps.activeAccount) {
      this.getMyWhiteLableAccounts();
    }
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleDropDownPick = (state, value) => {
    this.setState({ [state]: value });
  };
  render() {
    console.log(this.props);
    let allitems = this.state.accountsList.map((account) => {
      return (
        <NavDropdown.Item
          onClick={() => this.handleDropDownPick("selectedAccount", account)}
        >
          {account.name}{" "}
        </NavDropdown.Item>
      );
    });

    let options = (
      <NavDropdown title={`${"בחר חשבון"}`} id="basic-nav-dropdown">
        {" "}
        <DropDownSearch
          handleChange={this.handleChange}
          state={"accountSearchText"}
        ></DropDownSearch>
        <InfiniteScroll
          //   style={{ width: "100vw" }} //To put endMessage and loader to the top.
          // className="productCardsRow"
          dataLength={allitems.length}
          next={
            this.state.accountsList.length !== 0
              ? () => this.getMyWhiteLableAccounts()
              : ""
          }
          hasMore={
            true
            // this.state.next !== null ? true : false
          }
          loader={this.state.next !== null ? "" : " אין עוד תוצאות "}
        >
          {allitems}
        </InfiniteScroll>
      </NavDropdown>
    );
    return (
      <div>
        <Navbar collapseOnSelect expand="xl" bg="light" variant="light">
          <Navbar.Toggle
            variant="light"
            aria-controls="responsive-navbar-nav"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto">{options} </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.state.selectedAccount.id !== "" ? (
          <Profile
            accountID={whiteLableStores[this.props.href]}
            path={"separated-accounts"}
            activeAccount={this.props.activeAccount}
            accessToken={this.props.accessToken}
            deleteAccount={this.props.deleteAccount}
            resetPassword={this.props.resetPassword}
            accountToEdit={this.state.selectedAccount}
            userToEdit={this.state.selectedUser}
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
