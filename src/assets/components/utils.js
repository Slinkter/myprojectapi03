export const types = {
    ADDTOFAV: "ADD_TO_FAVORITE",
    DELETEFAV: "DELETE_TO_FAVORITE",
};

export const globalState = {
    favorites: [],
};

export const reducer = (state, action) => {
    switch (action.type) {
        case types.ADDTOFAV: {
            const character = action.payload;
            const isFavorite = state.favorites.find(
                (fav) => fav.id === character.id
            );
            return !isFavorite
                ? { ...state, favorites: [...state.favorites, character] }
                : state;
        }
        case types.DELETEFAV: {
            const character = action.payload;
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
