import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import FullPageLoader from "../components/FullPageLoader";
import PostComponent from "../components/PostComponent";
import WallMessages from "../components/WallMessages";

export default class Wall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMessages: [],
    };
  }
  //   componentDidMount() {
  //     this.props.getContactsMesssageBoard();
  //     this.setState({ allMessages: this.props.allMessages });
  //   }
  //   componentDidUpdate(prevProps, prevState) {
  //     if (this.props.myContacts !== prevProps.myContacts) {
  //       this.props.getContactsMesssageBoard();
  //     }
  //   }
  render() {
    let allMessages = [];
    this.props.allMessages.forEach((message) => {
      allMessages.push(<WallMessages userInfo={message}></WallMessages>);
    });

    {
      return (
        <div className="wall">
          {/* <Row> */}{" "}
          <PostComponent
            closeGenericModal={this.props.closeGenericModal}
            openGenericModal={this.props.openGenericModal}
            activeAccount={this.props.activeAccount}
            accessToken={this.props.accessToken}
          ></PostComponent>
          <div className="wallMessages">{allMessages}</div>
          {/* </Row> */}
        </div>
      );
    }
  }
}
