import React, { Component } from 'react';
import pictures from './PicImporter';

class SimpleSlider extends Component {
    constructor(){
        super();
        this.pictureForward = this.pictureForward.bind(this);
        this.pictureBackward = this.pictureBackward.bind(this);
        this.startSlideShow = this.startSlideShow.bind(this);
        this.stopSlideShow = this.stopSlideShow.bind(this);
        this.modeToggler = this.modeToggler.bind(this);
        this.state = {picIndex: 0, mode: 'manual'};
    }
    
    modeToggler(){
        this.state.mode === 'manual' ? this.setState({mode: 'auto'}, this.startSlideShow) : this.setState({mode: 'manual'}, this.stopSlideShow);
    }

    /* Handle manual mode */
    
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
    
    /* Handle automatic mode */
    
    pictureChange() {
        this.setState(prevState => ({ picIndex: (prevState.picIndex + 1) % Object.values(pictures).length }));
    }
    
    startSlideShow(){
        this.interval = setInterval(() => this.pictureChange(), 400);
    }
    
    stopSlideShow(){
        clearInterval(this.interval);
    }
    
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
                    <button onClick={this.modeToggler} className="modeTogglerBtn">{this.state.mode === 'manual' ? 'Slider automatyczny' : 'Slider manualny'}</button>
                </div>
                {this.state.mode === 'manual' ? (
                <div className="row">
                    <button onClick={this.pictureBackward} className="prevBtn">Previous</button>
                    <button onClick={this.pictureForward} className="nextBtn">Next</button>
                </div>
                    ) : null }
            </div>
        )
    }
}

export default SimpleSlider;