import { useCallback, useContext, useMemo, useReducer, useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import ThemeContext from "../context/context";
import useCharacters from "../hooks/useCharacters";
import { CardCharacter } from "./CardCharacter";
import { globalState, reducer, types } from "./utils";

const Characters = () => {
    // Theme
    const { darkMode } = useContext(ThemeContext);
    // hooks
    const [search, setSearch] = useState("");
    const [state, dispatch] = useReducer(reducer, globalState);
    // custom hooks
    const url_api = "https://rickandmortyapi.com/api/character/";
    const characters = useCharacters(url_api);

    const handleSearch = useCallback(({ target }) => {
        setSearch(target.value);
    }, []);

    const handleAddCharacter = useCallback((fav) => {
        dispatch({ type: types.ADDTOFAV, payload: fav });
        setSearch("");
    }, []);

    const handleDeleteCharacter = (fav) => {
        dispatch({ type: types.DELETEFAV, payload: fav });
    };

    const filterUser = useMemo(
        () =>
            characters.filter((user) => {
                if (user && user.name) {
                    return user.name
                        .toLowerCase()
                        .includes(search.toLowerCase());
                } else {
                    return false;
                }
            }),
        [characters, search]
    );

    return (
        <div className="w-3/4 flex flex-col justify-center items-center gap-6 max-w-screen-lg">
            <Input
                size="lg"
                color={darkMode ? "white" : "black"}
                variant=""
                label="Nombre"
                placeholder="Ingresar texto"
                value={search}
                onChange={handleSearch}
            />
            <div className="w-full p-5 border-2 border-gray-400 rounded-xl">
                <Typography color={darkMode ? "white" : "red"} variant="h2">
                    Lista de favoritos
                </Typography>

                <ul>
                    {state.favorites.map((fav) => (
                        <li
                            key={fav.id}
                            className="flex flex-row justify-between items-center m-2 "
                        >
                            <Typography
                                variant="h4"
                                color={darkMode ? "white" : "red"}
                            >
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

            <Typography color={darkMode ? "white" : "red"} variant="h2">
                Lista de Personajes
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filterUser.slice(0, 10).map((user) => (
                    <div key={user.id}>
                        <CardCharacter
                            user={user}
                            handleAddCharacter={handleAddCharacter}
                        />
                    </div>
                ))}
            </div>
            <br />
            <br />
        </div>
    );
};

export default Characters;
