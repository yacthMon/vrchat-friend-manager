<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-4">
          <span class="title">
            Welcome to <br><br>
            <h2>VRChat</h2>
            <h3>Friend Manager</h3>
            v{{version}}
          </span>
        </div>

        <div class="col-4 ">
          <div class="doc">
            <div class="title">Login</div>
            <div>Username/Email<br>
            <input v-model="username" type="text"><br>
            Password :<br>
            <input v-model="password" type="password"><br>
            </div>
            <transition name="login-result">
              <span v-if="loginResult" class='login-result'>{{loginResult}}</span>
            </transition>
            <br>
            <button @click="login()">Login</button><br><br>
            
          </div>
        </div>
      </div>
    </div>
    <div style="text-align:center;right:0;left: 0; bottom: 0;position: absolute;">
      <system-information></system-information>
      <div>Author : <span  @click="open('https://github.com/yacthMon')">yacth_Mon @GitHub</span></div>
    </div>
  </div>
</template>

<script>
import API from '../api'
import { mapActions } from 'vuex'
import SystemInformation from './LandingPage/SystemInformation'
import pconfig from '../../../package.json'

export default {
  name: 'login-page',
  computed: {
    ...mapActions([
      'setAPI'
    ])
  },
  data: () => {
    return {
      version: pconfig.version,
      username: '',
      password: '',
      loginResult: ''
    }
  },
  components: { SystemInformation },
  methods: {
    login () {
      this.loginResult = ''
      let api = new API()
      api.login(this.username, this.password).then(
        () => {
          this.loginResult = api.userId
          // Redirect here and send api object
          this.$store.dispatch('setAPI', {api})
          this.$router.push({name: 'dashboard-page'})
        }).catch(err => {
        if (err) {
          console.log(err)
          if (err.response.status === 401) {
            this.loginResult = 'Authentication failed'
          } else {
            this.loginResult = 'Authentication failed'
          }
        }
      })
    },
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
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

main > div {
  flex-basis: 50%;
}

.left-side {
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
  font-size: 0.8em;
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

.login-result {
  color:red;
}

.login-result-enter-active, .login-result-leave-active {
  transition: all 1s;
}

.login-result-enter, .login-result-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
