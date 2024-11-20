import { useCallback, useContext, useMemo, useReducer, useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import ThemeContext from "../context/context";
import { CardCharacter } from "./CardCharacter";
import { globalState, reducer, types } from "./utils";

const Characters = () => {
    // contenxt global
    const { darkMode, listCharacters } = useContext(ThemeContext);
    // Hooks
    const [search, setSearch] = useState("");
    // reducer
    const [state, dispatch] = useReducer(reducer, globalState);
    // func
    const handleSearch = useCallback(({ target }) => {
        setSearch(target.value);
    }, []);
    // func
    const handleAddCharacter = useCallback((fav) => {
        dispatch({ type: types.ADDTOFAV, payload: fav });
        setSearch("");
    }, []);
    // func
    const handleDeleteCharacter = (fav) => {
        dispatch({ type: types.DELETEFAV, payload: fav });
    };
    // func
    const filteredUsers = useMemo(() => {
        return listCharacters.filter((user) =>
            user.name?.toLowerCase().includes(search)
        );
    }, [listCharacters, search]);

    return (
        <div className=" flex flex-col justify-center items-center gap-2 md:gap-6 text-center  container mx-auto  border-4 my-4 p-5">
            <div className="w-3/4 p-5  border-gray-400 rounded-xl">
                <Typography color={darkMode ? "white" : "red"} variant="h3">
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
            <div className="w-80 md:w-96">
                <Input
                    variant="outlined"
                    color={darkMode ? "white" : "black"}
                    label="Nombre"
                    placeholder="Ingresar texto"
                    value={search}
                    onChange={handleSearch}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.slice(0, 10).map((user) => (
                    <div key={user.id}>
                        <CardCharacter
                            user={user}
                            handleAddCharacter={handleAddCharacter}
                            fav={state.favorites}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Characters;
