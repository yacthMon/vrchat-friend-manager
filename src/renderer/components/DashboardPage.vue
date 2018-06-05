<template>
  <div id="wrapper" style="padding-right: 0px;">
    <div class="container">
      <div class="row">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
        <div class="col-4">
          <span class="title">
            <h2>Profile</h2>
          </span>
          <img :src=this.api.api.currentAvatar.thumbnailUrl style='width:250px; height:200px'> <br><br>
          <b>Username</b> {{this.api.api.username}}<br>
          <b>Display Name</b> {{this.api.api.displayName}}<br>
          <b>Friend total</b> {{this.api.api.friends.length}}<br>
          <br><br>
          <button type="button" class="btn btn-default btn-danger" aria-label="Left Align" @click="logout()">
            <span class="glyphicon glyphicon-refresh" aria-hidden="true">Logout</span>
          </button>
        </div>
        <div class="col justify-content-end">
          {{getOnlineFriend()}}
          <h4>Online Friend <span class="badge badge-secondary">{{this.friends ? this.friends.length : 0 }}</span> 
          <button type="button" class="btn btn-default btn-info" aria-label="Left Align" @click="friends=null">
            <span class="glyphicon glyphicon-refresh" aria-hidden="true">refresh</span>
          </button></h4>
          <ol id="friendlist" style="list-style-type: none;height:400px; width:500px; overflow-y: auto;">
            <li v-for="friend in friends">
              <div class="media">
                <img class="mr-3 border border-dark" :src=friend.currentAvatarImageUrl style='width:120px; height:80px'>
                <div class="media-body">
                  <h5 class="mt-0">{{friend.displayName}}</h5>
                  In world : {{friend.worldName}}
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex'
  export default {
    name: 'dashboard-page',
    data: () => {
      return {
        user: this.api,
        friends: null
      }
    },
    computed: {
      ...mapState({
        api: state => state.User.api
      }),
      ...mapGetters(['getAPI']),
      ...mapActions([
        'setAPI'
      ])
    },
    mounted: () => {
      // not worked :\
      // console.log(this.getAPI)
      // this.getAPI().api.getFriend().then(friends => {
      //   this.friends = friends
      //   console.log(friends[0])
      //   this.onlineFriend = friends.length
      // })
    },
    components: { },
    methods: {
      getOnlineFriend () {
        if (!this.friends) {
          this.api.api.getFriend().then(friends => {
            this.friends = friends
          })
        }
      },
      logout () {
        this.$store.dispatch('setAPI', {api: null})
        this.$router.push({name: 'login-page'})
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }
  
  .right-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
