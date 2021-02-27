<template>
  <div>
    <div class="head">
      <p>{{ username }}さんようこそ！</p>
      <p>残高:</p>
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
        <tr>
          <td></td>
          <td>
            <button @click="isShow = !isShow">walletを見る</button>        
          </td>
          <td>
            <button @click="isDisplay = !isDisplay">送る</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="has-money" v-show="isShow">
      <p>さんの残高</p>
      <p>1000</p>
      <button @click="isShow = !isShow">close</button>
    </div>
    <div class="give-money" v-show="isDisplay">
      <p>あなたの残高</p>
      <p>送る金額</p>
      <input type="text">
      <br>
      <button @click="isDisplay = !isDisplay">送信</button>
    </div>
  </div>
</template>

<script>
import firebase from '../firebase'
export default {
  data() {
    return {
      username: firebase.auth().currentUser.displayName,
      isShow: false,
      isDisplay: false,
    }
  },
  methods: {
    signOut() {
     this.$store.dispatch('signOut')
     .then(() => {
       this.$router.push('/')
     })
    }
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