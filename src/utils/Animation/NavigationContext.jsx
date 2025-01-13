import React, { createContext, useContext } from "react";

const NavigationContext = createContext();

export const NavigationProvider = ({ children, value }) => (
  <NavigationContext.Provider value={value}>
    {children}
  </NavigationContext.Provider>
);

// Custom hook renamed to avoid conflicts
export const useAnimNavigation = () => useContext(NavigationContext);
