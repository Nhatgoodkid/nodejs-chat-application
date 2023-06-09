import React from 'react';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Chat from './components/Chat/Chat';
import ProtectedRoute from './components/Router/ProtectedRoute';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSmile, faImage } from '@fortawesome/free-regular-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
    faSpinner,
    faEllipsis,
    faUserPlus,
    faSignOutAlt,
    faTrash,
    faCaretDown,
    faUpload,
    faTimes,
    faBell,
} from '@fortawesome/free-solid-svg-icons';
library.add(
    faSmile,
    faImage,
    faSpinner,
    faEllipsis,
    faUserPlus,
    faSignOutAlt,
    faTrash,
    faCaretDown,
    faUpload,
    faTimes,
    faBell,
    far,
    fas,
    fab,
);
function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <ProtectedRoute exact path="/" component={Chat} />
                    <Route path="/auth/login" component={Login} />
                    <Route path="/auth/register" component={Register} />
                    <Route render={() => <h1>404 Page not found</h1>} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
