import { useContext } from "react";
import { createContext } from "react";
// 
export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    // define any global state or functions here
    const value = {

    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const usAppContext = () => {
    return useContext(AppContext);
}