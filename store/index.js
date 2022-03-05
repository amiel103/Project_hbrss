export const strict = false;
import Moralis from 'moralis';
import _ from 'lodash';

export const state = () => ({
    user:[],
})


export const mutations = {
    authorize_loggin(state,user){
        return state.user = user;
    },
}

export const actions = {
    loggedin({commit}){
        const currentUser =  Moralis.User.current();
        if (currentUser) {
           commit('authorize_loggin', currentUser);
        }else{
            commit('authorize_loggin', []);
        }
    },
}