import React, { Component } from 'react';
import './shoppingManager.css' 

class ShoppingManager extends Component {
    constructor(){
        super();
        this.liftBox = this.liftBox.bind(this);
        this.dropBox = this.dropBox.bind(this);
        this.moveBox = this.moveBox.bind(this);
        this.deleteBox = this.deleteBox.bind(this);
        this.toggleDeleteBox = this.toggleDeleteBox.bind(this);
        this.addShoppingDestination = this.addShoppingDestination.bind(this);
        this.boxes = ['box1', 'box2', 'box3', 'box4', 'box5'];
        this.state = {containers: [{id: 0, name: 'Shopping Items', boxes: []}]};
        this.originContainer = '';
        this.destinationContainer = '';
        this.boxToMove = '';
        
    }
        
    componentWillMount(){
        
        //Wcześniej boxes wkładałem do containers w ramach this.state. Zmieniłem na wypadek, gdybym ilość boxes wprowadzał w jakimś wcześniejszym komponencie.
        
        let array = this.state.containers;
        array[0].boxes = this.boxes;
        this.setState({containers: array});
    }
    
    liftBox(e){
        this.originContainer = e.target.parentElement.dataset.number;
        this.boxToMove = e.target.id;
    }
    
    dropBox(e) {
        if(e.target.className === 'container' && this.originContainer !== '') {
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
        this.originContainer = '';
        this.destinationContainer = '';
        this.boxToMove = '';
    }
    
    toggleDeleteBox(e){
    }
    
    deleteBox(e){
        let containerIndex = e.target.parentElement.parentElement.dataset.number,
            box = e.target.parentElement.id,
            index = this.state.containers[containerIndex].boxes.indexOf(box),
            prevArray = this.state.containers;
        prevArray[containerIndex].boxes.splice(index, 1);
        let newArray = prevArray;
        this.setState({containers: newArray});
    }
    
    addShoppingDestination(e){
        e.preventDefault();
        let prevArray = this.state.containers,
            newContainerId = this.state.containers.length,
            newContainerName = e.target.parentElement.firstChild.value,
            newContainer = {id: newContainerId, name: newContainerName, boxes: []};
        prevArray.push(newContainer);
        let newArray = prevArray;
        this.setState({containers: newArray}, e.target.parentElement.firstElementChild.value = '');
            
    }
    
    render(){
        return(
            <div className="shoppingManager">
                <h1>Prepare your shopping</h1>
            <AddShoppingDestination addShoppingDestinationhandler={this.addShoppingDestination}/>
                <div className="wrapper">
                    {this.state.containers.map(container => (
            <Container name={container.name} key={container.id} id={container.id} containerHandler={this.dropBox} boxHandler={this.liftBox} boxHoverHandler={this.toggleDeleteBox} boxDeleteHandler={this.deleteBox} boxes={container.boxes}/>
        ))}                
                </div>
                
            </div>
        )
    }
}

class Container extends Component {
    
    render(){
        return(
            <div data-number={this.props.id} onMouseUp={this.props.containerHandler} className="container"><div className="containerLabel">{this.props.name}</div>
                {this.props.boxes.map(box => (
            <div key={box} id={box} onMouseDown={this.props.boxHandler} onMouseEnter={this.props.boxHoverHandler} onMouseLeave={this.props.boxHoverHandler}
            className="box"><div onClick={this.props.boxDeleteHandler} className="deleteCross"></div></div>
        ))}
            </div>
        )
    }
}

class AddShoppingDestination extends Component {
    render(){
        return(
            <div className="wrapper">
                <form>
                    <input type="text" placeholder="Add shopping place"></input>
                    <input type="submit" onClick={this.props.addShoppingDestinationhandler}></input>
                </form>
            </div>
        )
    }
}


export default ShoppingManager;