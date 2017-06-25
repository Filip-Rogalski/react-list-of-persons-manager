import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends Component {
    constructor() {
        super();
        this.sendPersonToList = this.sendPersonToList.bind(this);
        this.deletePersonFromList = this.deletePersonFromList.bind(this);
        this.editPerson = this.editPerson.bind(this);
        this.sortPersonsByAge = this.sortPersonsByAge.bind(this);
        this.sortPersonsByName = this.sortPersonsByName.bind(this);
        this.getName = this.getName.bind(this);
        this.getAge = this.getAge.bind(this);
        this.id = 0;
        this.state = {persons: [], newPersonsName: '', newPersonsAge: ''};
    }
    
    getName(e){
        this.setState({newPersonsName: e.target.value});
    }
    
    getAge(e){
        this.setState({newPersonsAge: e.target.value});
    }
    
    sendPersonToList(e){
        e.preventDefault();
        this.setState({persons: this.state.persons.concat([[this.id, this.state.newPersonsName, this.state.newPersonsAge]])});
        this.id += 1;
    }
        
    deletePersonFromList(e) {
        let removedItemId = parseInt(e.target.parentElement.dataset.id, 10);
        this.setState(prevState => ({ persons: prevState.persons.filter(person => person[0] !== removedItemId) }));
    }
    
    editPerson(e) {
        console.log(e.target);
        /* dokończyć obsługę edycji */
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
                <h1>Manage person list</h1>
                <AddPersonForm getAge={this.getAge} getName={this.getName} submitHandler={this.sendPersonToList}/>
                <ResultList editItem={this.editPerson} deleteItem={this.deletePersonFromList} personsData={this.state.persons}/>
                <button className="sortBtn" onClick={this.sortPersonsByAge}>Sortuj Wiek</button>
                <button className="sortBtn" onClick={this.sortPersonsByName}>Sortuj Nazwisko</button>
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
                    <input type="submit" value="Dodaj" onClick={this.props.submitHandler}/>
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
            <button onClick={this.props.editItem} className="itemBtn editBtn">Edytuj</button>
        )
    }
}

class ResultList extends Component {
    render(){
        return (
            <div className="row">
                <ul>
                    {this.props.personsData.map(item => (
                    <li key={item[0]} data-id={item[0]} data-age={item[2]} data-name={item[1]}><span>{item[1]}</span><DeleteButton deleteItem={this.props.deleteItem}/><EditButton editItem={this.props.editItem}/></li>
                    ))}
                </ul>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));