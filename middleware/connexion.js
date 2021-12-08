export default function ({app, route, redirect}){
    if (route.path !== '/Login') {
      
      if(!app.user) {
      
        return redirect('/Login')
      }
    } else{
        return redirect('/')
      }
    
  }
  