export default {
  resetOnError: true,
  plugins: ['~/plugins/auth.js'],
  redirect: {
    login: '/auth/login',
    logout: '/auth/login',
    callback: '/auth/login',
    home: '/'
  },
  strategies: {
    local: {
      endpoints: {
        login: {
          url: 'auth/login/',
          method: 'post',
          propertyName: 'key'
        },
        logout: {
          url: 'auth/logout/',
          method: 'post'
        },
        user: {
          url: 'auth/user/',
          method: 'get',
          propertyName: false
        }
      },
      tokenType: 'Token'
    }
  }
}
