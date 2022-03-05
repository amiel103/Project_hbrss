<template>
  <v-app dark>
    <v-app-bar
      dark
      :clipped-left="clipped"
      fixed
      app
      flat
      color="#272727"
    >
      
      <v-toolbar-title v-text="title" />
      
      <v-spacer />



      <div v-if="user.length != 0">
        <v-btn
        icon
        >
          <v-icon>
            mdi-bell-outline
          </v-icon>
        </v-btn>

        <v-btn
        icon
        >
          <v-icon>
            mdi-message-text-outline
          </v-icon>
        </v-btn>

        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
            text
            rounded
            style="text-transform:none"
            v-bind="attrs"
            v-on="on"
            >
              <v-icon class="mr-2">mdi-account</v-icon>
              {{user.get('username')}}
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/profile">
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout()">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <div v-else>
        <v-btn
        icon
        to="/login"
        >
          <v-icon>
            mdi-login
          </v-icon>
        </v-btn>
      </div>

    </v-app-bar>


    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>


    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

  </v-app>
</template>

<script>


import Moralis from 'moralis'
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Home Based Repair'
    }
  },

  methods:{
    ...mapActions(['loggedin']),
    async logout() {
      await Moralis.User.logOut();
      this.loggedin();
      this.$router.push('/login')
    }
  },

  computed: {
    ...mapState(['user'])
  },

  mounted(){
    this.loggedin();
    if(this.user.length == 0){
      this.$router.push('/login')
    }
  }
}
</script>
