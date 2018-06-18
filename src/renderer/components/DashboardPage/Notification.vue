<template>
  <div>
    {{getNotification()}}
    <h4 style="margin-top: 10px;">
      Notification
    <button type="button" class="btn btn-default btn-info" aria-label="Left Align" @click="refreshNotification()">
      <span class="glyphicon glyphicon-refresh" aria-hidden="true">refresh</span>
    </button>
    </h4>
    
    <transition-group name="list" tag="ul" class="list" >
      <li v-for="(notification,i) in notifications" v-bind:key="i">
        <div class="media">
          <img class="mr-3 border border-dark" :src=notification.senderInfo.currentAvatarThumbnailImageUrl style='width:120px; height:80px'>
          <div class="media-body"> 
            <div class="row" style="margin-left: 0px; margin-right: 0px;">
              <div class="col-6"  style="padding-left: 0px;">
                <h5 class="mt-0">{{notification.senderInfo.displayName}}</h5>
                {{new Date(notification.created_at).toLocaleString()}}
              </div>
              <span class="col align-self-center text-right"><br>
                <b-button-group>
                  <b-button variant="success" @click="acceptFriendRequest(notification.id)">
                    Accept
                  </b-button>
                  <b-button variant="warning">
                    Ignore
                  </b-button>
                </b-button-group>
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
  name: 'notification-manage',
  props: {
    api: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      notifications: null
    }
  },
  methods: {
    getNotification () {
      if (!this.notifications) {
        this.api.api.getFriendRequestNotifications().then(notifications => {
          this.notifications = notifications
        })
      }
    },
    acceptFriendRequest (notificationId) {
      this.api.api.acceptFriendRequest(notificationId).then(result => {
        this.deleteNotification(notificationId)
        console.log('Accept friend success')
      })
    },
    deleteNotification (notificationId) {
      this.notifications.splice(this.notifications.findIndex(notification => notification.id === notificationId), 1)
    },
    refreshNotification () {
      this.api.api.getFriendRequestNotifications().then(notifications => {
        this.notifications = notifications
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
