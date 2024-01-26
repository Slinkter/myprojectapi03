import React, {
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { Button, Card } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import useCharacters from "../hooks/useCharacters";

import { Input } from "@material-tailwind/react";
import ThemeContext from "../context/context";
import { CardCharacter } from "./CardCharacter";
//
const url_api = "https://rickandmortyapi.com/api/character/";
//
const types = {
  ADDTOFAV: "ADD_TO_FAVORITE",
  DELETEFAV: "DELETE_TO_FAVORITE",
};
const db_state = {
  favorites: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case types.ADDTOFAV: {
      const character = action.payload;
      const isExistCharacterOnList = state.favorites.find(
        (favorite) => favorite.id === character.id
      );

      const newState = isExistCharacterOnList
        ? { ...state }
        : {
            ...state,
            favorites: [...state.favorites, character],
          };
      return newState;
    }
    case types.DELETEFAV: {
      console.log("init delete", state.favorite);
      const character = action.payload; // {}
      const newState = {
        ...state,
        favorites: [
          ...state.favorites.filter((fav) => fav.id !== character.id),
        ],
      };

      return newState;
    }
    default:
      return state;
  }
};

//
const Characters = () => {
  const { darkMode, f_handleChangeMode } = useContext(ThemeContext);

  const [state, dispatch] = useReducer(reducer, db_state);
  const [search, setSearch] = useState("");
  //
  const characters = useCharacters(url_api);
  console.log("---------<", characters);
  // uso de callback
  const handleSearch = useCallback(({ target }) => {
    setSearch(target.value);
  }, []);

  const handleAddCharacter = useCallback((fav) => {
    dispatch({ type: types.ADDTOFAV, payload: fav });
  }, []);
  const handleDeleteCharacter = (fav) => {
    dispatch({ type: types.DELETEFAV, payload: fav });
  };

  // usememo
  const filterUser = useMemo(
    () =>
      characters.filter((user) => {
        if (user && user.name) {
          return user.name.toLowerCase().includes(search.toLowerCase());
        }
        return false;
      }),
    [characters, search]
  );

  console.log(filterUser);
  return (
    <div className="w-3/4 flex flex-col justify-center items-center">
      <div className="border-4 border-gray-800 rounded-xl p-5 w-full">
        <Typography color={darkMode ? "white" : "red"} variant="h1">
          Lista de favoritos
        </Typography>
        {console.log("state.favorites.map", state.favorites)}
        <ul>
          {state.favorites.map((fav) => (
            <li
              key={fav.id}
              className="flex flex-row justify-between items-center m-2"
            >
              <Typography variant="h4" color={darkMode ? "white" : "red"}>
                {" "}
                <span> {fav.name}</span>
              </Typography>

              <Button
                color={darkMode ? "white" : "red"}
                onClick={() => handleDeleteCharacter(fav)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <br />

      <Input
        size="lg"
        color={darkMode ? "white" : "black"}
        variant=""
        label="Nombre"
        placeholder="Ingresar texto"
        value={search}
        onChange={handleSearch}
      />

      <br />
      <Typography color={darkMode ? "white" : "red"} variant="h1">
        Lista de Personajes
      </Typography>
      <br />
      <div className="  grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-3 ">
        {filterUser
          .map((user) => (
            <div key={user.id}>
              <CardCharacter
                user={user}
                handleAddCharacter={handleAddCharacter}
              />
            </div>
          ))
          .slice(0, 50)}
      </div>
      <br />
      <br />
    </div>
  );
};

export default Characters;
