import React, { Component } from "react";
import { Button, ListGroup, Row, Table } from "react-bootstrap";
import { FcCancel, FcCheckmark } from "react-icons/fc";
import PriceTable from "../components/PriceTable";
import { mokeUp, shake } from "../components/utils";

export default class RealPricing extends Component {
  render() {
    if (this.props.pageType === "boxes") {
      let boxesArr = [];
      let allFeaturesArr = [];
      mokeUp.forEach((plan) => {
        let price = Object.values(plan)[1];

        let headline = Object.keys(plan)[0];
        let valueFeatures = Object.entries(plan)[0][1].valueFeatures;
        let features = Object.entries(plan)[0][1].features;
        if (
          Object.entries(plan)[0][1].features.length > allFeaturesArr.length
        ) {
          allFeaturesArr = Object.entries(plan)[0][1].features;
        }
        boxesArr.push(
          <PriceTable
            priceBoxButtons={this.props.priceBoxButtons}
            pricePagePrice={this.props.pricePagePrice}
            priceBox={this.props.priceBox}
            priceBoxHeadline={this.props.priceBoxHeadline}
            selectedElement={this.props.selectedElement}
            selectElement={this.props.selectElement}
            // pricingBoxesPrice={this.props.pricingBoxesPrice}
            // pricingBoxesBackground={this.props.pricingBoxesBackground}
            getPlaneTypeAndGoToForm={this.props.getPlaneTypeAndGoToForm}
            headline={headline}
            valueFeatures={valueFeatures}
            features={allFeaturesArr}
            supportedFeatures={features}
            price={`${price}`}
            color="blue"
          ></PriceTable>
        );
      });
      return (
        <div
          className=" pricingPage changableBackground"
          onClick={(e) => this.props.selectElement(e, "pricePageBackground")}
          style={this.props.pricePageBackground}
        >
          <h1
            className={`changable ${
              this.props.selectedElement === "pricePageHeadline" ? shake : ""
            }`}
            onClick={(e) => this.props.selectElement(e, "pricePageHeadline")}
            style={this.props.pricePageHeadline}
          >
            מחירון
          </h1>
          <div className="priceTablesGallery">
            <Row>{boxesArr}</Row>
          </div>{" "}
        </div>
      );
    } else if (this.props.pageType === "table") {
      let showPLansNames = [];
      let buttonsArr = [];
      let showPLansPrices = [];
      let longestFeatures = 0;
      let allFeatures = [];
      let rowsInfo = [];
      let allrowsInfo = [];
      let plansNames = mokeUp.map((plan) => {
        return Object.keys(plan)[0];
      }); ///[free,basic,primium]
      let plansPrices = mokeUp.map((plan) => {
        return Object.values(plan)[1];
      }); ///[free,basic,primium]
      mokeUp.forEach((plan) => {
        if (Object.values(plan)[0].features.length > longestFeatures) {
          longestFeatures = Object.values(plan)[0].features.length;
          //
          //
          allFeatures = Object.values(plan)[0].features;
        }
      });
      let innerWidthFonts = this.props.windowWidth < 440 ? "12px" : "20px";
      plansNames.forEach((plan) => {
        showPLansNames.push(
          <th
            style={{
              fontSize: this.props.windowWidth < 670 ? innerWidthFonts : "40px",
            }}
          >
            {plan}
          </th>
        );
        buttonsArr.push(
          <td>
            <Button
              type="button"
              className={`changable ${
                this.props.selectedElement === "priceBoxButtons" ? shake : ""
              }`}
              // onClick={(e) => {
              //   this.props.selectElement(e, "priceBoxButtons");
              // }}
              onClick={(e) => {
                this.props.getPlaneTypeAndGoToForm(plan);
              }}
              style={this.props.priceBoxButtons}
            >
              הצטרף
            </Button>
          </td>
        );
      });
      plansPrices.forEach((price) => {
        showPLansPrices.push(
          <th
            style={{
              fontSize: this.props.windowWidth < 670 ? innerWidthFonts : "24px",
            }}
          >
            {price}
          </th>
        );
      });

      allFeatures.forEach((feature) => {
        rowsInfo = [];

        mokeUp.forEach((plan) => {
          if (Object.values(plan)[0].features.includes(feature)) {
            rowsInfo.push(
              <td>
                <FcCheckmark></FcCheckmark>
              </td>
            );
          } else {
            rowsInfo.push(
              <td>
                <FcCancel></FcCancel>
              </td>
            );
          }
        });
        allrowsInfo.push(
          <tr>
            <td style={{ fontSize: innerWidthFonts }}>{feature}</td>
            {rowsInfo}
          </tr>
        );
      });
      let valueFeatures = Object.keys(
        Object.entries(mokeUp[0])[0][1].valueFeatures
      );
      let valueFeatureRow = [];
      valueFeatures.forEach((feature) => {
        valueFeatureRow = [];
        mokeUp.forEach((plan) => {
          valueFeatureRow.push(
            <td style={{ fontSize: innerWidthFonts }}>
              {Object.entries(plan)[0][1].valueFeatures[feature]}
            </td>
          );
        });

        allrowsInfo.push(
          <tr>
            <td style={{ fontSize: innerWidthFonts }}>{feature}</td>
            {valueFeatureRow}
          </tr>
        );
      });

      return (
        <Table className="pricingTable">
          <thead>
            <tr>
              <th></th>
              {showPLansNames}
            </tr>
            <tr>
              {" "}
              <th></th>
              {showPLansPrices}
            </tr>
          </thead>
          <tbody>
            {allrowsInfo}

            <tr>
              <td></td>
              {buttonsArr}
            </tr>
          </tbody>
        </Table>
      );
    }
  }
}
