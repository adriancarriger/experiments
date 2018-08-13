import auth0 from 'auth0-js'
import Vue from 'vue'

const webAuth = new auth0.WebAuth({
  domain: 'adriancarriger.auth0.com',
  clientID: '4pHc0YjDT5imFYpAQp4ILKFmWAGviatA',
  redirectUri: 'http://localhost:4555/callback',
  audience: 'https://adriancarriger.auth0.com/userinfo',
  responseType: 'token id_token',
  scope: 'openid'
})

const auth = new Vue({
  computed: {
    token: {
      get: function () {
        return localStorage.getItem('id_token')
      },
      set: function (id_token) {
        localStorage.setItem('id_token', id_token)
      }
    },
    accessToken: {
      get: function () {
        return localStorage.getItem('access_token')
      },
      set: function (accessToken) {
        localStorage.setItem('access_token', accessToken)
      }
    },
    expiresAt: {
      get: function () {
        return localStorage.getItem('expires_at')
      },
      set: function (expiresIn) {
        let expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime())
        localStorage.setItem('expires_at', expiresAt)
      }
    },
    user: {
      get: function () {
        return JSON.parse(localStorage.getItem('user'))
      },
      set: function (user) {
        localStorage.setItem('user', JSON.stringify(user))
      }
    }
  },
  methods: {
    login() {
      webAuth.authorize()
    },
    logout() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('id_token')
      localStorage.removeItem('expires_at')
      localStorage.removeItem('user')
      webAuth.authorize()
    },
    isAuthenticated() {
      return new Date().getTime() < this.expiresAt
    },
    handleAuthentication() {
      return new Promise((resolve, reject) => {
        webAuth.parseHash((err, authResult) => {
          console.log('handleAuthentication', authResult)

          if (authResult && authResult.accessToken && authResult.idToken) {
            this.expiresAt = authResult.expiresIn
            this.accessToken = authResult.accessToken
            this.token = authResult.idToken
            this.user = authResult.idTokenPayload

            this.updateAuthHeader()
            resolve()

          } else if (err) {
            this.logout()
            reject(err)
          }

        })
      })
    },
    updateAuthHeader() {
      if (localStorage.getItem('id_token')) {
        Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')
      }
    }
  }
})

export default {
  install: function (Vue) {
    Vue.prototype.$auth = auth;
    auth.updateAuthHeader();
  }
}
