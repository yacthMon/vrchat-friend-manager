<template>
  <div>
    {{getAllFriend()}}
    <b-modal ref="unfriendConfirmModal" title="Confirm unfriend" ok-title="Sure" @ok="confirmUnfriend" >
      Are you sure you want to unfriend.
    </b-modal>
    <div class="form-group row">
      <div class="col-sm-5">
        <h4 style="margin-top: 10px;">
          Friend list <span class="badge badge-secondary">{{this.friends ? this.friends.length : 0 }}</span>
        <button type="button" class="btn btn-default btn-info" aria-label="Left Align" @click="refreshFriendList()">
          <span class="glyphicon glyphicon-refresh" aria-hidden="true">refresh</span>
        </button>
        </h4>
      </div>
      <div class="col-sm-7" style="margin-top: 10px;">
        <input v-model="search" class="form-control" type="text" placeholder="Search">
      </div>
      
    </div>
    <transition-group name="list" tag="ul" class="list" >
      <li v-for="(friend,i) in filteredFriend" v-bind:key="i">
        <div class="media">
          <img class="mr-3 border border-dark" :src=friend.currentAvatarThumbnailImageUrl style='width:120px; height:80px'>
          <div class="media-body"> 
            <div class="row" style="margin-left: 0px; margin-right: 0px;">
              <div class="col-6"  style="padding-left: 0px;">
                <h5 class="mt-0">{{friend.displayName}}</h5>
              </div>
              <span class="col align-self-center text-right">
                <button type="button" class="btn btn-danger" @click='showConfirmUnfriend(friend.id)'>
                  Delete
                </button>
              </span>
            </div>
          </div>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'friend-manage',
  props: {
    api: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      friends: null,
      search: '',
      friendIdToUnfriend: null
    }
  },
  computed: {
    filteredFriend () {
      return this.friends.filter(friend => {
        return friend.displayName.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      })
    }
  },
  methods: {
    getAllFriend () {
      if (!this.friends) {
        this.api.api.getAllFriend().then(friends => {
          this.friends = friends
        })
      }
    },
    unfriend (friendId) {
      this.api.api.unfriend(friendId).then(result => {
        console.log('unfriend succesful')
        this.friends.splice(this.friends.findIndex(friend => friend.id === friendId), 1)
      })
    },
    confirmUnfriend (evt) {
      this.unfriend(this.friendIdToUnfriend)
      this.friendIdToUnfriend = null
    },
    showConfirmUnfriend (friendId) {
      this.$refs.unfriendConfirmModal.show()
      this.friendIdToUnfriend = friendId
    },
    refreshFriendList () {
      this.api.api.getAllFriend().then(friends => {
        this.friends = friends
      })
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
