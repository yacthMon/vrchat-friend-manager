<template>
  <div>
    {{getOnlineFriend()}}
    <h4 style="margin-top: 10px;">Online Friend <span class="badge badge-secondary">{{this.friends ? this.friends.length : 0 }}</span> 
    <button type="button" class="btn btn-default btn-info" aria-label="Left Align" @click="refreshFriendList()">
      <span class="glyphicon glyphicon-refresh" aria-hidden="true">refresh</span>
    </button>
    </h4>
    <transition-group name="list" tag="ul" class="list" >
      <li v-for="(friend,i) in friends" v-bind:key="i">
        <div class="media">
          <img class="mr-3 border border-dark" :src=friend.currentAvatarImageUrl style='width:120px; height:80px'>
          <div class="media-body"> 
            <div class="row" style="margin-left: 0px; margin-right: 0px;">
              <div class="col-6"  style="padding-left: 0px;">
                <h5 class="mt-0">{{friend.displayName}}</h5>
                <span class="world-name">
                In world : {{friend.worldName}}
                </span>
                <div class="row" >
                  <span class="col align-self-start">
                    <span class="badge badge-pill badge-primary" data-toggle="tooltip" :title=friend.locationTag.description v-if="friend.locationTag.type=='Public'">{{friend.locationTag.type}}</span>
                    <span class="badge badge-pill badge-success" data-toggle="tooltip" :title=friend.locationTag.description v-if="friend.locationTag.type=='Friends+'">{{friend.locationTag.type}}</span>
                    <span class="badge badge-pill badge-info" data-toggle="tooltip" :title=friend.locationTag.description v-if="friend.locationTag.type=='Friends'">{{friend.locationTag.type}}</span>
                    <span class="badge badge-pill badge-warning" data-toggle="tooltip" :title=friend.locationTag.description v-if="friend.locationTag.type=='Invite'">{{friend.locationTag.type}}</span>
                  </span>
                </div>
              </div>
              <span class="col align-self-center text-right">
                <button type="button" class="btn btn-light" data-toggle="tooltip" :title=friend.location v-if="friend.locationTag.type!='Invite'" @click="open(friend.location)">
                  Join
                </button>
              </span>
            </div>
          </div>
        </div>
      </li>
    </transition-group>
    <b><span>** Joining friend will launch new VRChat window </span></b>
  </div>
</template>

<script>
export default {
  name: 'friend-list',
  props: {
    api: {
      type: Object,
      default: () => ({})
    }
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
  data () {
    return {
      friends: null
    }
  },
  methods: {
    getOnlineFriend () {
      if (!this.friends) {
        this.api.api.getFriend().then(friends => {
          this.friends = friends
        })
      }
    },
    refreshFriendList () {
      this.api.api.getFriend().then(friends => {
        this.friends = friends
      }).catch(err => {
        console.error(err)
        this.$router.push({name: 'login-page'})
      })
    },
    open (link) {
      this.$electron.shell.openExternal('vrchat://launch?id=' + link)
    }
  }
}
</script>

<style scoped>
.title {
  color: #888;
  font-size: 18px;
  font-weight: initial;
  letter-spacing: 0.25px;
  margin-top: 10px;
}

.items {
  margin-top: 8px;
}

.item {
  display: flex;
  margin-bottom: 6px;
}

.item .name {
  color: #6a6a6a;
  margin-right: 6px;
}

.item .value {
  color: #35495e;
  font-weight: bold;
}

.world-name {
  text-overflow: ellipsis;
  overflow: hidden; 
  white-space: nowrap;
  width: 160px; 
}

.list {
  list-style-type: none;
  height: 400px;
  width: 580px;
  overflow-y: auto;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.list-enter-active {
  transition: all 0.3s ease;
}
.list-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.list-enter, .list-leave-to
  /* .list-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
