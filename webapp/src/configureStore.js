import reducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'


export default function configureStore(initialState) {
    // Note: passing middleware as the last argument to createStore requires redux@>=3.1.0
    const sagaMiddleware = createSagaMiddleware()
    return {
        ...createStore(reducer, initialState, applyMiddleware(sagaMiddleware)),
        runSaga: sagaMiddleware.run
    }
}