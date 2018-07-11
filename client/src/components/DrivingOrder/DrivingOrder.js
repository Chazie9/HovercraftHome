import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import './DrivingOrder.css';

class DrivingOrder extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div className="driving-order-container">
                {this.props.driverList.map((driver, i) => {
                    return <ul className="userAndImg" key={i}>Position: {i} <br />{driver.username}</ul>
                })}
            </div>
        )
    }
}

export default DrivingOrder;