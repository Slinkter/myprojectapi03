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
            const isOnList = state.favorites.find(
                (favorite) => favorite.id === character.id
            );
            if (isOnList) {
                return state;
            } else {
                const newState = {
                    ...state,
                    favorites: [...state.favorites, character],
                };

                return newState;
            }
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
