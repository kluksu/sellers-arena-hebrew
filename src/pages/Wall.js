import React, { Component } from "react";
import FullPageLoader from "../components/FullPageLoader";
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
      return <div className="wallMessages">{allMessages}</div>;
    }
  }
}
