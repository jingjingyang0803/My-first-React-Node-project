import React, { Component } from "react";
import "./Header.css";

export default class Header extends Component {

    onKeyUp = async (event) => {
        const { keyCode, target } = event;

        if (keyCode !== 13) return;

        const input_string = target.value.trim();
        if ("" === input_string) {
            alert("Blank Input String is not required.");
            target.value = "";
            return;
        }

        this.props.onInsertItem(input_string);
        target.value = "";
    };

    render() {
        return (
            <div className="header">
                <h3>Todo List</h3>
                <div className="input-group">
                    <input
                        className="input_string"
                        type="text"
                        placeholder="Please input task name, confirm by Enter"
                        onKeyUp={this.onKeyUp}
                    />
                </div>
            </div>
        );
    }
}
