<template>
  <div id="wrapper" style="padding-right: 0px; padding-top: 40px;">
    <div class="container">
      <div class="row">
        <div class="col-4">
          <span class="title">
            <h2>Profile</h2>
          </span>
          <img :src=this.api.api.currentAvatar.thumbnailUrl style='width:250px; height:200px'> <br><br>
          <dl class="row">
            <dt class="col-sm-6">Username</dt> 
            <dd class="col-sm-5">{{this.api.api.username}}</dd>

            <dt class="col-sm-6">Display Name</dt> 
            <dd class="col-sm-5">{{this.api.api.displayName}}</dd>

            <dt class="col-sm-6">Friend total</dt> 
            <dd class="col-sm-5">{{this.api.api.friends.length}}</dd>
          </dl>
          <button type="button" class="btn btn-default btn-danger" aria-label="Left Align" @click="logout()">
            <span class="glyphicon glyphicon-refresh" aria-hidden="true">Logout</span>
          </button>
        </div>
        <div class="col justify-content-end">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" id="friend-tab" data-toggle="tab" href="#online-friend" role="tab" aria-controls="home" aria-selected="true">Friends</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="manage-tab" data-toggle="tab" href="#manage-friend" role="tab" aria-controls="manage">Manage Friend</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="add-tab" data-toggle="tab" href="#add-friend" role="tab" aria-controls="manage">Add Friend</a>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="online-friend" role="tabpanel" aria-labelledby="friend-tab"><FriendList :api=api></FriendList></div>
            <div class="tab-pane fade show" id="manage-friend" role="tabpanel" aria-labelledby="manage-tab"><FriendManager :api=api></FriendManager></div>
            <div class="tab-pane fade show" id="add-friend" role="tabpanel" aria-labelledby="add-tab"><AddFriend :api=api></AddFriend></div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex'
  import FriendList from './DashboardPage/FriendList'
  import FriendManager from './DashboardPage/FriendManage'
  import AddFriend from './DashboardPage/AddFriend'
  export default {
    name: 'dashboard-page',
    data: () => {
      return {
        user: this.api
      }
    },
    components: { FriendList, FriendManager, AddFriend },
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
    },
    methods: {
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
