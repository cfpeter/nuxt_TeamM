<template> 
        <v-layout align-center justify-center >
          <v-flex xs12 sm7 md7 >
            <v-card class="elevation-12">
              <v-toolbar color="dark" dark  >
                <v-toolbar-title>Login Form</v-toolbar-title>
                <v-spacer></v-spacer> 
              </v-toolbar>

              <v-card-text>
                 <v-alert 
                  v-model="errorShow"
                  border="top"
                  color="red lighten-2"
                  dark
                 type="error">
                  {{errorMessage}}
              </v-alert>

                <ValidationObserver v-slot="{ invalid }" ref="loginForm">
                <v-form ref="form">  
                
                      <ValidationProvider name='User Name' rules="required" v-slot="{ errors }">  
                        <v-flex>
                          <v-text-field  
                            v-model="userName" 
                            label="User Name"   
                          ></v-text-field> 
                        </v-flex>
                        <span>{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider name='Password' rules="required" v-slot="{ errors }">  
                        <v-flex>
                          <v-text-field  
                            v-model="password" 
                            label="Password"  
                            :counter="100"  
                          ></v-text-field> 
                        </v-flex>
                        <span>{{ errors[0] }}</span>
                    </ValidationProvider>  
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :disabled="invalid" @click.prevent="LoginBtn" color="info">Login  </v-btn>
                      </v-card-actions>
                </v-form>
              </ValidationObserver>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout> 
</template>

<script>
import {mapActions} from 'vuex';
import { ValidationProvider , ValidationObserver} from "vee-validate";
  export default {  
    components: {
    ValidationProvider,
    ValidationObserver
  },
    data: () => ({
      errorShow: false,
      errorMessage: '',
      valid: false, 
      value: '',
      userName: '', 
      password: '', 

    }), 
    computed: {  
    },
    methods: {  
      async LoginBtn() {
        
        this.$store.dispatch('auth/testAction', this.userName)
        
        if(await this.$refs.loginForm.validate()){ 
          
          const data = {
            userName: this.userName,
            password: this.password
          };

          this.$store.dispatch('auth/login', data)  
          .then( () => { 
              this.$router.push('dashboard')
          })
          .catch(err => {  
            this.errorShow = true;
            if(err.response && err.response.status == 400 ){
              this.errorMessage = err.response.data; 
            }else{
              this.errorMessage = 'Please refresh the page and try again!'
            } 
          })
        } 
      }
     
       
    }
  }
</script>

<style>

</style>
