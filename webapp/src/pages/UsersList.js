import React, { Component } from 'react'

import { Button, DatePicker } from "antd";

export default class UsersList extends Component {
    render() {
        return (
            <div className="App">
                <DatePicker />
                <Button type="primary" style={{ marginLeft: 8 }}>
                    Primary Button
    </Button>
            </div>
        )
    }
}
