import React, { createContext, useContext, useReducer, useState } from "react";

// Initialize context with the default theme
// const ls = JSON.parse(localStorage.getItem('sidebar'))
const initialState = 
{
  key: '',
  title: '',
  submenu: ['sub1'],
  dashboards: [],
  widgetBackgroundColor: "#ffffff",
  gridBackGroundColor: "#D9E0EC",
  selectedWidgetBackgroundColor: "#D9E0EC",
  primary: "#ECBA91",
  secondary: "#798DE4",
  extendedColors: ["#8fbc8b", "#ffdb8c", "#fac3e0", "#c98cd4"]
}

const Context = createContext(initialState);

// Reducer to handle dispatched actions that change context
const reducer = (state, action) => {
  const { type, payload } = action;
  const obj = {...state, ...payload};
  if(typeof(obj.title) !== 'string')
    obj.title = 'Unknown Title'
  localStorage.setItem('sidebar', JSON.stringify(obj));

  switch (type) {
    case "CHANGE SIDEBAR": {
      return {
        ...state,
        ...payload
      };
    }
    case "CHANGE THEME": {
      return {
        ...state,
        ...payload
      };
    }
    default:
      return state;
  }
};

const ContextProvider = props => {
  const [context, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ context, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };