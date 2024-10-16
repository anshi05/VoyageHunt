import React, { createContext, useState } from 'react';

// Create the IsLoggedInContext
export const IsLoggedInContext = createContext();

export const IsLoggedInProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <IsLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </IsLoggedInContext.Provider>
    );
};
