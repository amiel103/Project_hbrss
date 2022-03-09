<template>
  <div>

    <div v-if="user_type=='user'">

      <v-tabs class='d-flex justify-center'
        v-model="active">
        <v-tab>WORKERS</v-tab>
        <v-tab>MY APPOINTMENT</v-tab>
      </v-tabs>


      <v-row v-if="active==0">
        <v-col 
        v-for="(item,key) in workers" 
        :key="key"
        col="12"
        lg="4"
        >
            <v-card>
              <div class="d-flex justify-center pa-5">
                <v-avatar size="80" color="primary">
                  <span class="white--text text-h5">CJ</span>
                </v-avatar>
              </div>

              <h3 class="text-center">{{item.get('fullname')}}</h3>
              
              <v-card-text>
                <div>
                  <v-slide-group
                    multiple
                    show-arrows
                  >
                    <v-slide-item
                      v-for="(expertise, key) in item.get('description')"
                      :key="key"
                      v-slot="{ active, toggle }"
                    >
                      <v-btn
                        class="mx-2"
                        :input-value="active"
                        active-class="purple white--text"
                        depressed
                        rounded
                        @click="toggle"
                      >
                        {{ expertise }}
                      </v-btn>
                    </v-slide-item>
                  </v-slide-group>
                </div>
              </v-card-text>

              <v-card-actions>
                <v-btn @click="add_appointment(item)">
                  Make Appointment
                </v-btn>
                <v-spacer/>
                <v-btn
                  :to="'/message/'+item.id"
                >
                  Message
                </v-btn>
              </v-card-actions>

            </v-card>
        </v-col>
      </v-row>

      <div v-if="active==1">

        <h1>My Appointments</h1>
        

        <template>

        <v-data-table
          :headers="headers"
          :items="appointments"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.status="{ item }">
            {{ change_stat( item.get('approved') ) }}
        
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>

            <v-icon
              small
              @click='message_worker(item)'
            >
              
              mdi-message-text
            </v-icon>

          </template>
          
        </v-data-table>

        
        </template>


      </div>

    </div>

    <div v-if="user_type=='worker'">

        <h1>welcome worker</h1>

          <v-tabs class='d-flex justify-center'
            v-model="active">
            <v-tab>PENDING CLIENTS</v-tab>
            <v-tab>MY APPOINTMENTS</v-tab>
          </v-tabs>


          <div v-if="active==0">
            <v-data-table
              :headers="headers"
              :items="appointments"
              :items-per-page="5"
              class="elevation-1"
            >


              <template v-slot:item.status="{ item }">
                {{ change_stat( item.get('approved') ) }}
                    
              </template>

              <template v-slot:item.actions="{ item }">

                <v-icon
                  small
                  @click="accept_pending(item)"
                >
                  mdi-checkbox-marked-circle
                </v-icon>

  

                <v-icon
                  small
                  @click="deleteItem(item)"
                >
                  mdi-delete
                </v-icon>

                <v-icon
                  small
                  @click='message_client(item)'
                >
                  mdi-message-text
                </v-icon>

              </template>
          
            </v-data-table>
          </div>
        

    </div>

  </div>
</template>

<script>
import Moralis from 'moralis';

export default {
  data(){
    return {
      headers: [
        {
          text: 'id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'worker', value: 'attributes.worker.attributes.username' },
        { text: 'client', value: 'attributes.client.attributes.username' },
        { text: 'status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
        
      ],
      active:'',
      workers: [],
      appointments:[],
      user_type:''
    }
  },

   watch:{
      active : function (v){
          console.log(v);
      }
  },

  methods:{
    async fix_client( item ){
      

      const params = { id : item  }
      const client = await Moralis.Cloud.run("get_client",params);
      console.log(client['username'])
      return client.username

    },

    change_stat( value ){
      //console.log(value+"valueasdasd");
      let val="";
      if(value==true){
        val = "APPROVED"
        
      }else{
        val = "PENDING"
      }
      return val ;


    },

    async get_all_workers () {
     
      this.user_type = Moralis.User.current().get('role');

      let Appointments;
      let workers;
      if(this.user_type == "user"){
        workers = await Moralis.Cloud.run("get_workers");
        Appointments = await Moralis.Cloud.run("get_user_appointment");
      }

      if(this.user_type == "worker"){
        Appointments = await Moralis.Cloud.run("get_worker_appointment");
      }
      this.appointments = Appointments
      this.workers = workers;
    },
    async accept_pending(item){
      alert(item.id);
      const appoint = Moralis.Object.extend('appointments');
      const query = new Moralis.Query(appoint);

      //
      query.get(item.id)
      .then((appoint) => {
        appoint.set('approved',true)
        appoint.save()
      }, (error) => {
        alert(error.message)
      });


      
    },

    async deleteItem(item){
      //alert(item.id);

      try {
      //alert(0/0)
        const appoint = Moralis.Object.extend('appointments');
        const del_appoint = new appoint();
        del_appoint.unset(item)
        await del_appoint.destroy();
        alert('removed')

      } catch (error) {
        alert(error.message)
        
      }
      
    },

    async add_appointment(item){
      //alert(item.id);

      try {
        const appoint = Moralis.Object.extend('appointments');
        const new_appoint = new appoint();
        new_appoint.set('worker',item);
        new_appoint.set('client',Moralis.User.current());
        new_appoint.set('approved',false);
        await new_appoint.save()

      } catch (err) {
        alert(err.message);
      }
      
    },

    message_worker( item ){
      this.$router.push('/message/'+item.get('worker').id)
    },

    message_client( item ){
      this.$router.push('/message/'+item.get('client').id)
    }

  },

  mounted(){
    this.get_all_workers();
  }

}

</script>
