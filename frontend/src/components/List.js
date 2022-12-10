import React, { Component } from "react";
import Item from "./Item";
import "./List.css";

export default class List extends Component {
  onUpdateItem = (id) => {
    this.props.onUpdateItem(id);
  };

  onDeleteItem = (id) => {
    this.props.onDeleteItem(id);
  };

  render() {
    const { items } = this.props;
    return (
      <div className="list">
        <ul>
          {items.map((item) => {
            return (
              <Item
                key={item.id}
                {...item}
                onUpdateItem={this.onUpdateItem}
                onDeleteItem={this.onDeleteItem}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
