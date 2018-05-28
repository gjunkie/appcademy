import App from '../containers/app/App'
//import LoginContainer from '../containers/login'
import ConnectedContainer from '../containers/exampleContainer';

//import { requireAuth } from './RoutingUtils'

const PageRoutes = {                                       
  path: '/',
  component: App,
  childRoutes: [
    //{
      //path: 'login',
      //component: LoginContainer,
      //childRoutes: [
        //{
          //path: 'gmail'
        //}
      //]
    //},
    {
      path: 'example',
      component: ConnectedContainer
    },
  ]
}

export default PageRoutes
