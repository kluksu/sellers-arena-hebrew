import React, { Component } from 'react'

export default class Category extends Component {
    goToCategorie
    render() {
        return (
            <div className="categoryContainer">
                <div>{this.props.category}</div>
            </div>
        )
    }
}
