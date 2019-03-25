export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        users: (state.users || []).concat(action.user),
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id),
      };

    case 'SET_CURRENT_USER':
      return {
        ...state,
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user,
      };

    case 'LOAD_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: action.searchResults,
      };

    case 'LOAD_GAME':
      return {
        ...state,
        myGames: (state.myGames || []).concat(action.game),
      };

    case 'LOAD_MY_GAMES':
      return {
        ...state,
        myGames: action.myGames,
      };

    case 'LOAD_USER':
      return {
        ...state,
        users: (state.users || []).concat(action.user),
      };

    case 'LOAD_USERS':
      return {
        ...state,
        users: action.users,
      };

    default:
      return state;
  }
};
