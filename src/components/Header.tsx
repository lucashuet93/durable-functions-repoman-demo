import { initializeIcons } from '@uifabric/icons';
import * as React from 'react';

initializeIcons();

class Header extends React.Component {
  public render() {
    return (
      <div className='ms-Grid-row ms-bgColor-themeDark header'>
        {/* Mobile */}
        <div className="ms-Grid-col ms-sm2 ms-hiddenMdUp"><img width={30} src={require('../assets/images/functionsLogo.svg')} /></div>
        <div className="ms-Grid-col ms-sm10 ms-hiddenMdUp header-text"><span className='ms-font-xl ms-fontColor-white'>Durable Functions Demo</span></div>
        {/* Desktop */}
        <div className="ms-Grid-col ms-hiddenSm ms-md1"><img width={70} src={require('../assets/images/functionsLogo.svg')} /></div>
        <div className="ms-Grid-col ms-hiddenSm ms-md11 header-text"><span className='ms-font-su ms-fontColor-white'>Durable Functions Demo</span></div>
      </div>
    );
  }
}

export default Header;
