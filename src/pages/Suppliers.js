import axios from "axios";
import React, { Component } from "react";
import {
  categoriesAndSubCategories,
  categoriesList,
  domain,
} from "../components/utils";
import { Link } from "react-router-dom";

export default class Suppliers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allAccounts: [],
    };
  }
  componentDidMount() {
    const authorization = !this.props.accessToken
      ? null
      : `Bearer ${this.props.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    axios.get(`${domain}/public-accounts/`).then((data) => {
      console.log(data.data.results);
      this.setState({ allAccounts: data.data.results });
    });
  }
  render() {
    let showCategories = [];
    //  let showSubCategories=[]
    console.log(categoriesAndSubCategories);
    categoriesAndSubCategories.forEach((category) => {
      let showAccounts = [];
      console.log(category);
      this.state.allAccounts.forEach((account) => {
        console.log(Object.keys(category)[0]);
        console.log(account.category);

        if (
          account.category === Object.keys(category)[0] &&
          account.account_type == 3
        ) {
          showAccounts.push(
            <li className="suppliersPageAccount">
              <Link to={`/StorePage/${account.id}`}>{account.name}</Link>
            </li>
          );
        }
      });
      showCategories.push(
        <li className="suppliersPageCategory">
          <ul>
            <li>{Object.keys(category)[0]}</li>
          </ul>
          <ul>{showAccounts}</ul>
        </li>
      );

      //  console.log(Object.keys(category)[0])
      //  console.log(this.state.category)

      //  if((Object.keys(category)[0]===this.state.category)){
      //    Object.values(category).forEach(categoryObj => {
      //      categoryObj.forEach(subcategory => {

      //    showSubCategories.push(<option value={subcategory}>{subcategory}</option>)
      //  });}); }
    });

    return <ul className="suppliersPage">{showCategories}</ul>;
  }
}
