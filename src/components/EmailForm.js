import React, { Component } from "react";
import emailjs from "emailjs-com";
import { Button, Container, Form } from "react-bootstrap";

export default class EmailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
      errorMessage: "",
    };
  }
  closeModalAndGoBackHome = () => {
    window.location.assign("/#/");
    this.props.closeGenericModal();
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  sendEmail = (e) => {
    if (
      this.state.name !== "" &&
      this.state.phone !== "" &&
      this.state.email !== "" &&
      this.state.subject !== "" &&
      this.state.message !== ""
    ) {
      e.preventDefault();

      emailjs
        .sendForm(
          "default_service",
          "template_bnhobxj",
          e.target,
          "user_luCcUIntINSgugJfQeWCK"
        )
        .then(
          (result) => {
            this.setState({
              errorMessage: "",
            });
            this.props.openGenericModal(
              "תודה רבה!",
              "קיבלנו את הפניה וניצור קשר בהקדם",
              <Button onClick={this.closeModalAndGoBackHome}>
                חזור לעמוד הראשי{" "}
              </Button>
            );
            console.log(result.text);
          },
          (error) => {
            this.setState({
              errorMessage: "אופס, יש תקלה, אנא נסה שנית מאוחר יותר",
            });
            console.log(error.text);
          }
        );
      e.target.reset();
    } else {
      this.setState({
        errorMessage: "  הטופס לא נשלח, אנא ודא שכל השדות מלאים",
      });
    }
  };

  render() {
    return (
      <Container className="connectComponent">
        <Form onSubmit={this.sendEmail}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>נושא הפניה</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="text"
              placeholder=""
              name="subject"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>שם</Form.Label>

            <Form.Control
              onChange={this.handleChange}
              name="name"
              type="text"
              placeholder=""
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>מייל</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="email"
              placeholder="name@example.com"
              name="email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>טלפון</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="number"
              placeholder="xxx-xxxxxxx"
              name="phone"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>תוכן הפנייה</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              //   type="text"
              as="textarea"
              rows={4}
              placeholder=""
              name="message"
            />
          </Form.Group>
          <p className="FormRejects ">{this.state.errorMessage}</p>
          <Button className="w-100" type="submit">
            שלח טופס
          </Button>
        </Form>
      </Container>
    );
  }
}
