const logger = (store) => (next) => (action) => {
  console.log('Action: ', action);

  const result = next(action);

  console.log('New state: ', store.getState());

  return result;
};

export default logger;