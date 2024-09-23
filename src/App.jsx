// App.js
import { useEffect, useState } from "react";
import Characters from "./assets/components/Characters";
import Header from "./assets/components/Header";
import ThemeContext from "./assets/context/context";
//
const App = () => {
    /*  */
    const [characters, setCharacters] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const f_handleChangeMode = () => setDarkMode(!darkMode);
    /*  */
    const getUser = async () => {
        const url_api = "https://rickandmortyapi.com/api/character/";
        const res = await fetch(url_api);
        const data = await res.json();
        setCharacters(data.results);
    };
    /*  */
    useEffect(() => {
        getUser();
    }, []);
    /*  */
    const changeColorBG = darkMode ? "bg-gray-900" : "bg-gray-300";
    const containerStyle = `flex flex-col justify-center items-center h-auto ${changeColorBG}`;
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
