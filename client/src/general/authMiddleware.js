export const authMiddleware = store => next => action => {
  console.log(store.getStore().auth.authenticated);
  return next(action)
}
