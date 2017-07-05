import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Menu from './Menu';
import SimpleSlider from './SimpleSlider';
import PersonsListManager from './PersonsListManager';
import BoxDragAndDropper from './BoxDragAndDropper';
import ShoppingManager from './ShoppingManager';
import ShoppingManager2 from './ShoppingManager2';

class App extends Component {
    constructor(){
        super();
        this.state = {visibleProjectIndex: 4};
        this.projectToggler = this.projectToggler.bind(this);
    }
    
    projectToggler(e){
        this.setState({visibleProjectIndex: parseInt(e.target.dataset.index, 10)});
    }
    
    render(){
        return (
            <div>
                <Menu handler={this.projectToggler}/>
            {this.state.visibleProjectIndex === 0 && <PersonsListManager />}
            {this.state.visibleProjectIndex === 1 && <SimpleSlider />}{this.state.visibleProjectIndex === 2 && <BoxDragAndDropper />}
            {this.state.visibleProjectIndex === 3 && <ShoppingManager />}
            {this.state.visibleProjectIndex === 4 && <ShoppingManager2 />}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));