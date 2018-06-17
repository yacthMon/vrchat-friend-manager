<template>
  <div>
    <b-modal ref="sentFriendModalSuccess" title="Add friend result" ok-only>
      Friend request sent.
    </b-modal>
    <b-modal ref="sentFriendModalFail" title="Add friend result" ok-only>
      This user already be your friend, or you already sent friend request.
    </b-modal>
     <b-input-group style="margin-top: 10px; margin-bottom: 10px">
        <b-form-input v-model="searchQuery" type="text"></b-form-input>
        <b-input-group-append>
          <b-btn variant="info" @click='searchUser()'>Search</b-btn>
        </b-input-group-append>
      </b-input-group>
    <transition-group name="list" tag="ul" class="list" >
      <li v-for="(user,i) in searchResult" v-bind:key="i">
        <div class="media">
          <img class="mr-3 border border-dark" :src=user.currentAvatarThumbnailImageUrl style='width:120px; height:80px'>
          <div class="media-body"> 
            <div class="row" style="margin-left: 0px; margin-right: 0px;">
              <div class="col-6"  style="padding-left: 0px;">
                <h5 class="mt-0">{{user.displayName}}</h5>
              </div>
              <span class="col align-self-center text-right">
                <b-button type="button" class="btn btn-success" data-toggle="tooltip" @click='sendFriendRequest(user.id)'>
                  Send friend request
                </b-button>
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
  name: 'add-friend',
  props: {
    api: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      searchResult: null,
      searchQuery: ''
    }
  },
  methods: {
    sendFriendRequest (friendId) {
      this.api.api.sendFriendRequest(friendId).then(result => {
        console.log('send friend request succesful')
        this.$refs.sentFriendModalSuccess.show()
      }, err => {
        if (err) {
          console.log('something went wrong')
        }
        this.$refs.sentFriendModalFail.show()
      })
    },
    searchUser () {
      this.searchResult = null
      this.api.api.findUsers(this.searchQuery).then(result => {
        this.searchResult = result
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
