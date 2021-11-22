import React, { Component } from "react";
import EmailForm from "../components/EmailForm";

export default class Pricing extends Component {
  render() {
    return (
      <div className="pricingPage">
        <h1>
          בימים אלו אנו מריצים גירסת נסיון של השירות, אם אתם מעוניים להתנסות
          בחינם צרו קשר בטופס
        </h1>
        <EmailForm
          closeGenericModal={this.props.closeGenericModal}
          openGenericModal={this.props.openGenericModal}
        ></EmailForm>
      </div>
    );
  }
}
