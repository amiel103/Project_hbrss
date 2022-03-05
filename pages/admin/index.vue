<template>
<!-- admin stuffs -->
    <div>
        <form>
            <h1>create a paking worker</h1>
            <v-text-field
                v-model="email"
                label="E-mail"
            ></v-text-field>

            <v-text-field
                v-model="username"
                label="username"
            ></v-text-field>


            <v-text-field
                v-model="fullname"
                label="fullname"
            ></v-text-field>

            <v-combobox
                v-model="expertise"
                multiple
                :items="items"
                outlined
            ></v-combobox>


            <v-text-field
                v-model="password"
                label="password"
            ></v-text-field>

            <v-text-field
                v-model="re_password"
                label="confirm password"
            ></v-text-field>


            <v-btn @click="this.sign_up">
                sign up
            </v-btn>
    </form>


    </div>
</template>

<script>
    import Moralis from 'moralis';
    export default {
        data() {
            return {
                fullname:'',
                username:'',
                email:'',
                expertise:'',
                password:'',
                re_password:'',
                items: [
                'PLUMBER',
                'COMPUTER TECHNICIAN',
                'PAINTER',
                'MECHANIC',
                'ELECTRICIAN',
                'CARPENTER'
                ]
            }
        },

        methods:{

            async sign_up(){

                if(this.password != this.re_password){
                    alert(" PASSWORD NOT THE SAME ");
                    return
                }
                
                const user = new Moralis.User();
                user.set("username", this.username);
                user.set("password", this.password);
                user.set("fullname", this.fullname);
                user.set("email", this.email);
                user.set("description", this.expertise);
                user.set("role", 'worker');

                
                
                try {
                    await user.signUp();
                    alert("worker creation success");
                } catch (error) {
                    // Show the error message somewhere and let the user try again.
                    alert("Error: " + error.code + " " + error.message);
                }

            }


        }





    }
</script>

<style lang="scss" scoped>

</style>