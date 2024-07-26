// App.js
import { useState } from "react";
import Characters from "./assets/components/Characters";
import Header from "./assets/components/Header";
import ThemeContext from "./assets/context/context";
import { ToastContainer } from "react-toastify";

//
const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const f_handleChangeMode = () => {
        setDarkMode(!darkMode);
    };
    /* flex flex-col justify-center  items-center h-screen w-full */
    const changeColorBG = darkMode ? "bg-gray-900" : "bg-gray-100";
    const containerStyle = `flex flex-col justify-center items-center h-auto w-full ${changeColorBG}`;

    return (
        <ThemeContext.Provider value={{ darkMode, f_handleChangeMode }}>
            <div className={containerStyle}>
                <Header />
                <Characters />
            </div>
        </ThemeContext.Provider>
    );
};

export default App;
