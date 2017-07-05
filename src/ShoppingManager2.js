import React, { Component } from 'react';
import './shoppingManager2.css' 

class ShoppingManager2 extends Component {
    constructor(){
        super();
        this.deleteBox = this.deleteBox.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.addProductToShoppingPlace = this.addProductToShoppingPlace.bind(this);
        this.addProductToNewShoppingPlace = this.addProductToNewShoppingPlace.bind(this);
        this.addNewProduct = this.addNewProduct.bind(this);
        
        this.liftBox = this.liftBox.bind(this);
        this.dropBox = this.dropBox.bind(this);
        this.moveBox = this.moveBox.bind(this);
        
        this.state = {productsInventoryArray: ['Chleb', 'Ziemniaki', 'Woda', 'Chipsy', 'Piwo'] , shoppingPlaces: [{id: 0, name: 'Targ', products: []}, {id: 1, name: 'Piekarnia', products: []}, {id: 2, name: 'Kwiaciarnia', products: []}, {id: 3, name: 'Pasikonik', products: []}]};
        this.originContainer = '';
        this.destinationContainer = '';
        this.boxToAdd = '';
        this.boxToMove = '';
    }
    
    addProduct(e){
        this.boxToAdd = e.target;
    }
    
    addProductToShoppingPlace(e){
        if(this.boxToAdd.id !== '') {
            let index = e.target.dataset.id,
                prevArray = this.state.shoppingPlaces;
            if (prevArray[index].products.indexOf(this.boxToAdd.id) === -1) {
                let newProductId = prevArray[index].products.length;
                prevArray[index].products.push({id: newProductId, name: this.boxToAdd.id});
                let newArray = prevArray;
                this.setState({shoppingPlaces: newArray}, console.log('ok'));
            } else {
                console.log('product already added to this shopping place');
            }
        }
    }
    
    addProductToNewShoppingPlace(e){
        let input = e.target.parentElement.firstChild,
            newShoppingPlaceIndex = this.state.shoppingPlaces.length,
            newShoppingPlaceName = input.value;
        let prevShoppingPlaces = this.state.shoppingPlaces;
        prevShoppingPlaces.push({id: newShoppingPlaceIndex, name: newShoppingPlaceName, products: []});
        if (this.boxToAdd.id !== '') {
            prevShoppingPlaces[prevShoppingPlaces.length-1].products.push({id: 0, name: this.boxToAdd.id});
        }
        let newShoppingPlaces = prevShoppingPlaces;
        this.setState({shoppingPlaces: newShoppingPlaces}, input.value = '', console.log('ok'));
    }
    
    addNewProduct(e){
        var input = e.target.parentElement.firstElementChild,
            newProduct = input.value,
            prevProducts = this.state.productsInventoryArray;
        if (prevProducts.indexOf(newProduct) === -1) {
            prevProducts.push(newProduct);
            let newProducts = prevProducts;
            this.setState({productInventoryArray: newProducts}, input.value = '');
            this.boxToAdd.id = newProduct;
        } else {
            console.log('product already in the product inventory');
        }
    }
    
    liftBox(e){
        this.originContainer = e.target.parentElement.dataset.number;
        this.boxToMove = e.target.dataset.name;
    }
    
    dropBox(e) {
        console.log('dropbox');
        console.log(e.target.className);
        if(e.target.className === 'container shoppingContainer' && this.originContainer !== '') {
            this.destinationContainer = e.target.dataset.number;
            if (this.originContainer !== this.destinationContainer) {
                this.moveBox(this.boxToMove, this.originContainer, this.destinationContainer);
            }
        }
    }
    
    moveBox(box, origin, destination){
        let index = this.state.shoppingPlaces[origin].products.indexOf(box),
            prevArray = this.state.shoppingPlaces;
        prevArray[origin].products.splice(index, 1);
        let newIndex = prevArray[destination].products.length;
        prevArray[destination].products.push({id: newIndex, name: box});
        let newArray = prevArray;
        this.setState({shoppingPlaces: newArray});
        this.originContainer = '';
        this.destinationContainer = '';
        this.boxToMove = '';
    }
    
    deleteBox(e){
        let shoppingPlaceIndex = parseInt(e.target.parentElement.parentElement.dataset.number, 10),
            productIndex = e.target.parentElement.id,
            prevArray = this.state.shoppingPlaces[shoppingPlaceIndex].products;
        prevArray.splice(productIndex, 1);
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
            <div className="shoppingManager2">
                <h1>Prepare your shopping 2</h1>
            <div className="controlPanel">
            <div className="shoppingInventory">
                {this.state.productsInventoryArray.map(box => (
                    <div key={box} id={box} data-name={box} onClick={this.addProduct} className="box"></div>
                ))}
                    <div id="newProduct" className="box"><input type="text" placeholder="Add new product"></input><button onClick={this.addNewProduct}>Add</button></div>
            </div>
            <ShoppingPlacePicker pickerHandler={this.addProductToShoppingPlace} newShopPickerHandler={this.addProductToNewShoppingPlace} shoppingPlaces={this.state.shoppingPlaces}/>
</div>
                <div className="wrapper">
                    {this.state.shoppingPlaces.map(shoppingPlace => (
            <Container name={shoppingPlace.name} key={shoppingPlace.id} id={shoppingPlace.id} containerHandler={this.dropBox} boxHandler={this.liftBox} boxHoverHandler={this.toggleDeleteBox} boxDeleteHandler={this.deleteBox} boxes={shoppingPlace.products}/>
        ))}                
                </div>
                
                <div className="wrapper">
                    <SummaryPanel shoppingPlaces={this.state.shoppingPlaces}/>
                </div>


            </div>
        )
    }
}

class SummaryPanel extends Component {
    render(){
        return(
            <div className="summaryPanel">
                <div>Summary panel</div>
                <table>
                    <tbody>
                        {this.props.shoppingPlaces.map(item => (
                            item.products.length > 0 && 
                            <tr key={item.id}><td>{item.name}</td><td>{item.products.map(product => (
                                <span key={product.id}>{product.name} </span>
                            ))}</td></tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

class ShoppingPlacePicker extends Component {
    render(){
        return(
            <div className="shoppingPlacePicker">
                <ul>
                    {this.props.shoppingPlaces.map(shop => (
                        <li key={shop.id} data-id={shop.id} data-name={shop.name} className="shoppingPlace" onClick={this.props.pickerHandler}>{shop.name}</li>
                    ))}
                    <li className="shoppingPlace"><input type="text" id="addNewShoppingPlace" placeholder="Add new shopping place"></input><button onClick={this.props.newShopPickerHandler}>Add</button></li>
                </ul>
            </div>
        )
    }
}


class Container extends Component {
    render(){
        return(
            <div>
                {this.props.boxes.length > 0 && 
                    <div data-number={this.props.id} onMouseUp={this.props.containerHandler} className="container shoppingContainer"><div className="containerLabel">{this.props.name}</div>
                    {this.props.boxes.map(box => (
                        <div key={box.id} id={box.id} data-name={box.name} onMouseDown={this.props.boxHandler} onMouseEnter={this.props.boxHoverHandler} onMouseLeave={this.props.boxHoverHandler} className="box"><div onClick={this.props.boxDeleteHandler} className="deleteCross"></div></div>
                    ))}
                </div>}
            </div>
        )
    }
}

export default ShoppingManager2;