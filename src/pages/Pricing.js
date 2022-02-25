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
          captchaResponse={this.props.captchaResponse}
          isRealUser={this.props.isRealUser}
          verifyCallback={this.props.verifyCallback}
          reCaptchaLoded={this.props.reCaptchaLoded}
          handleVerified={this.props.handleVerified}
          closeGenericModal={this.props.closeGenericModal}
          openGenericModal={this.props.openGenericModal}
        ></EmailForm>
        <div className="connectUsBox">
          <div> תמיכה : support@sapakos.com</div>
        </div>
      </div>
    );
  }
}
