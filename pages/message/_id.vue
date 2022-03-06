<template>
    <div class="centerscreen">
        <v-progress-circular
            indeterminate
            color="primary"
        ></v-progress-circular>
    </div>    
</template>


<script>

import Moralis from 'moralis';

export default {
    data(){
        return {
            
        }
    },

    methods:{
        async initialize (){

            const ChatRoom = Moralis.Object.extend("ChatRoom");
            const Chat = new ChatRoom();


            const isCreator = new Moralis.Query(ChatRoom);
            isCreator.equalTo("roominvited",this.$route.params.id);
            isCreator.equalTo("roomcreator",Moralis.User.current().id);

            const isInvited = new Moralis.Query(ChatRoom);
            isInvited.equalTo("roominvited",Moralis.User.current().id);
            isInvited.equalTo("roomcreator",this.$route.params.id);

            

            const mainQuery = Moralis.Query.or(isCreator, isInvited);
            const exist = await mainQuery.first();
            

            console.log(exist.id);

            if(exist == undefined){
                Chat.save({
                    roomcreator: Moralis.User.current().id,
                    roominvited: this.$route.params.id
                })
                .then((room) => {
                    return this.$router.push('/chatroom/'+ room.id);
                }, (error) => {
                    alert(error.message)
                });
            }

            return this.$router.push('/chatroom/'+ exist.id);
            
            
        }
    },

    mounted(){
        this.initialize();
    }
}

</script>

<style>

.centerscreen {
  position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -50px;
    width: 100px;
    height: 100px;
}

</style>