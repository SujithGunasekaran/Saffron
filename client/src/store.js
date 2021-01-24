import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import AllReducers from './Redux/reducer';

const saveToLocalStorage = (state) => {
    try {
        let stringData = JSON.stringify(state);
        localStorage.setItem('state', stringData)
    }
    catch (error) {
        console.log(error)
    }
}

const loadFromLocalStorage = () => {
    try {
        let stringData = localStorage.getItem('state');
        if (stringData === null) return undefined;
        return JSON.parse(stringData)
    }
    catch (error) {
        console.log(error)
    }
}

let storedReduxData = loadFromLocalStorage();

const store = createStore(
    AllReducers,
    storedReduxData,
    compose(
        applyMiddleware(thunk),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
