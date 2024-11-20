// App.js
import { useEffect, useState } from "react";
// context
import ThemeContext from "./assets/context/context";
//
import Characters from "./assets/components/Characters";
import Header from "./assets/components/Header";
//
const url_api = "https://rickandmortyapi.com/api/character/";
// Main components
const App = () => {
    document.title = "Project 03 - Luis J Cueva";
    /*  */
    const [darkMode, setDarkMode] = useState(false);
    const [characters, setCharacters] = useState([]);
    /*  */
    const f_handleChangeMode = () => setDarkMode(!darkMode);
    /*  */
    const getUser = async () => {
        const res = await fetch(url_api);
        console.log(res);
        const data = await res.json();
        console.log(data);
        setCharacters(data.results);
    };
    /*  */
    useEffect(() => {
        getUser();
    }, []);
    /*  */
    const changeColorBG = darkMode ? "bg-gray-900" : "bg-gray-300";
    const containerStyle = `min-h-dvh flex flex-col justify-center items-center ${changeColorBG}`;
    const listCharacters = [...characters];
    //
    const props = { darkMode, f_handleChangeMode, listCharacters };
    /*    */
    return (
        <ThemeContext.Provider value={props}>
            <div className={containerStyle}>
                <Header />
                <Characters />
            </div>
        </ThemeContext.Provider>
    );
};

export default App;
