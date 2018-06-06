<template>
  <div>
    {{getOnlineFriend()}}
    <h4>Online Friend <span class="badge badge-secondary">{{this.friends ? this.friends.length : 0 }}</span> 
    <button type="button" class="btn btn-default btn-info" aria-label="Left Align" @click="refreshFriendList()">
      <span class="glyphicon glyphicon-refresh" aria-hidden="true">refresh</span>
    </button></h4>
    <!-- <ol id="friendlist" style="list-style-type: none;height:400px; width:500px; overflow-y: auto;"> -->
    <transition-group name="list" tag="ul" class="list" >
      <li v-for="(friend,i) in friends" v-bind:key="i">
        <div class="media">
          <img class="mr-3 border border-dark" :src=friend.currentAvatarImageUrl style='width:120px; height:80px'>
          <div class="media-body">
            <h5 class="mt-0">{{friend.displayName}}</h5>
            In world : {{friend.worldName}}
          </div>
        </div>
      </li>
    </transition-group>
    <!-- </ol> -->
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

.list {
  list-style-type: none;
  height: 400px;
  width: 500px;
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
