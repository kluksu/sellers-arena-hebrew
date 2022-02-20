import React, { Component } from "react";
import { BiStore } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import { RiUserAddLine } from "react-icons/ri";
import { AiOutlinePhone } from "react-icons/ai";
import { ImWhatsapp } from "react-icons/im";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import postPhotos from "./PostPhotos";
export default class PostNavBar extends Component {
  render() {
    return (
      <div className="postNavBar">
        <BiStore
          onClick={() =>
            window.location.assign(`/#/StorePage/${this.props.post.account_id}`)
          }
        ></BiStore>
        {/* <AiOutlineSetting></AiOutlineSetting> */}
        {/* <RiUserAddLine
          onClick={() => {
            this.props.addToContacts(this.props.post.account_id);
          }}
        ></RiUserAddLine> */}
        {/* <a style={{ color: "white", marginTop: "-9px" }} href={`tel:${""}`}>
          <AiOutlinePhone></AiOutlinePhone>
        </a> */}
        {/* <ImWhatsapp></ImWhatsapp> */}
        {/* <AiOutlineEye
          onClick={() =>
            window.location.assign(
              `/#/StorePage/${this.props.post.account_id}/product_page/${this.props.post.related_id}`
            )
          }
        ></AiOutlineEye> */}
        <AiOutlineMessage
          onClick={() =>
            this.props.handleOpenMessage(
              this.props.post.account_id,
              this.props.threadID
            )
          }
        ></AiOutlineMessage>
      </div>
    );
  }
}
