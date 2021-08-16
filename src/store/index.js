import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import rootReducer from './reducers/rootReducer';
import persistReducers from './reducers/persistReducers';

const store = createStore(persistReducers(rootReducer));
const persistor = persistStore(store);

export { store, persistor };
