import React, { createContext, useState } from 'react';

// Create the IsLoggedInContext
export const IsLoggedInContext = createContext();

export const IsLoggedInProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <IsLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </IsLoggedInContext.Provider>
    );
};
