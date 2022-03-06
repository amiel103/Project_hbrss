<template>
    <div>
            <v-responsive    
                class="overflow-y-hidden fill-height"
                height="650"
            >
                <v-card
                  outlined
                  class="d-flex flex-column fill-height card"
                >
                  <v-card-title>

                    <v-spacer></v-spacer>

                    <v-btn
                    icon
                    >
                      <v-icon>
                        mdi-dots-vertical
                      </v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-divider/>

                  <v-card-text class="flex-grow-1 overflow-y-auto" v-if="messages.length != 0 && initLoad">


                    <template v-for="(msg, i) in messages">
                      <div
                        :class="{ 'd-flex flex-row-reverse': msg.attributes.sender.id == you.id }"
                        :key="i"
                      >
                        <v-menu 
                        max-width="100px"
                        content-class="elevation-1"
                        :close-on-content-click="false"
                        :nudge-width="100"
                        offset-a>
                          <template v-slot:activator="{ on, attrs }">

                              <v-avatar
                                  size="30"
                                  class="ma-2"
                                  color="primary"
                              >
                                  <h5></h5>
                              </v-avatar>

                              <v-chip
                                v-bind="attrs"
                                v-on="on"
                                :color="msg.attributes.sender.id == you.id ? 'primary' : ''"
                                dark
                                style="height:auto;white-space: pre"
                                class="pa-4 mb-2"
                                small
                              >
                                <v-tooltip bottom>
                                  <template v-slot:activator="{ on, attrs }">
                                    <span 
                                    v-bind="attrs"
                                    v-on="on">{{ msg.attributes.message }}</span>
                                </template>
                                  <span>{{ msg.attributes.createdAt | timeAgo }}</span>
                                </v-tooltip>
                              </v-chip>
                            
                          </template>
                          <v-list rounded>
                            <v-list-item @click="copyToClipBoard(msg.attributes.message)">
                              <v-list-item-title>Copy</v-list-item-title>
                            </v-list-item>
                            
                            <v-list-item @click="deleteMessage(msg)">
                              <v-list-item-title>Delete</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </div>
                    </template>

                  </v-card-text>

                  <v-card-text class="flex-grow-1 overflow-y-auto text-center" v-else-if="messages.length == 0 && initLoad">
                    <h4 class="centered overline">Start a convo <sup><v-icon>mdi-emoticon-outline</v-icon></sup></h4>
                  </v-card-text>

                  <v-card-text class="flex-grow-1 overflow-y-auto text-center" v-else>
                    <div class="centered">
                      <v-progress-circular
                        :size="50"
                        color="primary"
                        indeterminate
                      ></v-progress-circular>
                    </div>
                  </v-card-text>

                  <v-card-actions class="flex-shrink-1 container">
                      <v-textarea
                      rounded
                      clearable
                      auto-grow
                      rows="1"
                      row-height="15"
                      v-model="message"
                      label="Compose Message"
                      type="text"
                      no-details
                      filled
                      append-outer-icon="mdi-send"
                      @keyup.enter="sendMessage()"
                      @click:append-outer="sendMessage()"
                      hide-details
                    />
                  </v-card-actions>
                </v-card>
            </v-responsive>
    </div>
</template>

<script>
import Moralis from 'moralis';
import moment from 'moment';
import _ from 'lodash';
export default {
    data: () => ({
        message: null,
        messages:[],
        you: [],
        initLoad: false
    }),
    filters:{
        timeAgo : function (time){
        return moment(time).fromNow()
        }
    },

    methods:{
        copyToClipBoard : function (str){
            navigator.clipboard.writeText(str).then(function() {
                console.log('Async: Copying to clipboard was successful!');
            }, function(err) {
                console.error('Async: Could not copy text: ', err);
            });
        },
        async deleteMessage (msg) {
            const Message = Moralis.Object.extend("ChatsMessage")
            const deleteMsg = new Message();
            
            deleteMsg.unset(msg);
            await deleteMsg.destroy();

            const deleted = _.indexOf(this.messages, msg);
            this.$delete(this.messages,deleted)
        },
        
        async sendMessage () {
            const Message = Moralis.Object.extend("ChatsMessage")
            const createMessage = new Message();
            createMessage.set('roomID', this.$route.params.id);
            createMessage.set('sender', Moralis.User.current())
            createMessage.set('message', this.message)
            createMessage.save();
            this.message = null
        },

        async getMessages (){
            let query = new Moralis.Query('ChatsMessage');
            query.equalTo("roomID", this.$route.params.id);
            const Results = await query.find();
            this.messages = Results;
            this.you = Moralis.User.current()
            this.initLoad = true;
            console.log(this.messages)
        },

        async initSocket() {
            let query = new Moralis.Query('ChatsMessage');
            let subscription = await query.subscribe();
            subscription.on('create', (object) => {
                if(object.get("roomID") == this.$route.params.id){
                    this.messages.push(object)
                }
            })
        }
    },

    mounted(){
        this.getMessages();
        this.initSocket();
    }
}
</script>