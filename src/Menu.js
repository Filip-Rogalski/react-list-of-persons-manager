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
                </ol>
            </div>
        )
    }
}

export default Menu