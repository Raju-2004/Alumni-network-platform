import React, { createContext, useContext, useState, useEffect } from 'react';

const MyContext = createContext();

export function MyContextProvider({ children }) {
  const [userType, setUserType] = useState(null);
  const [myOtherValue, setMyOtherValue] = useState(null); // Add your other value here

  useEffect(() => {
    // Load userType and your other value from local storage when the app starts
    const savedUserType = localStorage.getItem('userType');
    if (savedUserType) {
      setUserType(savedUserType);
    }

    /* const savedMyOtherValue = localStorage.getItem('myOtherValue');
    if (savedMyOtherValue) {
      setMyOtherValue(savedMyOtherValue);
    } */
  }, []);

  const setUserTypeAndSave = (newUserType) => {
    setUserType(newUserType);
    localStorage.setItem('userType', newUserType);
  };

  /* const setMyOtherValueAndSave = (newMyOtherValue) => {
    setMyOtherValue(newMyOtherValue);
    localStorage.setItem('myOtherValue', newMyOtherValue);
  }; */

    //   myOtherValue, setMyOtherValue: setMyOtherValueAndSave 

  return (
    <MyContext.Provider value={{ userType, setUserType: setUserTypeAndSave}}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  return useContext(MyContext);
}
