<template>
  <!-- eslint-disable no-trailing-spaces -->
  <!-- / eslint-disable no-trailing-spaces */ -->
  <div>

    <h1>
      my site hello
    </h1>
  </div>

</template>

<script>
import Moralis from 'moralis';
export default {
  name: 'IndexPage'
  ,
  methods:{
    async get_user(){
      Moralis.User.currentAsync().then(function(user) {
          console.log("-----logged in-----");
          return ;
      });
      this.$router.push('/log_in');


    }
  },
  mounted(){
    this.get_user()
  }

}
</script>
