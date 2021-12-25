import {combineReducers, createStore} from "redux";
import gameReducer from "./gameReducer";

let reducers = {
    game: gameReducer,
};

export let store = createStore(combineReducers(reducers));