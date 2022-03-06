<template>
  <div>

    <div>

      <v-row>
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
                <v-btn>
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


    </div>

  </div>
</template>

<script>
import Moralis from 'moralis';

export default {
  data(){
    return {
      workers: []
    }
  },
  methods:{
    async get_all_workers () {
      const workers = await Moralis.Cloud.run("get_workers");
      return this.workers = workers;
    }
  },

  mounted(){
    this.get_all_workers();
  }

}

</script>
