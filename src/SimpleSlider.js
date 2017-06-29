import React, { Component } from 'react';
import pictures from './PicImporter';

class SimpleSlider extends Component {
    constructor(){
        super();
        this.pictureForward = this.pictureForward.bind(this);
        this.pictureBackward = this.pictureBackward.bind(this);
        this.state = {picIndex: 0};
    }
    
    pictureForward(){
        let prevIndex = this.state.picIndex,
            newIndex = (prevIndex + 1) % Object.values(pictures).length;
        this.setState({picIndex: newIndex});
    }
    
    pictureBackward(){
        let prevIndex = this.state.picIndex,
            newIndex = (prevIndex + Object.values(pictures).length - 1) % Object.values(pictures).length;
        this.setState({picIndex: newIndex});
    }
    
    /* Dodać wybór opcji: 1. slider manual; 2. slider automatyczny (setInterval..., dezaktywacja prevBtn, nextBtn)*/
    
    
    render(){
        return(
            <div>
                <div className="row">
                    <h1>Simple slider</h1>
                </div>
                <div className="row">
                    <div className="pictureContainer">
                        <img src={Object.values(pictures)[this.state.picIndex]} alt='pic' />
                    </div>
                </div>
                <div className="row">
                    <button onClick={this.pictureBackward} className="prevBtn">Previous</button>
                    <button onClick={this.pictureForward} className="nextBtn">Next</button>
                </div>
            </div>
        )
    }
}

export default SimpleSlider;