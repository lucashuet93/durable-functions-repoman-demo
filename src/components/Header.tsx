import * as React from 'react';

class Header extends React.Component {
  public render() {
    return (
      <div className='ms-Grid-row'>
        <div className="ms-Grid-col ms-sm1 ms-md1">Logo</div>
        <div className="ms-Grid-col ms-sm4 ms-md4"> <span className='ms-font-su'>Durable Functions Demo</span></div>
      </div>
    );
  }
}

export default Header;
