import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import browserHistory from './history';
import NotFound from "./components/NotFound/NotFound";
import Films from "./components/Films/Films";
import Actors from "./components/Actors/Actors";
import Companies from "./components/Companies/Companies";
import Genres from "./components/Genres/Genres";
import Actor from "./components/Actors/Actor/Actor";
import Company from "./components/Companies/Company/Company";
import Genre from "./components/Genres/Genre/Genre";
import Film from "./components/Films/Film/Film";


ReactDOM.render(
    <Router history={browserHistory}>
        <App>
            <Switch>
                <Route exact path='/' component={Films}/>
                <Route exact path='/films' component={Films}/>
                <Route exact path='/films/:id' component={Film}/>

                <Route exact path='/actors' component={Actors}/>
                <Route exact path='/actors/:id' component={Actor}/>

                <Route exact path='/companies' component={Companies}/>
                <Route exact path='/companies/:id' component={Company}/>

                <Route exact path='/genres' component={Genres}/>
                <Route exact path='/genres/:id' component={Genre}/>

                <Route path='*' component={NotFound}/>
            </Switch>
        </App>
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
