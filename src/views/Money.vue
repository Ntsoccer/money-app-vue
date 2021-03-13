<template>
  <div>
    <div class="head">
      <p>{{ username }}さんようこそ！</p>
      <p>残高:{{ money }}</p>
      <button @click="signOut">ログアウト</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>ユーザ名</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user,index) in getUsers" :key="user" @click="selectUsername(user); setIndex(index)">
          <template>
          <td>{{ user }}</td>    
          <td>
            <button @click="isShow = !isShow;">walletを見る</button>        
          </td>
          <td>
            <button @click="display()">送る</button>
          </td>
          </template>
        </tr>
      </tbody>
    </table>
    <div class = "has-money" v-show = "isShow">
      <p>{{ usernames }}さんの残高</p>
      <p>{{getMoney[index]}}</p>
      <button @click="isShow = !isShow">close</button>
    </div>
    <div class="give-money" v-show = "isDisplay">
      <p>あなたの残高:{{ money }}</p>
      <p>送る金額</p>
      <input type="text" v-model="sentMoney">
      <br>
      <button @click="display(); updateMoney();">送信</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
  data() {
    return {
      username: firebase.auth().currentUser.displayName,
      isShow: false,
      isDisplay: false,
      sentMoney: '',
      usernames: '',
      index:''
    }
  },
  methods: {
    signOut() {
     this.$store.dispatch('signOut')
    },
    updateMoney() {
      this.$store.dispatch('getMoney', {sentMoney: Number(this.sentMoney), index: this.index})
    },
    display() {
      this.isDisplay = !this.isDisplay
    },
    selectUsername(user) {
      return this.usernames = user
    },
    setIndex(i){
      return this.index = i
    }
  },
  computed: {
    money() {
      return this.$store.getters.money
    },
    getUsers() {
      return this.$store.getters.usernames
    },
    getMoney() {
      return this.$store.getters.balanceMoney
    }
  },
  created() {
      const user = firebase.auth().currentUser
      this.$store.dispatch('setUid', user.uid)
      this.$store.dispatch('setMoney', user.uid)
      this.$store.dispatch('setUsername', user.uid)
      this.$store.dispatch('setBalanceMoney', user.uid)
    },
  mounted() {
  },
}
</script>

<style scoped>
  .head{
    display: flex;
    justify-content: space-between;
  }
  .has-money{
    text-align: center;
  }
</style>