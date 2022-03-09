import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class WhiteLableHome extends Component {
  render() {
    let disconectView = (
      <>
        <h1>
          {" "}
          ברוכים הבאים למערכת ההזמנות של {this.props.whiteLableStore.name}
        </h1>
        <div>הכניסה וההרשמה היא ללקוחות סיטונאים בלבד</div>
        <div>
          אם ברצונכם ליצור הזמנה ואין לכם חשבון, צרו קשר בטלפון{" "}
          {this.props.whiteLableStore.phone_number}
        </div>
        <span>
          <Button
            className=" w-25 mr-auto ml-auto"
            onClick={() => this.props.openModal()}
          >
            {" "}
            התחבר
          </Button>

          <Button
            className=" w-25 mr-auto ml-auto "
            onClick={() => window.location.assign("/#/register")}
          >
            {" "}
            הירשם
          </Button>
        </span>
      </>
    );
    let connectedView = window.location.assign(
      `/#/StorePage/${this.props.whiteLableStore.id}`
    );
    return (
      <div className="whiteLableHomeContainer">
        <div className="centered whiteLableHome">
          {this.props.activeAccount ? connectedView : disconectView}
        </div>
      </div>
    );
  }
}
