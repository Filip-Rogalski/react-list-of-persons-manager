import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class PersonsListManager extends Component {
    constructor() {
        super();
        this.getName = this.getName.bind(this);
        this.getAge = this.getAge.bind(this);
        this.sendPersonToList = this.sendPersonToList.bind(this);
        this.deletePersonFromList = this.deletePersonFromList.bind(this);
        this.editModeOn = this.editModeOn.bind(this);
        this.editPerson = this.editPerson.bind(this);
        this.updateEditedPerson = this.updateEditedPerson.bind(this);
        this.clearInputs = this.clearInputs.bind(this);
        this.sortPersonsByAge = this.sortPersonsByAge.bind(this);
        this.sortPersonsByName = this.sortPersonsByName.bind(this);
        this.id = 0;
        this.state = {persons: [], newPersonsName: '', newPersonsAge: '', editMode: 'false', editedItemId: ''};
    }
    
    getName(e){
        this.setState({newPersonsName: e.target.value});
    }
    
    getAge(e){
        this.setState({newPersonsAge: e.target.value});
    }
    
    sendPersonToList(e){
        e.preventDefault();
        const nameInput = e.target.parentElement.firstChild,
            ageInput = e.target.parentElement.firstChild.nextSibling;
        this.setState({persons: this.state.persons.concat([[this.id, this.state.newPersonsName, this.state.newPersonsAge]])}, this.clearInputs(nameInput, ageInput));
        this.id += 1;
    }
    
    clearInputs(firstInput, secondInput){
        firstInput.value = '';
        secondInput.value = '';
    }
    
    deletePersonFromList(e) {
        let removedItemId = parseInt(e.target.parentElement.dataset.id, 10);
        this.setState(prevState => ({ persons: prevState.persons.filter(person => person[0] !== removedItemId) }));
    }
    
    updateEditedPerson(e) {
        e.preventDefault();
        const nameInput = e.target.parentElement.firstChild,
            ageInput = e.target.parentElement.firstChild.nextSibling;
        this.setState(prevState => ({ persons: prevState.persons.map(person => person[0] === this.state.editedItemId ? [this.state.editedItemId, this.state.newPersonsName, this.state.newPersonsAge] : person), editMode: 'false' }), this.clearInputs(nameInput, ageInput));
    }
    
    editModeOn(e) {
        this.setState({editMode: 'true', editedItemId: parseInt(e.target.parentElement.dataset.id, 10)});
    }
    
    editPerson(e) {
        /* chwilowo zbędna funkcja */
        this.setState({editedItemId: parseInt(e.target.parentElement.dataset.id, 10)});
        console.log(e.target.parentElement.dataset.id);
    }
    
    sortPersonsByAge(e) {
        this.setState(prevState => ({ persons: prevState.persons.sort((a,b) => a[2] - b[2]) }));
    }
    
    sortPersonsByName(e) {
        this.setState(prevState => ({ persons: prevState.persons.sort((a, b) => a[1].localeCompare(b[1])) }));
    }
    
    render(){
        return (
            <div>
                <div className="row">
                    <h1>Manage person list</h1>
                </div>
                <AddPersonForm getAge={this.getAge} getName={this.getName} submitHandler={this.sendPersonToList} submitEditHandler={this.updateEditedPerson} editMode={this.state.editMode}/>
                <ResultList editModeOn={this.editModeOn} editPerson={this.editPerson} deleteItem={this.deletePersonFromList} personsData={this.state.persons}/>
                <div className="row">
                    <button className="sortBtn" onClick={this.sortPersonsByAge}>Sortuj Wiek</button>
                    <button className="sortBtn" onClick={this.sortPersonsByName}>Sortuj Nazwisko</button>
                </div>
            </div>
        )
    }
}

class AddPersonForm extends Component {
    render(){
        return (
            <div className="row">
                <form>
                    <input type="text" id="name" placeholder="Wpisz nazwisko" onChange={this.props.getName}/>
                    <input type="text" id="age" placeholder="Wpisz wiek" onChange={this.props.getAge}/>
            {this.props.editMode === 'false' ? (<button onClick={this.props.submitHandler}>Dodaj</button>) : (<button onClick={this.props.submitEditHandler}>Zatwierdź</button>)}
                </form>
            </div>
        )
    }
}

class DeleteButton extends Component {
    render(){
        return(
            <button onClick={this.props.deleteItem} className="itemBtn deleteBtn">Usuń</button>
        )
    }
}

class EditButton extends Component {
    render(){
        return(
            <button onClick={this.props.editModeOn} className="itemBtn editBtn">Edytuj</button>
        )
    }
}

class ResultList extends Component {
    constructor(){
        super();
        this.displayData = this.displayData.bind(this);
        this.hideData = this.hideData.bind(this);
    }
    
    displayData(e){
        ReactDOM.render(<span> Age: {e.target.parentElement.dataset.age}</span>, e.target.nextSibling);
    }

    hideData(e) {
        ReactDOM.render(<span></span>, e.target.nextSibling);
    }
    
    render(){
        return (
            <div className="row">
                <ul>
                    {this.props.personsData.map(item => (
                    <li key={item[0]} data-id={item[0]} data-age={item[2]} data-name={item[1]}><span onMouseEnter={this.displayData} onMouseLeave={this.hideData} onClick={this.props.editPerson}>{item[1]}</span><span></span><DeleteButton deleteItem={this.props.deleteItem}/><EditButton editModeOn={this.props.editModeOn}/></li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default PersonsListManager