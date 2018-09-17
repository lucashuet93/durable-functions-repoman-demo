import * as React from 'react';


interface ISubmitPaymentState {
  instanceSent: boolean
}

class SubmitPayment extends React.Component<any, ISubmitPaymentState> {

  public state: ISubmitPaymentState = {
    instanceSent: false
  }

  constructor(p: any) {
    super(p);
  }

  public componentWillMount() {
    const instanceId: string = this.props.match.params.instanceId;
    setTimeout(() => {
      console.log(`Prepared to send instanceId - ${instanceId} to the queue/function endpoint`);
      this.setState({
        instanceSent: true
      })
    }, 4000)
  }

  public render() {
    return (
      <div className='ms-Grid-row submit-payment-container'>
        {this.state.instanceSent === true ?
          <div className='ms-Grid-col ms-sm12 ms-md12'>
            <div className='ms-Grid-row submit-payment-container'>
              <div className='ms-Grid-col ms-sm12 ms-md12 submit-payment-text'>
                <span className='ms-font-su ms-fontColor-neutralPrimary'>Payment Submitted</span>
              </div>
            </div>
            <div className='ms-Grid-row submit-payment-container'>
              <div className='ms-Grid-col ms-sm12 ms-md12'>
                <img src={require('../assets/images/success.png')} />
              </div>
            </div>
          </div>
          : null}
      </div>
    );
  }
}

export default SubmitPayment;
