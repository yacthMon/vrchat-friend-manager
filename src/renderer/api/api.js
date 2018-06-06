const axios = require('axios')
const apiPath = 'https://api.vrchat.cloud/api/1'
const apiKey = 'JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26'

class API {
  constructor () {
    this.loggedin = false
    this.userId = 'no user'
    this.authToken = 'no user'
    this.username = 'no user'
    this.displayName = 'no user'
    this.friends = []
    this.currentAvatar = {
      imageUrl: '',
      thumbnailUrl: ''
    }
  }

  login (username, password) {
    return new Promise((resolve, reject) => {
      axios.get(`${apiPath}/auth/user`, {
        params: {
          apiKey
        },
        auth: {
          username,
          password
        }
      }).then(res => {
        if (res.data) {
          this.userId = res.data.id
          this.username = res.data.username
          this.displayName = res.data.displayName
          this.friends = res.data.friends
          this.currentAvatar.imageUrl = res.data.currentAvatarImageUrl
          this.currentAvatar.thumbnailUrl = res.data.currentAvatarThumbnailImageUrl
          this.authToken = res.data.authToken
          this.loggedin = true
          resolve()
        } else {
          reject(new Error('[login] Something wrong with response data.'))
        }
      }).catch(err => {
        console.error(err.response)
        reject(err)
      })
    })
  }

  getFriend () {
    return new Promise((resolve, reject) => {
      axios.get(`${apiPath}/auth/user/friends`, {
        params: {
          apiKey: apiKey,
          authToken: this.authToken
        }
      }).then(async res => {
        let result = []
        for (let friend of res.data) {
          if (friend.location !== 'offline') {
            this.getWorldNameOfFriend(friend.location).then(worldName => {
              result.push({
                displayName: friend.displayName,
                currentAvatarImageUrl: friend.currentAvatarThumbnailImageUrl,
                worldName: worldName
              })
            })
          }
        }
        res.data ? resolve(result) : reject(new Error('[getFriend] Something wrong with response data.'))
      }).catch(err => {
        console.error(err.response)
      })
    })
  }

  getWorldNameOfFriend (worldId) {
    return new Promise(async (resolve, reject) => {
      if (worldId === 'private') return resolve('private')
      worldId = worldId.substring(0, 41)
      axios.get(`${apiPath}/worlds/${worldId}`, {
        params: {
          apiKey: apiKey,
          authToken: this.authToken
        }
      }).then(res => {
        res.data.name ? resolve(res.data.name) : reject(new Error('World no name'))
      })
    })
  }
}

export default API
