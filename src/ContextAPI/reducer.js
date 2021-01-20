export const initialState = {
  user: null,
  categoryId: "",
  categoryTitle: "",
  recipyId: ""
};


const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user
      };
    case "SET_CATEGORY_ID":
      return {
        ...state,
        categoryId: action.categoryId
      };
    case "SET_CATEGORY_TITLE":
      return {
        ...state,
        categoryTitle: action.categoryTitle
      };
    case "SET_RECIPY_ID":
      return {
        ...state,
        recipyId: action.recipyId
      };
    default:
      return state;
  }
};

export default reducer;