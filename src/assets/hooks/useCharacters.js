import React, { useEffect, useState } from "react";

const useCharacters = (api_url) => {
    const [characters, setCharacters] = useState([]);
    /*  */
    const getUser = async () => {
        const res = await fetch(api_url);
        const data = await res.json();
        setCharacters(data.results);
    };

    useEffect(() => {
        getUser();
    }, [api_url]);

    return characters;
};

export default useCharacters;
