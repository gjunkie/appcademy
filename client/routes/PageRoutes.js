import App from '../containers/app/App';
import ConnectedContainer from '../containers/exampleContainer';
//import AnotherContainer from '../containers/anotherExample';

//import { requireAuth } from './RoutingUtils'

const PageRoutes = {                                       
  path: '/',
  component: App,
  childRoutes: [
    {
      path: 'example',
      component: ConnectedContainer,
    },
    //{
      //path: 'another-example',
      //component: AnotherContainer,
    //}
  ]
};

export default PageRoutes;
