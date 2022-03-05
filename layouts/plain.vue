<template>

    <v-app dark>
        <v-main>
            <v-container>
                <Nuxt />
            </v-container>
        </v-main>
    </v-app>

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