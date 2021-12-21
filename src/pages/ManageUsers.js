import React, { Component } from "react";
import { Button, Form, Tab, Col, Row, Tabs } from "react-bootstrap";
import { domain, getData, postData } from "../components/utils";
import ControlPanelAddUser from "../components/ControlPanelAddUser";
import CreatUserInAccount from "../components/CreatUserInAccount";
import DeleteUserInAccount from "../components/DeleteUserInAccount";
import UserPremmitions from "../components/UserPremmitions";
import { Route } from "react-router-dom";
import MyUsers from "../components/MyUsers";

export default class ManageUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "",
      userType: "",
    };
  }
  addUser = () => {
    postData(
      `${domain}/supplier-orders/my-users/?account_id=${this.props.activeAccount.id}`,
      { user_id: this.state.user_id, user_type: this.state.user_type },
      ` ${this.props.accessToken}`
    ).then((data) => {});
  };

  render() {
    const existingUsersArr = [];
    return (
      <>
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="myUsers" title=" המשתמשים שלי">
            <MyUsers
              myUsers={this.props.myUsers}
              getMyUsers={this.props.getMyUsers}
              closeGenericModal={this.props.closeGenericModal}
              openGenericModal={this.props.openGenericModal}
              activeAccount={this.props.activeAccount}
              accessToken={this.props.accessToken}
            ></MyUsers>
          </Tab>
          <Tab eventKey="add-user" title=" הוסף משתמש קיים">
            <ControlPanelAddUser
              closeGenericModal={this.props.closeGenericModal}
              openGenericModal={this.props.openGenericModal}
              activeAccount={this.props.activeAccount}
              accessToken={this.props.accessToken}
            ></ControlPanelAddUser>
          </Tab>
          <Tab eventKey="create-user" title="צור משתמש חדש">
            <CreatUserInAccount
              closeGenericModal={this.props.closeGenericModal}
              openGenericModal={this.props.openGenericModal}
              activeAccount={this.props.activeAccount}
              accessToken={this.props.accessToken}
            ></CreatUserInAccount>
          </Tab>
          <Tab eventKey="delete-user" title="מחק משתמש">
            <DeleteUserInAccount
              closeGenericModal={this.props.closeGenericModal}
              openGenericModal={this.props.openGenericModal}
              getMyUsers={this.props.getMyUsers}
              myUsers={this.props.myUsers}
              activeAccount={this.props.activeAccount}
              accessToken={this.props.accessToken}
            ></DeleteUserInAccount>
          </Tab>
          <Tab eventKey="edit-user" title="ערוך הרשאות משתמש">
            <UserPremmitions
              closeGenericModal={this.props.closeGenericModal}
              openGenericModal={this.props.openGenericModal}
              getMyUsers={this.props.getMyUsers}
              myUsers={this.props.myUsers}
              activeAccount={this.props.activeAccount}
              accessToken={this.props.accessToken}
            ></UserPremmitions>
          </Tab>
        </Tabs>
      </>
    );
  }
}
