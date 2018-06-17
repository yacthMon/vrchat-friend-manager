const axios = require('axios')
const apiPath = 'https://api.vrchat.cloud/api/1'
const apiKey = 'JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26'
const locationTagData = {
  public: {type: 'Public', description: 'Public room'},
  hidden: {type: 'Friends+', description: 'Friends of Guests'},
  friends: {type: 'Friends', description: 'Friends only'},
  private: {type: 'Invite', description: 'Invite  Only'}
}

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
        if (res.data) {
          for (let friend of res.data) {
            if (friend.location !== 'offline') {
              this.getLocationDetailOfFriend(friend.location).then(({ worldName, locationTag }) => {
                result.push({
                  displayName: friend.displayName,
                  currentAvatarImageUrl: friend.currentAvatarThumbnailImageUrl,
                  location: friend.location,
                  worldName,
                  locationTag
                })
                result = result.sort((a, b) => {
                  if (a.displayName.charAt(0) < b.displayName.charAt(0)) return -1
                  if (a.displayName.charAt(0) > b.displayName.charAt(0)) return 1
                  return 0
                })
              })
            }
          }
          resolve(result)
        } else {
          reject(new Error('[getFriend] Something wrong with response data.'))
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  getAllFriend () {
    return new Promise((resolve, reject) => {
      axios.get(`${apiPath}/auth/user`, {
        params: {
          apiKey,
          authToken: this.authToken
        }
      }).then(async res => {
        if (res.data) {
          let result = []
          for (let friendId of res.data.friends) {
            this.getFriendInfo(friendId).then((friend) => {
              result.push(friend)
              result = result.sort((a, b) => {
                if (a.displayName.charAt(0) < b.displayName.charAt(0)) return -1
                if (a.displayName.charAt(0) > b.displayName.charAt(0)) return 1
                return 0
              })
            })
          }
          resolve(result)
        } else {
          reject(new Error('[getAllFriend] Something wrong with response data.'))
        }
      }).catch(err => {
        console.error(err.response)
        reject(err)
      })
    })
  }

  getLocationDetailOfFriend (location) {
    return new Promise(async (resolve, reject) => {
      let tag = location.substring(location.indexOf('~', 0) + 1, location.indexOf('(', 0))
      let worldId = location.substring(0, location.indexOf(':', 0))
      tag = tag.length === 0 ? 'public' : tag
      if (location === 'private') {
        return resolve({worldName: 'private', locationTag: locationTagData.private})
      }
      axios.get(`${apiPath}/worlds/${worldId}`, {
        params: {
          apiKey: apiKey,
          authToken: this.authToken
        }
      }).then(res => {
        if (res.data) {
          resolve({
            worldName: res.data.name,
            locationTag: locationTagData[tag]
          })
        } else {
          reject(new Error('World no name'))
        }
      })
    })
  }

  getFriendInfo (friendId) {
    return new Promise((resolve, reject) => {
      axios.get(`${apiPath}/users/${friendId}`, {
        params: {
          apiKey: apiKey,
          authToken: this.authToken
        }
      }).then(res => {
        if (res.data) {
          resolve({
            id: res.data.id,
            username: res.data.username,
            displayName: res.data.displayName,
            currentAvatarThumbnailImageUrl: res.data.currentAvatarThumbnailImageUrl
          })
        } else {
          reject(new Error('Player not found'))
        }
      })
    })
  }
}

export default API
