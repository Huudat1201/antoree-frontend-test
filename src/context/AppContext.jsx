import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { mockProducts } from '../data/products';

const AppContext = createContext();

const appReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, allProducts: action.payload, isLoading: false };
        case 'TOGGLE_FAVORITE': {
            const newFavorites = new Set(state.favorites);
            if (newFavorites.has(action.payload)) newFavorites.delete(action.payload);
            else newFavorites.add(action.payload);
            return { ...state, favorites: newFavorites };
        }
        case 'ADD_TO_CART': {
            const newCart = new Map(state.cart);
            const currentQuantity = newCart.get(action.payload.id) || 0;
            newCart.set(action.payload.id, currentQuantity + 1);
            return { ...state, cart: newCart };
        }
        case 'UPDATE_CART_QUANTITY': {
            const newCart = new Map(state.cart);
            if (action.payload.quantity > 0) newCart.set(action.payload.productId, action.payload.quantity);
            else newCart.delete(action.payload.productId);
            return { ...state, cart: newCart };
        }
        case 'CLEAR_CART':
            return { ...state, cart: new Map() };
        case 'ADD_TO_VIEW_HISTORY': {
            const newHistory = [action.payload, ...state.viewHistory.filter(id => id !== action.payload)];
            return { ...state, viewHistory: newHistory.slice(0, 10) };
        }
        case 'SHOW_TOAST':
            return { ...state, toastMessage: action.payload };
        case 'HIDE_TOAST':
            return { ...state, toastMessage: '' };
        default:
            return state;
    }
};

const AppProvider = ({ children }) => {
    const initialState = {
        allProducts: [],
        isLoading: true,
        favorites: new Set(),
        cart: new Map(),
        viewHistory: [],
        toastMessage: '',
    };

    const initializer = (initial) => {
        try {
            const storedFavorites = localStorage.getItem('favorites');
            const storedCart = localStorage.getItem('cart');
            const storedHistory = localStorage.getItem('viewHistory');
            return {
                ...initial,
                favorites: storedFavorites ? new Set(JSON.parse(storedFavorites)) : new Set(),
                cart: storedCart ? new Map(JSON.parse(storedCart)) : new Map(),
                viewHistory: storedHistory ? JSON.parse(storedHistory) : [],
            };
        } catch (error) {
            console.error("Failed to parse from localStorage", error);
            return initial;
        }
    };

    const [state, dispatch] = useReducer(appReducer, initialState, initializer);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(Array.from(state.favorites)));
        localStorage.setItem('cart', JSON.stringify(Array.from(state.cart.entries())));
        localStorage.setItem('viewHistory', JSON.stringify(state.viewHistory));
    }, [state.favorites, state.cart, state.viewHistory]);

    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: 'SET_PRODUCTS', payload: mockProducts });
        }, 1000);
    }, []);

    const value = { state, dispatch };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };