import React, { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const Toast = () => {
    const { state, dispatch } = useAppContext();
    useEffect(() => {
        if (state.toastMessage) {
            const timer = setTimeout(() => dispatch({ type: 'HIDE_TOAST' }), 2500);
            return () => clearTimeout(timer);
        }
    }, [state.toastMessage, dispatch]);

    if (!state.toastMessage) return null;
    return <div className="fixed bottom-5 right-5 bg-gray-800 text-white py-2 px-4 rounded-lg shadow-lg animate-fade-in-out z-50">{state.toastMessage}</div>;
};

export default Toast;