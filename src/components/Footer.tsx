import { initializeIcons } from '@uifabric/icons';
import * as React from 'react';

initializeIcons();

class Footer extends React.Component<{}, {}> {
  public render() {
    return (
      <div className='ms-Grid-row ms-bgColor-neutralLight footer'>
        {/* Mobile */}
        <div className="ms-Grid-col ms-sm8 ms-hiddenMdUp footer-left"><span className='ms-font-s'><a href='https://docs.microsoft.com/en-us/azure/azure-functions/durable-functions-overview'>Get Started with Durable Functions</a></span></div>
        <div className="ms-Grid-col ms-sm4 ms-hiddenMdUp footer-right"><span className='ms-font-s'><a href='https://github.com/lucashuet93'>Source Code</a></span></div>
        {/* Desktop */}
        <div className="ms-Grid-col ms-hiddenSm ms-md6 footer-left"><span className='ms-font-m-plus'><a href='https://docs.microsoft.com/en-us/azure/azure-functions/durable-functions-overview'>Get Started with Durable Functions</a></span></div>
        <div className="ms-Grid-col ms-hiddenSm ms-md6 footer-right"><span className='ms-font-m-plus'><a href='https://github.com/lucashuet93/durable-functions-repoman-demo'>Source Code</a></span></div>
      </div>
    );
  }
}

export default Footer;
