<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import firebase from 'firebase/app'
export default {
  // created(){
  //    firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       this.setLoginUser(user)
  //     }
  //   })
  // },
  // methods: {
  //   setLoginUser(user){
  //     this.$store.dispatch('setLoginUser',user)
  //   }
  // }
}
</script>

<style>
  #app{
    text-align: center;
  }
</style>
