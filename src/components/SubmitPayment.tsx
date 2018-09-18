import { createQueueService, QueueService } from 'azure-storage';
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
    const queueSvc: QueueService = createQueueService(process.env.REACT_APP_AZURE_STORAGE_CONNECTION_STRING as string);
    queueSvc.createQueueIfNotExists(process.env.REACT_APP_AZURE_STORAGE_QUEUE_NAME as string, (error: any, results: any, response: any) => {
      if (!error) {
        // Queue created or exists
        queueSvc.createMessage(process.env.REACT_APP_AZURE_STORAGE_QUEUE_NAME as string, instanceId, (createError: any, createResults: any, createResponse: any) => {
          if (!createError) {
            // Message inserted
            console.log(`Sent instanceId - ${instanceId} to the queue`);
            this.setState({
              instanceSent: true
            })
          }
        });
      }
    });
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
