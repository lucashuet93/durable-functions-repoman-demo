import axios, { AxiosResponse } from 'axios';
import { DefaultButton, Dropdown, IDropdownOption, TextField } from 'office-ui-fabric-react';
import * as React from 'react';
import '../assets/styles/App.css';
import { isValidEmail, isValidNumber, isValidPhoneNumber } from '../utilities/validations';

enum ContactMethod {
  Phone = 'Phone',
  Email = 'Email'
}

interface INotificationFormState {
  amountOwed: string,
  amountOwedError: string | undefined,
  contactMethod: string,
  email: string,
  emailError: string | undefined,
  notificationInterval: string,
  notificationIntervalError: string | undefined,
  phoneNumber: string,
  phoneNumberError: string | undefined

}

class NotificationForm extends React.Component<any, INotificationFormState>{

  public state: INotificationFormState = {
    amountOwed: '0.00',
    amountOwedError: undefined,
    contactMethod: ContactMethod.Phone,
    email: '',
    emailError: undefined,
    notificationInterval: '60',
    notificationIntervalError: undefined,
    phoneNumber: '',
    phoneNumberError: undefined
  }

  constructor(p: any) {
    super(p);
    this.handleAmountOwedChanged = this.handleAmountOwedChanged.bind(this);
    this.handleIntervalChanged = this.handleIntervalChanged.bind(this);
    this.handleContactMethodChanged = this.handleContactMethodChanged.bind(this);
    this.handleEmailChanged = this.handleEmailChanged.bind(this);
    this.handlePhoneNumberChanged = this.handlePhoneNumberChanged.bind(this);
    this.handleButtonSubmit = this.handleButtonSubmit.bind(this);
  }

  public renderContact() {
    return (
      <div className='ms-Grid-row ms-font-m'>
        <div className="ms-Grid-col ms-sm12 ms-md12">
          <div className='ms-Grid-row'>
            <div className="ms-Grid-col ms-sm2 ms-md2" />
            <div className="ms-Grid-col ms-sm8 ms-md8">
              <Dropdown
                label="Contact Method"
                selectedKey={this.state.contactMethod}
                onChanged={this.handleContactMethodChanged}
                options={[
                  { key: ContactMethod.Phone, text: ContactMethod.Phone },
                  { key: ContactMethod.Email, text: ContactMethod.Email }
                ]}
              />
            </div>
            <div className="ms-Grid-col ms-sm2 ms-md2" />
          </div>
          {this.state.contactMethod === ContactMethod.Phone ?
            <div className='ms-Grid-row'>
              <div className="ms-Grid-col ms-sm2 ms-md2" />
              <div className="ms-Grid-col ms-sm8 ms-md8">
                <TextField
                  label="Phone #"
                  onChange={this.handlePhoneNumberChanged}
                  value={this.state.phoneNumber}
                  errorMessage={this.state.phoneNumberError}
                />
              </div>
              <div className="ms-Grid-col ms-sm2 ms-md2" />
            </div>
            :
            <div className='ms-Grid-row'>
              <div className="ms-Grid-col ms-sm2 ms-md2" />
              <div className="ms-Grid-col ms-sm8 ms-md8">
                <TextField
                  label="Email Address"
                  onChange={this.handleEmailChanged}
                  value={this.state.email}
                  errorMessage={this.state.emailError}
                />
              </div>
              <div className="ms-Grid-col ms-sm2 ms-md2" />
            </div>
          }
        </div>
      </div >
    )
  }

  public render() {
    return (
      <div className='ms-Grid-row ms-font-m'>
        <div className="ms-Grid-col ms-sm12 ms-md12">

          {/* Amount Owed */}
          <div className='ms-Grid-row'>
            <div className="ms-Grid-col ms-sm2 ms-md2" />
            <div className="ms-Grid-col ms-sm8 ms-md8">
              <TextField
                label="Amount Owed"
                suffix={'$'}
                onChange={this.handleAmountOwedChanged}
                value={this.state.amountOwed}
                errorMessage={this.state.amountOwedError}
              />
            </div>
            <div className="ms-Grid-col ms-sm2 ms-md2" />
          </div>

          {/* SMS Interval */}
          <div className='ms-Grid-row'>
            <div className="ms-Grid-col ms-sm2 ms-md2" />
            <div className="ms-Grid-col ms-sm8 ms-md8">
              <TextField
                label="Notification Interval"
                suffix={'seconds'}
                onChange={this.handleIntervalChanged}
                value={this.state.notificationInterval}
                errorMessage={this.state.notificationIntervalError}
              />
            </div>
            <div className="ms-Grid-col ms-sm2 ms-md2" />
          </div>

          {/* Contact */}
          {this.renderContact()}

          {/* Button */}
          <div className='ms-Grid-row go-button-container'>
            <div className="ms-Grid-col ms-sm12 ms-md12">
              <DefaultButton text='GO' onClick={this.handleButtonSubmit} />
            </div>
          </div>

        </div>
      </div>
    );
  }

  private handleAmountOwedChanged(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
    const errorMessage: string | undefined = !isValidNumber(value) ? `The value should be a number, actual is ${value}.` : undefined;
    return this.setState({
      amountOwed: value,
      amountOwedError: errorMessage
    });
  }

  private handleIntervalChanged(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
    const errorMessage: string | undefined = !isValidNumber(value) ? `The value should be a number, actual is ${value}.` : undefined;
    return this.setState({
      notificationInterval: value,
      notificationIntervalError: errorMessage
    });
  }

  private handleContactMethodChanged(item: IDropdownOption) {
    this.setState({ contactMethod: item.text });
  };

  private handleEmailChanged(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
    const errorMessage: string | undefined = !isValidEmail(value) ? `Invalid email.` : undefined;
    return this.setState({
      email: value,
      emailError: errorMessage
    });
  }

  private handlePhoneNumberChanged(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
    const errorMessage: string | undefined = !isValidPhoneNumber(value) ? `The value should use the format XXXXXXXXXX.` : undefined;
    return this.setState({
      phoneNumber: value,
      phoneNumberError: errorMessage
    });
  }

  private handleButtonSubmit() {
    if (!this.state.amountOwedError && !this.state.emailError && !this.state.phoneNumberError && !this.state.notificationIntervalError) {
      const body = {
        amountOwed: this.state.amountOwed,
        contactMethod: this.state.contactMethod,
        email: this.state.email,
        notificationInterval: this.state.notificationInterval,
        phoneNumber: this.state.phoneNumber,
      }
      console.log(`sending the following body to ${process.env.REACT_APP_ORCHESTRATOR_ENDPOINT}`, body)
      axios.post(process.env.REACT_APP_ORCHESTRATOR_ENDPOINT as string, body)
        .then((res: AxiosResponse) => {
          this.setState({
            amountOwed: '0.00',
            amountOwedError: undefined,
            contactMethod: ContactMethod.Phone,
            email: '',
            emailError: undefined,
            notificationInterval: '60',
            notificationIntervalError: undefined,
            phoneNumber: '',
            phoneNumberError: undefined
          })
        }).catch((error: any) => {
          alert('An error occurred.')
        })
    }
  }
}

export default NotificationForm;
