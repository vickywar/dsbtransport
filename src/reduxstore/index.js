

import { createStore, applyMiddleware } from 'redux';
import rootreducer from 'reduxstore/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { checkLogin } from 'reduxstore/actions';


const CreateStoreConfig = () => {
    const store = createStore(
        rootreducer,
        composeWithDevTools(applyMiddleware(thunk))
    );
    
    store.dispatch(checkLogin());
    return store;    
};

export default CreateStoreConfig;