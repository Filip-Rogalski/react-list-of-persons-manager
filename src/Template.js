import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import './index.css';

class Template extends Component {
    render(){
        return(
            <div>
                <div className="row">
                    <h1 className="mainTitle">Some simple projects made with React.js</h1>
                    <ul className="mainMenu">
                        <li><IndexLink to="/">Home </IndexLink></li>
                        <li><Link to="/PersonsListManager">Person List Manager</Link></li>
                        <li><Link to="/SimpleSlider">Simple Slider</Link></li>
                        <li><Link to="/BoxDragAndDropper">Box Drag and Dropper</Link></li>
                        <li><Link to="/ShoppingManager">Shopping Manager 1</Link></li>
                        <li><Link to="/ShoppingManager2">Shopping Manager 2</Link></li>
                        <li><Link to="/LangtonsAnt">Langtons Ant</Link></li>
                    </ul>
                </div>
                <div className="projectWrapper">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Template
