import React, { Component } from 'react';
import './index.css';

class Menu extends Component {
    render(){
        return(
            <div className="row">
                <h1>Chose project:</h1>
                <ol>
                    <li data-index='0' onClick={this.props.handler}>PersonsListManager</li>
                    <li data-index='1' onClick={this.props.handler}>Simple Slider</li>
                    <li data-index='2' onClick={this.props.handler}>Box Drag and Dropper</li>
                    <li data-index='3' onClick={this.props.handler}>Shopping Manager 1</li>
            <li data-index='4' onClick={this.props.handler}>Shopping Manager 2</li>
                </ol>
            </div>
        )
    }
}

export default Menu