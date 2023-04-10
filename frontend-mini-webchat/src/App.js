import React from 'react';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Chat from './components/Chat/Chat';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Chat} />
                    <Route path="/auth/login" component={Login} />
                    <Route path="/auth/register" component={Register} />
                    <Route render={() => <h1>404 Page not found</h1>} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
