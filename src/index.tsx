import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Routes from './routing/Routes';

ReactDOM.render(
  <Fabric>
    <Routes />
  </Fabric>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
