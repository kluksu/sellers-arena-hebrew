import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class BulkItemsRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: "",
      isSelected: "",
    };
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // if(this.props.selectedItems[this.props.item.id]!==prevProps.selectedItems[this.props.item.id]){
    //   this.setState({isSelected:this.props.selectedItems[this.props.item.id]})
    // }
    if (this.props.item.id !== prevProps.item.id) {
      this.setState({ isSelected: false });
      if (this.props.selectedItems[this.props.item.id]) {
        this.setState({
          isSelected: this.props.selectedItems[this.props.item.id],
        });
      }
    }
    // if (this.props.allSelected !== prevProps.allSelected) {
    //   this.setState({ isSelected: this.props.allSelected });
    // }
    if (this.state.isSelected !== prevState.isSelected) {
      this.props.createEditArr(this.state.isSelected, this.props.item.id);
    }
  }
  componentDidMount() {
    // this.setState({ isSelected: this.props.isSelected });
    if (this.props.selectedItems[this.props.item.id]) {
      this.setState({
        isSelected: this.props.selectedItems[this.props.item.id],
      });
    }
    let visibility = this.props.item.visibility;
    console.log(visibility.item, visibility.price);
    if (visibility.price === 1 && visibility.item === 1) {
      this.setState({ visibility: "כולם" });
    } else if (visibility.price == 5 && visibility.item == 1) {
      this.setState({ visibility: "רק משתמשים רשומים" });
    } else if (visibility.price == 3 && visibility.item == 1) {
      this.setState({ visibility: "אנשי הקשר שלי בלבד" });
    } else if (visibility.price == 4 && visibility.item == 1) {
      this.setState({ visibility: "רק אני" });
    }
    // this.setState({ isSelected: this.props.allSelected });
  }
  render() {
    return (
      <tr>
        <td>{this.props.item.id}</td>
        <td>{<img src={this.props.item.image}></img>}</td>
        <td>{this.props.item.name}</td>
        <td>{this.props.item.currency}</td>
        <td>{this.state.visibility}</td>
        <td>{this.props.item.category}</td>
        <td>{this.props.item.subcategory}</td>

        <td>
          <input
            onChange={(e) => this.handleInputChange(e)}
            name="isSelected"
            checked={this.state.isSelected}
            type="checkbox"
          ></input>
        </td>

        {/* <td>{this.props.item.description}</td> */}
      </tr>
    );
  }
}
{
  /* <th>קוד מוצר</th>


<th>תמונה</th>
<th>שם</th>

<th> מטבע</th>
<th> נראות</th>
<th> קטגוריה</th>
<th> תת קטגוריה </th> */
}
