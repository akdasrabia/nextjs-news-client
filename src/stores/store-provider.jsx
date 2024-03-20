"use client"

import { Provider  } from "react-redux";
import {store, createStore} from ".";


export function StoreProvider({children, preloadedState}) {

    const store = createStore(preloadedState)
    return (
        <Provider store={store}>

        {children}

        </Provider>
    )
}