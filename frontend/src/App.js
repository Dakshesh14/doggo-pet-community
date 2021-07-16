import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

// local imports
import ListPost from './components/ListPost';
import AddPost from './components/AddPost';

function App() {
    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path="/"
                    component={ListPost}
                />
                <Route
                    exact
                    path="/add-post"
                    component={AddPost}
                />
            </Switch>
        </Router>
    )
}

export default App;