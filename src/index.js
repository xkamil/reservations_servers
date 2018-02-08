import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import {applyMiddleware, createStore} from "redux";
import reducers from "./reducers";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import Api from "./Api";

const store = createStore(reducers, applyMiddleware(thunk.withExtraArgument(Api)));

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <Route path="/" component={App}/>
        </Provider>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
