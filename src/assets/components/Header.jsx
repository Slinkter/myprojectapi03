import React, { useContext, useState } from "react";
import ThemeContext from "../context/context";
import { Button } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";

const Header = () => {
  const { darkMode, f_handleChangeMode } = useContext(ThemeContext);

  return (
    <div
      className={
        darkMode
          ? `border-4 border-gray-800 rounded-xl p-5 w-3/4 m-2 text-center `
          : `border-4 border-gray-800 rounded-xl p-5 w-3/4 m-2 text-center`
      }
    >
      <div>
        <Typography color={darkMode ? "white" : "red"} variant="h1">
          Rick and Morty API
        </Typography>
        <Typography color={darkMode ? "white" : "red"} variant="paragraph">
          custom Hooks
        </Typography>
        <Typography color={darkMode ? "white" : "red"} variant="paragraph">
          useReducer
        </Typography>
        <Typography color={darkMode ? "white" : "red"} variant="paragraph">
          Tailwind CSS
        </Typography>
        <Button
          color={darkMode ? "white" : "red"}
          variant="outlined"
          type="button"
          onClick={f_handleChangeMode}
        >
          {darkMode ? "Light Mode " : "Dark Mode "}
        </Button>
      </div>
    </div>
  );
};

export default Header;
