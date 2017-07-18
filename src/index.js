import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router,
    Route,
    IndexRoute,
    hashHistory
} from 'react-router';
import './index.css';
import SimpleSlider from './SimpleSlider';
import PersonsListManager from './PersonsListManager';
import BoxDragAndDropper from './BoxDragAndDropper';
import ShoppingManager from './ShoppingManager';
import ShoppingManager2 from './ShoppingManager2';
import LangtonsAnt from './LangtonsAnt';
import Template from './Template.js';

class Home extends Component {
    render() {
        return (
            <h3>
                 Choose a project from the menu above.
            </h3>
        )
    }
}

class App extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Template}>
            <IndexRoute component={Home} />
            <Route path='/PersonsListManager' component={PersonsListManager}  />
            <Route path='/SimpleSlider' component={SimpleSlider}  />
            <Route path='/BoxDragAndDropper' component={BoxDragAndDropper}  />
            <Route path='/ShoppingManager' component={ShoppingManager}  />
            <Route path='/ShoppingManager2' component={ShoppingManager2}  />
            <Route path='/LangtonsAnt' component={LangtonsAnt}  />
        </Route>
      </Router>

    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
