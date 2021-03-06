import { initializeIcons } from '@uifabric/icons';
import * as React from 'react';

initializeIcons();

class Header extends React.Component<{}, {}> {
  public render() {
    return (
      <div className='ms-Grid-row ms-bgColor-themeDark header'>
        {/* Mobile */}
        <div className="ms-Grid-col ms-sm1 ms-hiddenMdUp"><img width={30} src={require('../assets/images/functionsLogo.svg')} /></div>
        <div className="ms-Grid-col ms-sm11 ms-hiddenMdUp header-text"><span className='ms-font-l ms-fontColor-white'>Durable Functions - Repo Man Demo</span></div>
        {/* Desktop - Medium */}
        <div className="ms-Grid-col ms-hiddenSm ms-md1 ms-hiddenLgUp"><img width={50} src={require('../assets/images/functionsLogo.svg')} /></div>
        <div className="ms-Grid-col ms-hiddenSm ms-md11 ms-hiddenLgUp header-text"><span className='ms-font-xl ms-fontColor-white'>Durable Functions - Repo Man Demo</span></div>
        {/* Desktop - Large */}
        <div className="ms-Grid-col ms-hiddenMdDown ms-lg1 ms-hiddenXlUp"><img width={60} src={require('../assets/images/functionsLogo.svg')} /></div>
        <div className="ms-Grid-col ms-hiddenMdDown ms-lg11 ms-hiddenXlUp header-text"><span className='ms-font-xxl ms-fontColor-white'>Durable Functions - Repo Man Demo</span></div>
        {/* Desktop - X Large */}
        <div className="ms-Grid-col ms-hiddenLgDown ms-xl1"><img width={70} src={require('../assets/images/functionsLogo.svg')} /></div>
        <div className="ms-Grid-col ms-hiddenLgDown ms-xl11 header-text"><span className='ms-font-su ms-fontColor-white'>Durable Functions - Repo Man Demo</span></div>
      </div>
    );
  }
}

export default Header;
