import axios from "axios";
import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { CgArrowLongRight } from "react-icons/cg";
import { domain } from "./utils";

export default class AccountPrefrences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsList: [
        { event_account_post_wall_event: " איש קשר העלה פוסט חדש " },
        { event_variation_stock_increase_wall_event: "מלאי דגם חודש" },
        { event_variation_price_drop_wall_event: "מחיר דגם ירד" },
        {
          event_variation_personal_discount_created_wall_event:
            "הנחה אישית נוצרה",
        },
        { event_variation_back_in_stock_wall_event: "מוצר חזר למלאי" },
        { event_item_created_wall_event: "מוצר חדש התווסף" },
        { event_variation_created_wall_event: "דגם חדש התווסף" },
        {
          event_variation_public_discount_changed_wall_event:
            "הנחה חדשה התווספה לדגם",
        },
        {
          event_order_created_admins_email: "קבלת אימייל בעת קבלת הזמנה חדשה",
        },
      ],
    };
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(name, value);
    this.setState({
      [name]: value,
    });
  }
  componentDidMount() {
    const authorization = !this.props.accessToken
      ? null
      : `Bearer ${this.props.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    axios
      .get(
        `${domain}/my-account-preferences/${this.props.activeAccount.id}/`,
        config
      )
      .then((res) =>
        Object.entries(res.data).forEach((event) => {
          this.setState({ [event[0]]: event[1] });
        })
      );
  }
  saveChanges = () => {
    const authorization = !this.props.accessToken
      ? null
      : `Bearer ${this.props.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    let changedEvents = {};
    this.state.eventsList.forEach((event) => {
      changedEvents[Object.keys(event)] = this.state[Object.keys(event)];
    });
    console.log(changedEvents);
    axios
      .patch(
        `${domain}/my-account-preferences/${this.props.activeAccount.id}/`,

        changedEvents,
        config
      )
      .then((res) => this.props.openGenericModal("השינויים נשמרו בהצלחה"))
      .catch((er) => {
        this.props.openGenericModal(
          "אופס",
          "ישנה בעיה, אם הבעיה נמשכת נא לדווח לנו בעמוד צור קשר"
        );
      });
  };
  render() {
    return (
      <div className="prefrencesContainer">
        <h1>איזה סוגי עדכונים ברצונך לקבל?</h1>
        <Form>
          {this.state.eventsList.map((event) => (
            <div className=" prefrencesCheckBoxes">
              {Object.values(event)}
              <Form.Check
                onChange={(e) => this.handleInputChange(e)}
                type={"checkbox"}
                checked={this.state[Object.keys(event)]}
                // id={`default-${type}`}
                name={Object.keys(event)}
              />
            </div>
          ))}
          <Button onClick={this.saveChanges}>אשר שינויים</Button>
        </Form>
      </div>
    );
  }
}
