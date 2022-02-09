import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Squre from "../components/Squre";
import { isInViewport } from "../components/utils";

export default class Features extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInViewport1: false,
      show1: false,
      isRegisterInView: false,
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.isInViewport1 !== prevState.isInViewport1 &&
      this.state.isInViewport1 === false
    ) {
      this.setState({
        show1: true,
      });
    }
  }
  handleScroll = (event) => {
    this.setState({ isInViewport1: isInViewport("viewPort1") });
    this.setState({ isRegisterInView: isInViewport("RegisterButton") });

    //   this.setState({})
    //
    //   window.innerHeight,
    //   window.pageYOffset,
    //   document.body.offsetHeight,
    //   window.scrollY
    // );
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      //   alert("you're at the bottom of the page")
      this.setState({
        show1: true,
      });
    }
  };
  render() {
    let forSuppliersText = (
      <ul>
        <li> מערכת הזמנות הנגישה ללקוחות ולסוכנים</li>
        <li>אפשרות לקבל הזמנות מסביב לשעון </li>
        <li> קטלוג מוצרים קל לעדכון</li>
        <li> ניהול מלאי</li>
        <li>מערכת הודעות מול לקוחות</li>
        <li>
          {" "}
          מערכת עדכונים ללקוחות אשר מעדכנת כאשר
          <ul>
            <li>עולים מוצרים חדשים</li>
            <li>מוצר חוזר למלאי</li>
            <li> מלאי מוצר נמוך </li>
            <li> נוספת הנחה למוצר </li>
            <li>מחיר מוצר ירד</li>
          </ul>
        </li>
        <li>הופעה בתוצאות חיפוש של מוצרים וספקים</li>
        <li>צמצום התלות בסוכני מכירות </li>
        <li>צמצום התלות באנשי שיווק </li>
        <li>אפשרות לחיסכון עצום בזמן וכסף </li>

        {/* <li></li> */}
      </ul>
    );
    let forStoreOwnersText = (
      <ul>
        <li>צפיה בקטלוגים של מגוון ספקים </li>
        <li>גישה למערכת הזמנות של הספקים</li>
        <li>אפשרות לעשות הזמנות בכל זמן מכל מקום </li>
        <li>מערכת הודעות מול הספקים</li>
        <li>
          {" "}
          מערכת עדכונים אשר מעדכנת כאשר
          <ul>
            <li>עולים מוצרים חדשים</li>
            <li>מוצר חוזר למלאי</li>
            <li> מלאי מוצר נמוך </li>
            <li> נוספת הנחה למוצר </li>
            <li>מחיר מוצר ירד</li>
          </ul>
        </li>
        <li>חיפוש למציאת מוצרים וספקים</li>
        <li>חיסכון בזמן ואנרגיה בתהליך מציאת ספקים</li>
        <li id="viewPort1">חיסכון בזמן עבודה</li>
      </ul>
    );
    return (
      <div className="featuresPageContainer">
        <div className={"featuresPageLower"}>
          <Row>
            <h1 className={" animate__animated animate__fadeInRight "}>
              מה אנחנו מציעים?
            </h1>
          </Row>
          <Row>
            {/* <img
              className={" animate__animated animate__fadeInRight "}
              src="https://cdn.pixabay.com/photo/2016/03/31/19/50/checklist-1295319_960_720.png"
            ></img> */}
            <Squre
              className={
                " animate__animated animate__fadeInUp animate__delay-1s "
              }
              //   background="lightYellow"
              width=""
              height=""
              headLine="לספקים"
              text={forSuppliersText}
            ></Squre>
            <Squre
              className={
                " animate__animated animate__fadeInDown animate__delay-2s"
              }
              //   background="lightPink"
              //   width="320px"
              //   height="320px"
              headLine="לבעלי חנויות"
              text={forStoreOwnersText}
            ></Squre>
          </Row>
        </div>
        <div className="featuresPageUpper">
          {/* <img
            className=" animate__animated animate__backInUp"
            src="https://cdn.pixabay.com/photo/2017/06/25/22/00/rocket-2442125_960_720.png"
          ></img> */}
          <Row>
            <Squre
              className={
                this.state.show1 === false
                  ? "hidden"
                  : " animate__animated animate__fadeInUp animate__slower"
              }
              //   background="lightYellow"
              width=""
              height=""
              headLine=""
              text='"There are two types of people who will tell you that you cannot  make a difference in this world: those who are afraid to try and those who are afraid you will succeed"'
              background="rgb(255 99 38)"
              //   color="white"
            ></Squre>
          </Row>
          <Row>
            <Squre
              className={
                this.state.show1 === false
                  ? "hidden"
                  : " animate__animated animate__fadeInDown   animate__slower"
              }
              //   background="lightYellow"
              width=""
              height=""
              headLine="אנחנו כאן בכדי לשנות"
              text="המוצר שפיתחנו כאן כדי לשנות את דרכי העבודה הישנות הנהוגות בעולם הסיטונאות, המערכת  באה לתת מענה לצרכים של בעלי העסקים הקימונאים מצד אחד ומהצד השני ליעל את תהליכי ההזמנה והשיווק של הספקים, ככה שיווצר מצב של win-win"
              background="white"
              color="black"
            ></Squre>{" "}
          </Row>
        </div>
        <Button
          onClick={() => window.location.assign("/#/register")}
          id="RegisterButton"
          className={
            this.state.isRegisterInView === false
              ? "w-100 m-auto"
              : "w-100 m-auto animate__animated animate__bounce  animate__repeat-3"
          }
        >
          הירשמו חינם עכשיו!
        </Button>
      </div>
    );
  }
}
