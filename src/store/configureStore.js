import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import accountReducer from '../reducers/account';
import balanceReducer from '../reducers/balance';
import reserveReducer from '../reducers/reserve';
import priceReducer from '../reducers/price';

let composeEnhancers = compose;

if(process.env.NODE_ENV === 'development'){
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const persistConfig = {
  key: 'root',
  storage
}

const rootReducer = combineReducers({
  account: accountReducer,
  balance: balanceReducer,
  reserve: reserveReducer,
  price: priceReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
  const persistor = persistStore(store);
  persistor.purge();
  return {store, persistor};
};