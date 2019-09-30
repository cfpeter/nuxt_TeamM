export default {
    loggedIn: state => {
        return () => {
            return state.token != null;
        } 
            
    },
    
    userTokenInfo: state => { 
        return () => {
            if(state.token)
                return jwt.verify(state.token, 'wellThisShouldBeStrongKeyForToken');
        }
    }
}
  

