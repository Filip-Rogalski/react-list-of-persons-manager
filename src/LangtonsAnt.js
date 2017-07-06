import React, { Component } from 'react';
import './langtonsAnt.css' 

class LangtonsAnt extends Component {
    constructor(){
        super();
        this.changeCellState = this.changeCellState.bind(this);
        this.moveAnt = this.moveAnt.bind(this);
        this.move = this.move.bind(this);
        this.getAntsCoords = this.getAntsCoords.bind(this);
        this.getBaseCell = this.getBaseCell.bind(this);
        this.initializeCells = this.initializeCells.bind(this);
        this.startMoving = this.startMoving.bind(this);
        this.stopMoving = this.stopMoving.bind(this);
        this.state = {cellSize: '10px', cellsPerSide: 10, cells: [], antDirection: 0, positionLeft: 100, positionTop: 100};
        this.step = 20;
    }
    
    startMoving() {
        this.interval = setInterval(() => this.moveAnt(), 400);
    }

    stopMoving() {
        clearInterval(this.interval);
    }
    
    moveAnt(){
        let coords = this.getAntsCoords(this.state.positionLeft, this.state.positionTop);
        let baseCellIndex = this.getBaseCell(coords[0], coords[1]);
        if (baseCellIndex >= 0) {
            let baseCellAlive = this.state.cells[baseCellIndex].alive;
            this.move(this.state.antDirection, baseCellIndex, baseCellAlive);
        } else {
            this.stopMoving();
        }
    }
    
    getBaseCell(coordLeft, coordTop){
        return coordTop * this.state.cellsPerSide + coordLeft;
    }
    
    getAntsCoords(positionLeft, positionTop){
        let coordLeft = (positionLeft / 20),
            coordTop = (positionTop / 20);
        return [coordLeft, coordTop];
    }
    
    move(direction, baseCellIndex, baseCellState){
        this.setState((prevState) => ({
                antDirection: (prevState.antDirection + 4 + baseCellState) % 4
            }));
        if (direction % 2 === 0) {
            this.setState((prevState) => ({
                positionLeft: prevState.positionLeft + Math.pow((-1), direction / 2) * baseCellState * this.step
            }));
        } else {
            this.setState((prevState) => ({
                positionTop: prevState.positionTop + Math.pow((-1), Math.floor(direction / 2)) * baseCellState * this.step
            }));  
        }
        
        let prevCells = this.state.cells;
        prevCells[baseCellIndex].alive *= -1;
        if (prevCells[baseCellIndex].alive === -1) {
            prevCells[baseCellIndex].color = 'pink';    
        } else {
            prevCells[baseCellIndex].color = 'blue';
        }
        let newCells = prevCells;
        this.setState((prevState) => ({
            cells: newCells
        }))
    }
    
    componentWillMount(){
        this.initializeCells();
    }
    
    initializeCells(){
        var cellsArray = [];
        for (var i = 0; i < this.state.cellsPerSide * this.state.cellsPerSide; i++) {
            cellsArray.push({id: i, alive: -1, color: 'pink'});
        }
        this.setState({cells: cellsArray});
    }
    
    changeCellState(e){
        var prevCellsArray = this.state.cells;
        var cellId = e.target.id;
        prevCellsArray[cellId].alive *= -1;
        if (prevCellsArray[cellId].alive === -1) {
            prevCellsArray[cellId].color = 'pink';    
        } else {
            prevCellsArray[cellId].color = 'blue';
        }
        var newCellsArray = prevCellsArray;
        this.setState({cells: newCellsArray});
    }
    
    render(){
        return(
            <div>
                <div className="row1">
                    <h1>Langton's Ant</h1>
                </div>
                <div className="row1">
                    <div className="settingsPanel">
                        <input type="number" id="cellSize" placeholder="Cell size"></input>
                        <input type="number" id="cellsPerSide" placeholder="Board size (cells per side)"></input>
                    </div>
                </div>
                    <AntsBoard cells={this.state.cells} cellHandler={this.changeCellState} positionLeft={this.state.positionLeft} positionTop={this.state.positionTop} />
                <div className="row1">
                    <div className="controlPanel">
                        <button id="startBtn" onClick={this.startMoving}>Start</button>
                        <button id="stopBtn" onClick={this.stopMoving}>Stop</button>
                        <button id="moveBtn" onClick={this.moveAnt}>MoveAnt</button>
                    </div>
                </div>
            </div>
        )
    }
}

class AntsBoard extends Component {
    render(){
        return(
            <div className="row1">
                <div className="antsBoard">
            {this.props.cells.map(cell => (
                        <Cell key={cell.id} id={cell.id} handler={this.props.cellHandler} alive={cell.alive} color={cell.color}/>
                    ))}
                    <Ant positionLeft={this.props.positionLeft} positionTop={this.props.positionTop} />
                </div>
            </div>
        )
    }
}

class Ant extends Component {
    render(){
        return(
            <div className="ant" style={{'left': this.props.positionLeft, 'top': this.props.positionTop}}></div>
        )
    }
}

class Cell extends Component {
    
    componentWillMount(){
        if (this.props.alive === -1) {
            this.setState({color: 'pink'});
        } else {
            this.setState({color: 'blue'});
        }
    }

    render(){
        return(
            <div className="antsCell" id={this.props.id} data-alive={this.props.alive} onClick={this.props.handler} style={{'backgroundColor': this.props.color}}></div>
        )
    }
}


export default LangtonsAnt