export const setMessage = (message) => ({
  type: 'SET_MESSAGE',
  payload: message,
});

export const setSortBy = (pageName, field) => ({
  type: 'SET_SORT_BY',
  payload: { pageName, field },
});

export const setSortOrder = (pageName, order) => ({
  type: 'SET_SORT_ORDER',
  payload: { pageName, order },
});