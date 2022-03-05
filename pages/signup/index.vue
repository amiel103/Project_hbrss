<template>
  <!-- sign up -->
  <div>
    <form>
      <v-text-field
        v-model="name"
        label="Name"
      ></v-text-field>

      <v-text-field
        v-model="email"
        label="E-mail"
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="password"
      ></v-text-field>

      <v-text-field
        v-model="re_password"
        label="confirm password"
      ></v-text-field>
      
      <v-btn
        class="mr-4"
      >
        submit
      </v-btn>

      <v-btn
        @click="signup()">
        sign up
      </v-btn>
    </form>
  </div>
</template>

<script>
import Moralis from 'moralis';
export default {

  layout: 'plain',
  
  methods:{

    data(){
        return {
            name:'',
            email:'',
            password:'',
            re_password:''
        }

    },

    async signup(){
      // const user = new Moralis.User();
      // user.set("username", "my name");

      if(this.password != this.re_password){
          alert(" PASSWORD NOT THE SAME ");
          return
      }

      const user = new Moralis.User();
      user.set("username", this.name);
      user.set("password", this.password);
      user.set("email", this.email);

      // other fields can be set just like with Moralis.Object
      
      try {
        await user.signUp();
        // Hooray! Let them use the app now.
      } catch (error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }

      // console.log(this.name)
      // console.log(this.email)
      // console.log(this.password)
      // console.log(this.re_password)

    }


  }
}
</script>
