/* eslint-disable no-console */
export default function ({ app, req, store, redirect, route, context }) {
  // get from res instead of req - server side
  const token = app.$cookies.get('x-access-token', { fromRes: true })
  if (!token) {
    try {
      return redirect({ path: '/auth', query: { redirect: route.fullPath, message: 'Token Not Provided' } })
    } catch (error) {
      console.log(error)
    }
  }
  return Promise.resolve()
}
