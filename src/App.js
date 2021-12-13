import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MyNavBar from "./components/MyNavBar";
import FullPageLoader from "./components/FullPageLoader";

import Login from "./pages/Login";
import Register from "./pages/Register";
import OpenAccount from "./pages/OpenAccount";
import EditItemPage2 from "./pages/EditItemPage2";
import React from "react";
import {
  delivered,
  domain,
  getData,
  postData,
  takeMeHome,
} from "./components/utils";
import NewMessageModal from "./components/NewMessageModal";
import Uploadpage from "./pages/Uploadpage";
import EditVariationPage from "./pages/EditVariationPage";
import ProductVaritionPage from "./pages/ProductVaritionPage";
import ManageUsers from "./pages/ManageUsers";
import ControlPanel from "./pages/ControlPanel";
import "filepond/dist/filepond.min.css";
import AddMyItems from "./pages/AddMyItems";
import StorePage from "./pages/StorePage";
import axios from "axios";
import OrderSummery from "./pages/OrderSummery";
import SupplierOrder from "./pages/SupplierOrder";
import ProductPage from "./pages/ProductPage";
import FiltteredCategoryPage from "./pages/FiltteredCategoryPage";
import Suppliers from "./pages/Suppliers";
import { IoIosMail } from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";
import DiscountModal from "./components/DiscountModal";
import RootPage from "./pages/RootPage";
import { Button, Form } from "react-bootstrap";
import Profile from "./pages/Profile";
import EmailForm from "./components/EmailForm";
import Pricing from "./pages/Pricing";
import recaptcha from "react-recaptcha";
import AccountNotActive from "./components/AccountNotActive";
//${domain}/
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // modal
      isOpen: false,
      // login
      me: "",
      loginData: "",
      accessToken: "",
      refreshToken: "",
      // getAccountData
      userAccounts: "", //results: (2) [{…}, {…}]
      activeAccount: undefined,
      //currency
      currency: "USD $",
      //uploaditem
      CurrentUploadItemId: "",
      //shoppingCarts
      MyShoppingCarts: [],
      //supplier orders
      MySupplierOrders: [],
      sellerApprovedOrders: [],
      fulfilledOrders: [],
      payedOrders: [],
      selectedCategory: "",
      massgaesThreads: [],
      searchThreadText: "",
      isMessagesOpen: "none",
      currentStore: "",
      messageText: "",
      allThreads: [],
      threadTextRespons: "",
      LoaderVisibilty: "",
      myContacts: [],
      messagesWasReadObj: {},
      activeCart: {},
      screenWidth: "",
      userDevice: "",
      isGenericModalOpen: false,
      modalText: "",
      modalTop: "",
      modalBottom: "",
      isRealUser: true,
      preventModalDefult: false,
    };
  }
  verifyCallback = (response) => {
    if (response) {
      console.log(response);
      this.setState({ captchaResponse: response });
      this.setState({ isRealUser: true });
      setTimeout(
        () => {
          this.setState({ isRealUser: false });
        },

        60000
      );
    } else {
      this.setState({ isRealUser: false });
    }
  };
  reCaptchaLoded = () => {
    console.log("reacptcha has loaded");
  };
  handleVerified = () => {
    if (this.state.isRealUser === true) {
      alert("ok");
    } else {
      alert("please verify that you are a real user");
    }
  };
  ///////root account only functions start
  activateDeActivateAccount = (accountID, bollean) => {
    const authorization = !this.state.accessToken
      ? null
      : `Bearer ${this.state.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    return axios.patch(
      `${domain}/accounts/${accountID}/`,
      { is_active: bollean },

      config
    );
  };
  ///////root account only functions end

  closeGenericModal = () => {
    if (this.state.preventModalDefult !== true) {
      this.setState({ modalText: "" });
      this.setState({ modalTop: "" });
      this.setState({ modalBottom: "" });
      this.setState({ isGenericModalOpen: false });
    }
  };
  openGenericModal = (top, text, bottom, prevent) => {
    prevent =
      prevent === "prevent"
        ? this.setState({ preventModalDefult: true })
        : this.setState({ preventModalDefult: false });
    this.setState({ modalText: text });
    this.setState({ modalTop: top });
    this.setState({ modalBottom: bottom });

    this.setState({ isGenericModalOpen: true });
  };
  openGenericModalOrderSummery = () => {
    this.openGenericModal(
      "הפעולה נעשתה בהצלחה",
      "",
      <Button
        onClick={() => {
          window.location.assign("/#/");
          this.setState({ isGenericModalOpen: false });
          this.closeGenericModal();
        }}
      >
        חזור לעמוד הבית
      </Button>,
      "prevent"
    );
  };
  // getUnregisteredAccount=()=>{

  // }
  getAllOrders = () => {
    this.getOrders("submitted", "MySupplierOrders");
    this.getOrders("seller_approved", "sellerApprovedOrders");
    this.getOrders("filled", "fulfilledOrders");
    this.getOrders("payed", "payedOrders");
  };
  markOrderAs = (orderID, status) => {
    let statusName = status === "fill" ? "delivered" : "";
    const authorization = !this.state.accessToken
      ? null
      : `Bearer ${this.state.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    axios.get(`${domain}/supplier-orders/${orderID}/`, config).then((res) => {
      if (status === "fill") {
        console.log(res.data.cart_id);
        console.log(orderID);
        this.deleteCart(res.data.cart_id);
      }
    });
    return axios
      .post(`${domain}/supplier-orders/${orderID}/${status}/`, {}, config)
      .then((res) => {
        this.getCarts();
        this.getAllOrders();
        this.openGenericModalOrderSummery();
      })
      .catch(
        this.openGenericModal(
          "Error",
          "somthing went wrong, please check all the information and try again"
        )
      );
  };
  getUnregistered = (id) => {
    let newID = id ? id + "/" : "";
    const authorization = !this.state.accessToken
      ? null
      : `Bearer ${this.state.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    return axios.get(`${domain}/unregistered-accounts/${newID}`, config);
  };
  getActiveCart = (activeCart) => {
    this.setState({ activeCart: activeCart });
  };
  markMessageAsRead = (threadID) => {
    this.submitText(threadID, `wasReadBy ${this.state.activeAccount.id}`);
  };
  checkOut = (cartiD) => {
    console.log(this.state.accessToken);
    return postData(
      `${domain}/cart/${cartiD}/checkout/`,
      "",
      ` ${this.state.accessToken}`
    );
  };
  removeContact = (contactID) => {
    const authorization = !this.state.accessToken
      ? null
      : `Bearer ${this.state.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    return axios.delete(
      `${domain}/my-accounts/${this.state.activeAccount.id}/contacts/${contactID}/`,
      config
    );
  };
  addToContacts = (contactID) => {
    this.setState({
      messageText:
        "היי, צירפתי אותך לרשימת אנשי הקשר שלי, כעת אתה חשוף לכמות גדולה יותר של מידע על העסק שלי, אנא צרף אותי לרשימת אנשי הקשר שלך על מנת שאהיה חשוף למידע אודותיך (מחירים, מוצרים, עדכונים, מבצעים ועוד)",
    });

    const authorization = !this.state.accessToken
      ? null
      : `Bearer ${this.state.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    return axios
      .post(
        `${domain}/my-accounts/${this.state.activeAccount.id}/contacts/`,
        {
          account_contact_id: contactID,
        },
        config
      )
      .then(this.openGenericModal("רשימת אנשי הקשר עודכנה בהצלחה"))
      .catch((error) => {
        console.log(error);
      });
  };
  getContacts = () => {
    const authorization = !this.state.accessToken
      ? null
      : `Bearer ${this.state.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    return axios.get(
      `${domain}/my-accounts/${this.state.activeAccount.id}/contacts/`,
      config
    );
  };

  postAndGetContacts = (contactID) => {
    this.setState({ LoaderVisibilty: "" });
    this.addToContacts(contactID).then((res) => {
      console.log(res);
      this.sendMessage(res.data.account_contact.id);

      this.getContacts().then((res) => {
        this.setState({ myContacts: res.data });
        console.log(res);
        this.setState({ LoaderVisibilty: "none" });
      });
    });
  };
  //tomorrow create a list of all the contacts for the mycontacts state

  getMessagesArcive = (threadID, quntity, bollean) => {
    if (bollean !== false) {
      this.setState({ threadTextRespons: "" });
    }
    const authorization = !this.state.accessToken
      ? null
      : `Bearer ${this.state.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    if (threadID !== "") {
      return axios.get(
        `${domain}/messages/?limit=${quntity}&message_thread=${threadID}`,
        config
      );
      //       .then((res => {
      //         console.log(res)
      //           this.setState({ threadTextRespons: res})
      // }))
    }
  };
  getAllActiveThreads = () => {
    const authorization = !this.state.accessToken
      ? null
      : `Bearer ${this.state.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    return axios.get(`${domain}/message-threads/`, config);
  };
  getMessageText = (event) => {
    this.setState({ messageText: event.target.value });
  };
  getCurrentstore = (storeID) => {
    const authorization = !this.state.accessToken
      ? null
      : `Bearer ${this.state.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    return axios.get(`${domain}/public-accounts/${storeID}`, config);
  };
  submitText = (threadID, optionalText) => {
    let text = optionalText ? optionalText : this.state.messageText;
    const authorization = !this.state.accessToken
      ? null
      : `Bearer ${this.state.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    return axios.post(
      `${domain}/messages/`,
      {
        message_thread: threadID,
        src_account: this.state.activeAccount.id,
        text: text,
      },
      config
    );
  };

  sendMessage = (accountID) => {
    const authorization = !this.state.accessToken
      ? null
      : `Bearer ${this.state.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    axios.get(`${domain}/message-threads/`, config).then((res) => {
      this.setState({ messageThreads: res.data });
      console.log(res);
      let counter = 0;

      res.data.results.forEach((result) => {
        counter++;

        if (
          result.participants[0].id == this.state.currentStore.id ||
          result.participants[1].id == this.state.currentStore.id
        ) {
          this.submitText(result.id);
        }
      });
      if (counter == res.data.results.length) {
        this.createMessageThread(accountID);
      }
    });
    this.handleClose();
  };

  createMessageThread = (storeID) => {
    const authorization = !this.state.accessToken
      ? null
      : `Bearer ${this.state.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    axios
      .post(
        `${domain}/message-threads/`,
        { account_id: this.state.activeAccount.id, other_account_id: storeID },
        config
      )
      .then((res) => {
        this.submitText(res.data.id /*this.state.activeAccount.id)*/);
        this.getAllActiveThreads().then((res) => {
          this.setState({ allThreads: res.data.results });
          console.log(res.data.results);
        });

        console.log(res);
      });
  };
  //לתקן את הסינכרון של ההודעות כאשר המודל נפתח מעמוד חנות

  toggleMessages = () => {
    let messages = this.state.isMessagesOpen === "none" ? "" : "none";
    this.setState({ isMessagesOpen: messages });
  };

  handleOpenMessage = async (storeID, threadID) => {
    this.markMessageAsRead(threadID);

    this.getThreadsAndMarkUnRead();
    this.setState({ currentStore: "" });
    if (threadID) {
      this.getMessagesArcive(threadID).then((res) => {
        console.log(res);
        this.setState({ threadTextRespons: res });
        console.log(res);
        // if (
        //   threadID &&
        //   !res.data.results[0].text.includes(
        //     `wasReadBy ${this.state.activeAccount.id}` ||
        //       !res.data.results[1].text.includes(
        //         `wasReadBy ${this.state.activeAccount.id}`
        //       )
        //   )
        // ) {
        // }
      });
    }
    this.getCurrentstore(storeID).then((res) => {
      this.setState({ currentStore: res.data });
    });
    this.setState({ isMessageModalOpen: true });

    this.setState({ storeID: storeID });
  };
  handleClose = () => {
    this.setState({ isMessageModalOpen: false });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  deleteCart = (cart) => {
    const authorization = !this.state.accessToken
      ? null
      : `Bearer ${this.state.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    axios.delete(`${domain}/cart/${cart}`, config).then((data) => {
      console.log(data);
      if (data.status == 204) {
        this.getCarts();
        window.location.assign("/#/");
      }
    });
  };
  resize() {
    this.setState({ screenWidth: window.innerWidth });
    console.log(this.state.screenWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }
  isMobile = () => {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    if (check === true) {
      this.setState({ userDevice: "mobile" });
    } else {
      this.setState({ userDevice: "computer" });
    }
  };
  getMe = () => {
    const authorization = !this.state.accessToken
      ? null
      : `Bearer ${this.state.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    axios.get(`${domain}/me/`, config).then((res) => {
      this.setState({ me: res.data });
    });
  };
  componentDidMount() {
    this.getMe();
    this.isMobile();
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();

    console.log("!!!!!!!!!!");
    if (localStorage.getItem("account")) {
      console.log(localStorage.getItem("account"));
      this.setState({ activeAccount: localStorage.getItem("account") });
      this.setState({ refreshToken: localStorage.getItem("refresh") });
    }
    console.log(localStorage.getItem("refresh"));
    this.refresh().then((data) => {
      this.getAllInfo(data);
    });

    this.setState({ LoaderVisibilty: "" });
    // console.log(this.state.userAccounts)
    // // if(this.state.accessToken && this.state.userAccounts.)
    this.getCarts();
    this.setState({ LoaderVisibilty: "none" });
  }
  getSpecificOrder = (orderID) => {
    const authorization = !this.state.accessToken
      ? null
      : `Bearer ${this.state.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    return axios.get(`${domain}/my-orders/${orderID}`, config);
  };
  getOrders = (status, state) => {
    const authorization = !this.state.accessToken
      ? null
      : `Bearer ${this.state.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    axios
      .get(`${domain}/supplier-orders/?order_status=${status}`, config)
      .then((data) => {
        console.log(data);
        if (data.status == 200) {
          this.setState({ [state]: data.data.results });
        }
      });
  };
  goToNewAccount = (newAccount) => {
    this.setState({ activeAccount: newAccount });
    localStorage.setItem("account", newAccount);
  };
  getCarts = () => {
    this.setState({ MyShoppingCarts: [] });
    this.getCart("cart_status_reopen").then((data) => {
      console.log(data);

      // this.getCart("cart_status_open").then((res) => {
      this.setState({ MyShoppingCarts: data.data.results });
      this.getCart("cart_status_open").then((res) => {
        this.setState({
          MyShoppingCarts: this.state.MyShoppingCarts.concat(res.data.results),
        });
      });
      //   carts.concat(res.data.results);
      // });
    });
  };
  getCart = (status) => {
    const authorization = !this.state.accessToken
      ? null
      : `Bearer ${this.state.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    return axios.get(`${domain}/cart/?status=${status}`, config);
  };
  getCurrentUploadItemId = (id) => {
    this.setState({ CurrentUploadItemId: id });
  };
  selectAccount = (selectedAccount) => {
    for (let i = 0; i < this.state.userAccounts.length; i++) {
      const element = this.state.userAccounts[i];
      if (this.state.userAccounts.length === 1) {
      }
      if (element.name === selectedAccount) {
        let account = element;
        this.setState({ activeAccount: account });
        localStorage.setItem("account", account);
      }
    }
    takeMeHome();
  };

  logout = () => {
    localStorage.setItem("refresh", null);
    this.state = [];
    this.setState({ refreshToken: "" });
    this.setState({ activeAccount: "" });
    this.setState({ accessToken: null });
    this.setState({ MyShoppingCarts: [] });
    this.setState({ allThreads: [] });

    takeMeHome();
  };
  openModal = () => this.setState({ isOpen: true, loginData: {} });
  closeModal = () => this.setState({ isOpen: false });
  loginPostData = (email, password) => {
    // console.log("!!!!!!!!!!!!");
    postData(`${domain}/token/`, {
      email: email,
      password: password,
    }).then((data) => {
      console.log(data);
      if (data) {
        this.setState({ loginData: data });
      }
      this.getAllInfo(data);
      if (this.state.activeAccount) {
        takeMeHome();
      }
    });
  };
  getAllInfo = (data) => {
    this.setState({ refreshToken: data.refresh, accessToken: data.access });
    console.log(data.refresh);
    if (data.refresh) {
      localStorage.setItem("refresh", data.refresh);
    }

    if (this.state.accessToken) {
      this.closeModal();
      this.getCarts();
      /////////////////////////////////////////////////////
      getData(`${domain}/my-accounts/`, "", ` ${this.state.accessToken}`).then(
        (data) => {
          console.log(data);
          if (data.results.length == 0) {
            window.location.assign("/#/openAccount");
          }
          this.setState({ userAccounts: data.results });
          if (data.results.length === 1) {
            this.setState({ activeAccount: this.state.userAccounts[0] });
            localStorage.setItem("account", this.state.userAccounts[0]);
          }
        }
      );
    }
  };

  refresh = () => {
    return postData(`${domain}/token/refresh/`, {
      refresh: this.state.refreshToken
        ? this.state.refreshToken
        : localStorage.getItem("refresh"),
    });
  };
  checkForMessages = () => setInterval(this.getThreadsAndMarkUnRead(), 300000);

  getThreadsAndMarkUnRead = () => {
    this.getAllActiveThreads().then((res) => {
      console.log(res);
      res.data.results.forEach((thread) => {
        let participant =
          thread.participants[0].id !== this.state.activeAccount.id &&
          this.state.activeAccount
            ? thread.participants[0]
            : thread.participants[1];
        console.log(participant);
        this.getMessagesArcive(thread.id, "2", false).then((res) => {
          let messagesWasReadObj = this.state.messagesWasReadObj;
          if (
            res.data.results[0].text ===
              `wasReadBy ${this.state.activeAccount.id}` ||
            (res.data.results[1] &&
              res.data.results[1].text ===
                `wasReadBy ${this.state.activeAccount.id}`)
          ) {
            messagesWasReadObj[participant.name] = "";
          } else {
            messagesWasReadObj[participant.name] = "red";
          }
          this.setState({ messagesWasReadObj: messagesWasReadObj });
        });
      });

      this.setState({ allThreads: res.data.results });
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.activeAccount !== undefined &&
      prevState.activeAccount === undefined
    ) {
      console.log(this.state.activeAccount);
    }
    if (this.state.sellerApprovedOrders !== prevState.sellerApprovedOrders) {
      console.log(this.state.sellerApprovedOrders);
    }
    if (this.state.accessToken !== prevState.accessToken) {
      setTimeout(() => {
        this.refresh().then((data) => {
          this.setState({ accessToken: data.access });
          localStorage.setItem("refresh", data.refresh);
        });
      }, 8600000);
    }
    if (this.state.activeAccount) {
      console.log(this.state.activeAccount.id);
      if (this.state.activeAccount !== prevState.activeAccount) {
        this.getMe();

        this.getThreadsAndMarkUnRead();
        this.getContacts().then((res) => {
          this.setState({ myContacts: res.data });
        });
        this.getAllOrders();

        this.getAllActiveThreads();
      }
    }
  }
  render() {
    console.log(this.state.activeAccount);
    let unreadMessages = 0;
    for (const [key, value] of Object.entries(this.state.messagesWasReadObj)) {
      if (value === "red") {
        unreadMessages++;
      }
    }
    let vibretMessages =
      unreadMessages > 0
        ? "animate__animated animate__headShake animate__repeat-3	animate__delay-5s	"
        : "";
    let messagesButton =
      this.state.screenWidth > 500 ? (
        <Button
          className={`${vibretMessages} no-print messagesButton `}
          onClick={this.toggleMessages}
        >
          messages
          <AiOutlineMail />
          <span style={{ color: "" }}> {`(${unreadMessages})`}</span>
        </Button>
      ) : (
        <Button
          style={{ width: "auto" }}
          className=" no-print messagesButton "
          onClick={this.toggleMessages}
        >
          <AiOutlineMail />
          <span style={{ color: "" }}> {`(${unreadMessages})`}</span>
        </Button>
      );
    //start bug here
    // if (this.state.refreshToken && !this.state.accessToken) {
    //   return <FullPageLoader></FullPageLoader>;
    // }
    /////
    console.log(this.state.allThreads);
    let showMassegesRead = [];
    let showMassegesUnRead = [];

    this.state.allThreads.forEach((thread) => {
      let participant =
        thread.participants[0].id !== this.state.activeAccount.id &&
        this.state.activeAccount
          ? thread.participants[0]
          : thread.participants[1];
      if (
        participant !== undefined &&
        participant.name
          .toLowerCase()
          .includes(this.state.searchThreadText.toLowerCase())
      ) {
        console.log(this.state.messagesWasReadObj[participant.name]);
        let showMasseges =
          this.state.messagesWasReadObj[participant.name] === "red"
            ? showMassegesUnRead
            : showMassegesRead;

        showMasseges.push(
          <li
            style={{
              background: this.state.messagesWasReadObj[participant.name],
            }}
            className="messagesLi"
            onClick={() => this.handleOpenMessage(participant.id, thread.id)}
          >
            {participant.name}
          </li>
        );
      }
    });
    let showMasseges = showMassegesUnRead.concat(showMassegesRead);

    return (
      <div className="App">
        <FullPageLoader
          LoaderVisibilty={this.state.LoaderVisibilty}
        ></FullPageLoader>
        <AccountNotActive
          is_active={
            this.state.activeAccount ? this.state.activeAccount.is_active : null
          }
        ></AccountNotActive>
        <HashRouter>
          <ul
            className="messagesList"
            style={{ display: this.state.isMessagesOpen }}
          >
            <Form.Group className="mb-3" controlId="">
              <Form.Control
                onChange={this.handleChange}
                type="text"
                placeholder="search"
                name="searchThreadText"
              />
            </Form.Group>
            {showMasseges}
          </ul>

          {messagesButton}
          <MyNavBar
            me={this.state.me}
            payedOrders={this.state.payedOrders}
            fulfilledOrders={this.state.fulfilledOrders}
            sellerApprovedOrders={this.state.sellerApprovedOrders}
            MySupplierOrders={this.state.MySupplierOrders}
            deleteCart={this.deleteCart}
            getCarts={this.getCarts}
            MyShoppingCarts={this.state.MyShoppingCarts}
            accessToken={this.state.accessToken}
            logout={this.logout}
            openModal={this.openModal}
            closeModal={this.closeModal}
            isOpen={this.state.isOpen}
            userAccounts={this.state.userAccounts}
            loginData={this.state.loginData}
            activeAccount={this.state.activeAccount}
            loginPostData={this.loginPostData}
          ></MyNavBar>
          <Route exact path="/">
            <HomePage
              userDevice={this.state.userDevice}
              screenWidth={this.state.screenWidth}
              filterCategory={this.filterCategory}
              activeAccount={this.state.activeAccount}
              accessToken={this.state.accessToken}
            ></HomePage>
          </Route>
          <Route exact path="/category/:name">
            <FiltteredCategoryPage
              userDevice={this.state.userDevice}
              screenWidth={this.state.screenWidth}
              filterCategory={this.filterCategory}
              activeAccount={this.state.activeAccount}
              accessToken={this.state.accessToken}
            ></FiltteredCategoryPage>
          </Route>
          <Route exact path="/rootPage">
            <RootPage
              activateDeActivateAccount={this.activateDeActivateAccount}
            ></RootPage>
          </Route>
          <Route exact path="/openAccount">
            <OpenAccount
              captchaResponse={this.state.captchaResponse}
              isRealUser={this.state.isRealUser}
              verifyCallback={this.verifyCallback}
              reCaptchaLoded={this.reCaptchaLoded}
              // handleVerified={this.handleVerified}
              goToNewAccount={this.goToNewAccount}
              activeAccount={this.state.activeAccount}
              accessToken={this.state.accessToken}
            ></OpenAccount>
          </Route>
          <Route exact path="/register">
            <Register></Register>
          </Route>
          {/* <Route exact path="/login">
            <Login
              userAccounts={this.state.userAccounts}
              selectAccount={this.selectAccount}
            ></Login>
          </Route> */}
          <Route exact path="/uploadpage">
            <Uploadpage
              getCurrentUploadItemId={this.getCurrentUploadItemId}
              currency={this.state.currency}
              accessToken={this.state.accessToken}
              activeAccount={this.state.activeAccount}
            ></Uploadpage>
          </Route>
          <Route exact path="/ProductVaritionPage/:id">
            <ProductVaritionPage
              closeGenericModal={this.closeGenericModal}
              openGenericModal={this.openGenericModal}
              screenWidth={this.state.screenWidth}
              activeAccount={this.state.activeAccount}
              CurrentUploadItemId={this.state.CurrentUploadItemId}
              currency={this.state.currency}
              accessToken={this.state.accessToken}
              activeAccount={this.state.activeAccount}
            ></ProductVaritionPage>
          </Route>
          <Route exact path="/add_items">
            <AddMyItems
              screenWidth={this.state.screenWidth}
              activeAccount={this.state.activeAccount}
              accessToken={this.state.accessToken}
            ></AddMyItems>
          </Route>
          <Route exact path="/edit_item/:id">
            <EditItemPage2
              screenWidth={this.state.screenWidth}
              accessToken={this.state.accessToken}
              getCurrentUploadItemId={this.getCurrentUploadItemId}
              activeAccount={this.state.activeAccount}
            ></EditItemPage2>
          </Route>
          <Route exact path="/edit_variation/:id">
            <EditVariationPage
              closeGenericModal={this.closeGenericModal}
              openGenericModal={this.openGenericModal}
              screenWidth={this.state.screenWidth}
              activeAccount={this.state.activeAccount}
              accessToken={this.state.accessToken}
            ></EditVariationPage>
          </Route>
          <Route exact path="/StorePage/:id">
            <StorePage
              getAllOrders={this.getAllOrders}
              userDevice={this.state.userDevice}
              screenWidth={this.state.screenWidth}
              getUnregistered={this.getUnregistered}
              getActiveCart={this.getActiveCart}
              checkOut={this.checkOut}
              myContacts={this.state.myContacts}
              removeContact={this.removeContact}
              getMessagesArcive={this.getMessagesArcive}
              postAndGetContacts={this.postAndGetContacts}
              refreshToken={this.state.refreshToken}
              allThreads={this.state.allThreads}
              getCurrentstore={this.getCurrentstore}
              handleOpenMessage={this.handleOpenMessage}
              modalMessages={this.state.modalMessages}
              getThreads={this.getThreads}
              getCarts={this.getCarts}
              deleteCart={this.deleteCart}
              MyShoppingCarts={this.state.MyShoppingCarts}
              accessToken={this.state.accessToken}
              activeAccount={this.state.activeAccount}
            ></StorePage>
          </Route>
          <Route exact path="/order-summery/:id">
            <OrderSummery
              openGenericModalOrderSummery={this.openGenericModalOrderSummery}
              getSpecificOrder={this.getSpecificOrder}
              checkOut={this.checkOut}
              activeAccount={this.state.activeAccount}
              deleteCart={this.deleteCart}
              accessToken={this.state.accessToken}
            ></OrderSummery>
          </Route>
          {/* sellerApprovedOrders: [],
      fulfilledOrders: [],
      payedOrders: [], */}
          <Route exact path="/supplier-order/:id">
            <SupplierOrder
              openGenericModalOrderSummery={this.openGenericModalOrderSummery}
              getCarts={this.getCarts}
              screenWidth={this.state.screenWidth}
              getAllOrders={this.getAllOrders}
              markOrderAs={this.markOrderAs}
              accessToken={this.state.accessToken}
              activeAccount={this.state.activeAccount}
            ></SupplierOrder>
          </Route>

          <Route exact path="/control_panel/">
            <ControlPanel
              accessToken={this.state.accessToken}
              activeAccount={this.state.activeAccount}
            ></ControlPanel>
          </Route>
          <Route exact path="/control_panel/:name">
            <ControlPanel
              closeGenericModal={this.closeGenericModal}
              openGenericModal={this.openGenericModal}
              accessToken={this.state.accessToken}
              activeAccount={this.state.activeAccount}
            ></ControlPanel>
          </Route>
          <Route exact path="/storePage/:storeId/product_page/:productId">
            <ProductPage
              activeCart={this.state.activeCart}
              MyShoppingCarts={this.state.MyShoppingCarts}
              accessToken={this.state.accessToken}
              activeAccount={this.state.activeAccount}
              getCarts={this.getCarts}
            ></ProductPage>
          </Route>
          <Route exact path="/suppliers">
            <Suppliers accessToken={this.state.accessToken}></Suppliers>
          </Route>
          <Route exact path="/me">
            <Profile
              closeGenericModal={this.closeGenericModal}
              openGenericModal={this.openGenericModal}
              me={this.state.me}
              activeAccount={this.state.activeAccount}
              accessToken={this.state.accessToken}
            ></Profile>
          </Route>
          <Route exact path="/pricing">
            <Pricing
              captchaResponse={this.state.captchaResponse}
              isRealUser={this.state.isRealUser}
              verifyCallback={this.verifyCallback}
              reCaptchaLoded={this.reCaptchaLoded}
              handleVerified={this.handleVerified}
              closeGenericModal={this.closeGenericModal}
              openGenericModal={this.openGenericModal}
            ></Pricing>
          </Route>

          <NewMessageModal
            removeContact={this.removeContact}
            postAndGetContacts={this.postAndGetContacts}
            threadTextRespons={this.state.threadTextRespons}
            currentStore={this.state.currentStore}
            handleOpenMessage={this.handleOpenMessage}
            sendMessage={this.sendMessage}
            handleClose={this.handleClose}
            getMessageText={this.getMessageText}
            isOpen={this.state.isMessageModalOpen}
            activeAccount={this.state.activeAccount}
            accessToken={this.state.accessToken}
          ></NewMessageModal>
          <DiscountModal
            preventModalDefult={this.state.preventModalDefult}
            bottom={this.state.modalBottom}
            top={this.state.modalTop}
            text={this.state.modalText}
            closeModal={this.closeGenericModal}
            isDiscountModalOpen={this.state.isGenericModalOpen}
          ></DiscountModal>
        </HashRouter>
      </div>
    );
  }
}
export default App;
