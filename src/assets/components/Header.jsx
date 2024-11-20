import React, { useContext } from "react";
import { Button } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import ThemeContext from "../context/context";

const Header = () => {
    const { darkMode, f_handleChangeMode } = useContext(ThemeContext);
    const colordarkMode = darkMode ? "white" : "red";

    return (
        <div className="w-3/4 ">
            <div className="flex flex-col  justify-center items-center gap-2 my-4 text-center">
                <Typography variant="h1" color={colordarkMode}>
                    Rick and Morty API
                </Typography>
                <Typography color={darkMode ? "white" : "red"} variant="lead">
                    ContextAPI + Reducer(fav) + Actions + State
                </Typography>
                <Button
                    className="w-full md:w-1/4"
                    type="button"
                    color={colordarkMode}
                    onClick={f_handleChangeMode}
                >
                    {darkMode ? "Light Mode " : "Dark Mode "}
                </Button>
            </div>
        </div>
    );
};

export default Header;
