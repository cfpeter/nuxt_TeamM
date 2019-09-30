export default {
    setToken: (state, token) =>{
        state.token = token; 
        localStorage.setItem('access_token' , token); 
    },

    logout: () => { 
        localStorage.removeItem('access_token'); 
        location.reload()
    } 
}
 