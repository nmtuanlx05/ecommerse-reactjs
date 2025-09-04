import { createContext, useState } from 'react';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const value = {
        toast
    };

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    );
};
