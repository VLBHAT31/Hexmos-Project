const initialState = {
  message: '',
  sortBy: {},
  sortOrder: {},
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return { ...state, message: action.payload };
    case 'SET_SORT_BY':
      return {
        ...state,
        sortBy: {
          ...state.sortBy,
          [action.payload.pageName]: action.payload.field,
        },
      };
    case 'SET_SORT_ORDER':
      return {
        ...state,
        sortOrder: {
          ...state.sortOrder,
          [action.payload.pageName]: action.payload.order,
        },
      };
    default:
      return state;
  }
};

export default messageReducer; 