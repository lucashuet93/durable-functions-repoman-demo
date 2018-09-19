import { initializeIcons } from '@uifabric/icons';
import * as React from 'react';

initializeIcons();

class Header extends React.Component {
  public render() {
    return (
      <div className='ms-Grid-row ms-bgColor-themeDark header'>
        <div className="ms-Grid-col ms-sm1 ms-md1"><img width={70} src={require('../assets/images/functionsLogo.svg')} /></div>
        <div className="ms-Grid-col ms-sm11 ms-md11 header-text"><span className='ms-font-su ms-fontColor-white'>Durable Functions Demo</span></div>
      </div>
    );
  }
}

export default Header;
