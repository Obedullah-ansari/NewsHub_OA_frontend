import { createStore } from "redux";

const token = localStorage.getItem("token")
const userId = localStorage.getItem("userId")
const initialState = {
  update: false,
  Auth: token,
  User: userId
};


const updateReducer = (state = initialState, action) => {
  switch (action.type) {
    case  "updateprofilephoto":
      return { ...state, update: !state.update };

    case "Auth":
      return { ...state, Auth: action.payload }; // Use action.payload for Auth token

    case "User":
    return { ...state,  User: action.payload};

    case "Logout":
      return { ...state, Auth: null ,User :null };

    

    default:
      return state;
  }
};

// Create store
const store = createStore(updateReducer);

export default store;
