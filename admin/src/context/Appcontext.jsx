import {  createContext } from "react";

export const Appcontext = createContext();






export const AppContextProvider = ({children}) =>{



    const calculateage = (dob) =>{
        const today = new Date();
        const birthdate = new Date(dob);

        let age = today.getFullYear() - birthdate.getFullYear();
        return age;
    }

    const value = {
        calculateage
    }

    return <Appcontext.Provider value={value}>{children}</Appcontext.Provider>
}