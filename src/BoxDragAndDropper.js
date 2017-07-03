import React, { Component } from 'react';
import './boxDragAndDropper.css' 

class BoxDragAndDropper extends Component {
    constructor(){
        super();
        this.liftBox = this.liftBox.bind(this);
        this.dropBox = this.dropBox.bind(this);
        this.moveBox = this.moveBox.bind(this);
        this.state = {containers: [{id: 0, boxes: ['box1', 'box2', 'box3', 'box4', 'box5']}, {id: 1, boxes: []}, {id: 2, boxes: []}, {id: 3, boxes: []}]};
    }
    
    liftBox(e){
        this.originContainer = e.target.parentElement.dataset.number;
        this.boxToMove = e.target.id;
    }
    
    dropBox(e) {
        if(e.target.className === 'container') {
            this.destinationContainer = e.target.dataset.number;
            if (this.originContainer !== this.destinationContainer) {
                this.moveBox(this.boxToMove, this.originContainer, this.destinationContainer);
            }
        }
    }
    
    moveBox(box, origin, destination){
        let index = this.state.containers[origin].boxes.indexOf(box),
            prevArray = this.state.containers;
        prevArray[origin].boxes.splice(index, 1);
        prevArray[destination].boxes.push(box);
        let newArray = prevArray;
        this.setState({containers: newArray});
    }
    
    render(){
        return(
            <div className="boxDragAndDropper">
                <h1>This is Box Drag and Dropper</h1>
                <div className="wrapper">
                    {this.state.containers.map(container => (
            <Container key={container.id} id={container.id} containerHandler={this.dropBox} boxHandler={this.liftBox} boxes={container.boxes}/>
        ))}                
                </div>
            </div>
        )
    }
}

class Container extends Component {
    
    render(){
        return(
            <div data-number={this.props.id} onMouseUp={this.props.containerHandler} className="container">
                {this.props.boxes.map(box => (
            <div key={box} id={box} onMouseDown={this.props.boxHandler} className="box"></div>
        ))}
            </div>
        )
    }
}

export default BoxDragAndDropper;