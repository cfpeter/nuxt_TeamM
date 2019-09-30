export default function ({ store, redirect }) {
    if (!store.state.auth.login) { 
        return redirect('/auth/login')  
    }
  }
  