import React, { Component } from "react";
import "./Item.css";

export default class Item extends Component {
  state = { mouse: false };

  onMouse = (flag) => {
    return () => {
      this.setState({ mouse: flag });
    };
  };

  onClickboxChange = (id) => {
    return (event) => {
      this.props.onUpdateItem(id, event.target.checked);
    };
  };

  onDeleteItem = (id) => {
    return () => {
      this.props.onDeleteItem(id);
    };
  };

  render() {
    const { id, name, done } = this.props;
    const { mouse } = this.state;
    return (
      <li
        className="item"
        style={{ backgroundColor: mouse ? "#ddd" : "white" }}
        onMouseEnter={this.onMouse(true)}
        onMouseLeave={this.onMouse(false)}
      >
        <input
          type="checkbox"
          checked={done}
          onChange={this.onClickboxChange(id)}
        />
        <span className="id">{id}</span>
        <span className="name">{name}</span>
        <button
          className="btn"
          onClick={this.onDeleteItem(id)}
          style={{ display: mouse ? "block" : "none" }}
        >
          Remove
        </button>
      </li>
    );
  }
}
