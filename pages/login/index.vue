<template>
  <!-- log in  -->
  <div>
    <v-card class='pa-5'>
      <h2>Home Based Repair System</h2>
      <form>
        <v-text-field
          v-model="email"
          label="E-mail"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="password"
          type="password"
        ></v-text-field>

        <div class="d-flex justify-center">
          <v-btn
            class="mr-4"
            @click="login()"
          >
            Login
          </v-btn>

          <v-btn to='/signup'>
            sign up
          </v-btn>


        </div>
        
      </form>



    </v-card>
    
  </div>
</template>

<script>

import Moralis from 'moralis';
import { mapMutations } from 'vuex';

export default {

  layout: 'plain',

  data() {
    return {
      email: '',
      password: ''
    }
  },

  methods:{

    ...mapMutations(['authorize_loggin']),

    async login() {
      try{
      const user = await Moralis.User.logIn(this.email, this.password, { usePost: true });
        
        if(user){
          this.$store.commit('authorize_loggin', user)
          this.$router.push('/');
        }


      }catch(error){
        alert(error.message)
      }

    }
  }
}
</script>
