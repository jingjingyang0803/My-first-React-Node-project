import React, { Component } from "react"; 
import "./Footer.css"; 

export default class Footer extends Component {

  onBatchChange = (event) => {
    this.props.onBatchChange(event.target.checked);
  };

  onClearAllDone = () => {
    this.props.onClearAllDone();
  };

  render() {
    const { items } = this.props;
    const total_count = items.length;
    const done_count = items.reduce((prev, current) => {
      return current.done ? prev + 1 : prev;
    }, 0);
    
    return (
      <div className="footer">
        <input
          type="checkbox"
          onChange={this.onBatchChange}
          checked={
            total_count === done_count && total_count > 0 ? "checked" : ""
          }
        /> 
        <span className="count">
        &nbsp;&nbsp;&nbsp;{done_count}&nbsp;/&nbsp;{total_count}
        </span>
        <button className="btn" onClick={this.onClearAllDone}>
          Clear completed tasks
        </button>
      </div>
    );
  }
}
