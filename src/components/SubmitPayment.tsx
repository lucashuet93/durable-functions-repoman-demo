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
    // pull the orchestrator instanceId from the routing parameters
    const instanceId: string = this.props.match.params.instanceId;
    // connect to the provided storage account
    const queueSvc: QueueService = createQueueService(process.env.REACT_APP_AZURE_STORAGE_CONNECTION_STRING as string);
    // ensure the queue exists so it can be properly written to
    queueSvc.createQueueIfNotExists(process.env.REACT_APP_AZURE_STORAGE_QUEUE_NAME as string, (error: any, results: any, response: any) => {
      if (!error) {
        // insert a message into the queue with the instanceId as the content
        queueSvc.createMessage(process.env.REACT_APP_AZURE_STORAGE_QUEUE_NAME as string, instanceId, (createError: any, createResults: any, createResponse: any) => {
          if (!createError) {
            // message inserted, set this.state.instanceSet to true in order to display the success message
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
        {/* the success message will display once the orchestrator instanceId has been sent to the queue */}
        {this.state.instanceSent === true ?
          <div className='ms-Grid-col ms-sm12 ms-md12'>
            <div className='ms-Grid-row submit-payment-container'>
              <div className='ms-Grid-col ms-sm12 ms-md12 submit-payment-header'>
                <span className='ms-font-su ms-fontColor-neutralPrimary'>Thank you for your payment!</span>
              </div>
            </div>
            <div className='ms-Grid-row submit-payment-container'>
              <div className='ms-Grid-col ms-sm12 ms-md12'>
                <i className="ms-Icon ms-Icon--Accept ms-fontColor-themeDark accept-icon" aria-hidden="true" />
              </div>
            </div>
            <div className='ms-Grid-row submit-payment-container'>
              <div className='ms-Grid-col ms-sm12 ms-md12 submit-payment-text'>
                <span className='ms-font-xl ms-fontColor-neutralPrimary'>You will no longer receive notifications regarding your prior balance.</span>
              </div>
            </div>
          </div>
          : null}
      </div>
    );
  }
}

export default SubmitPayment;
