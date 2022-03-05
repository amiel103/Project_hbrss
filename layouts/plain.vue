<template>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

</template>

<script>
import Moralis from 'moralis';
import { mapActions, mapState } from 'vuex'
export default {
methods:{
    ...mapActions(['loggedin']),
  },

  computed: {
    ...mapState(['user'])
  },

  mounted(){
    this.loggedin();
    if(this.user.length != 0){
      this.$router.push('/')
    }
  }
}


</script>