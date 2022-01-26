import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

export default class DiscountModal extends Component {
  render() {
    return (
      <div>
        <>
          <Modal
            backdrop={
              this.props.preventModalDefult === true ? "static" : "fade-out"
            }
            dataKeyboard={false}
            show={this.props.isDiscountModalOpen}
            onHide={
              // this.props.closeModal
              this.props.preventModalDefult !== true
                ? this.props.closeModal
                : null
            }
          >
            <Modal.Header
              style={
                this.props.top && !this.props.text && !this.props.bottom
                  ? { justifyContent: "center" }
                  : { justifyContent: "" }
              }
              closeButton={
                this.props.preventModalDefult === true ? "disabled" : null
              }
            >
              <Modal.Title>{this.props.top}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.props.text}</Modal.Body>
            <Modal.Footer>
              {this.props.bottom}
              {this.props.preventModalDefult === true ? null : (
                <Button variant="primary" onClick={this.props.closeModal}>
                  סגור
                </Button>
              )}
            </Modal.Footer>
          </Modal>
        </>
      </div>
    );
  }
}
