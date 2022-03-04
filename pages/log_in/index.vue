<template>
  <!-- log in  -->
  <div>
    <form>
      <v-text-field
        v-model="email"
        label="E-mail"
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="password"
      ></v-text-field>

      
      <v-btn
        class="mr-4"
      >
        submit
      </v-btn>

      <v-btn
        to='/sign_up'>
        sign up
      </v-btn>
    </form>
  </div>
</template>

<script>
import Moralis from 'moralis';
export default {
  name: 'IndexPage'
}
</script>
