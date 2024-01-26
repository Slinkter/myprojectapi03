// App.js

import { useState } from "react";
import Characters from "./assets/components/Characters";
import Header from "./assets/components/Header";

import ThemeContext from "./assets/context/context";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const f_handleChangeMode = () => {
    setDarkMode(!darkMode);
  };

  const changeColorBG = darkMode ? "bg-gray-900" : "bg-white-900";
  const containerAPP = `flex flex-col justify-center items-center h-auto w-screen ${changeColorBG}`;

  return (
    <ThemeContext.Provider value={{ darkMode, f_handleChangeMode }}>
      <div className={containerAPP}>
        <Header />
        <Characters />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
