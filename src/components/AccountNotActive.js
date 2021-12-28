import { object } from "prop-types";
import React, { Component } from "react";

export default class AccountNotActive extends Component {
  render() {
    let display = window.location.href.includes("register") ? "none" : "";

    let accountNotActive =
      this.props.is_active === false ||
      typeof this.props.activeAccount !== "object" ? (
        <div style={{ display: display }} className="notActiveMessageContainer">
          {" "}
          <div className="notActiveMessage">
            חשבון זה בהמתנה לאישור המערכת, עד שחשבון זה לא יאושר לא יהיה ניתן
            לעשות בו אף פעולה<br></br>
            במידה וישנה בעיה ניתן ליצור קשר דרך עמוד יצירת קשר או בטלפון
            0507780982
          </div>
        </div>
      ) : null;
    return accountNotActive;
  }
}
