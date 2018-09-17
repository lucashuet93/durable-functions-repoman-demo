import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import App from '../components/App';

const Routes = () => (
    <Router>
        <div>
            <Route exact={true} path="/" component={App} />
            <Route path="/topics" component={App} />
        </div>
    </Router>
)

export default Routes;