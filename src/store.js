import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const inititalState = {};
//midellware_permet_d'ecouter_le_changement_du_store_et_d'ajouter_des_nouvelles_élements
const store = createStore(
        rootReducer, 
        inititalState, 
        compose(applyMiddleware(thunk), 
                window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;