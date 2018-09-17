import { DefaultButton, Dropdown, IDropdownOption, TextField } from 'office-ui-fabric-react';
import * as React from 'react';
import '../assets/styles/App.css';

enum ContactMethod {
  Phone = 'Phone',
  Email = 'Email'
}

interface IComponentState {
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

class NotificationForm extends React.Component<any, IComponentState>{

  public state: IComponentState = {
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
  }

  public handleAmountOwedChanged(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
    const errorMessage: string | undefined = isNaN(Number(value)) ? `The value should be a number, actual is ${value}.` : undefined;
    return this.setState({
      amountOwed: value,
      amountOwedError: errorMessage
    });
  }

  public handleIntervalChanged(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
    const errorMessage: string | undefined = isNaN(Number(value)) ? `The value should be a number, actual is ${value}.` : undefined;
    return this.setState({
      notificationInterval: value,
      notificationIntervalError: errorMessage
    });
  }

  public handleContactMethodChanged(item: IDropdownOption) {
    this.setState({ contactMethod: item.text });
  };

  public handleEmailChanged(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
    const errorMessage: string | undefined = !this.isValidEmail(value) ? `Invalid email.` : undefined;
    return this.setState({
      email: value,
      emailError: errorMessage
    });
  }

  public handlePhoneNumberChanged(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
    const errorMessage: string | undefined = !this.isValidPhoneNumber(value) ? `The value should use the format XXXXXXXXXX.` : undefined;
    return this.setState({
      phoneNumber: value,
      phoneNumberError: errorMessage
    });
  }

  public handleButtonSubmit() {
    if (!this.state.amountOwedError && !this.state.emailError && !this.state.phoneNumberError && !this.state.notificationIntervalError) {
      // send the values to the orchestrator
    }
  }

  public isValidPhoneNumber(phoneNumber: string): boolean {
    const phoneNumberRegex: RegExp = /^\d{10}$/;
    if (phoneNumber.match(phoneNumberRegex)) {
      return true;
    } else {
      return false;
    }
  }

  public isValidEmail(email: string): boolean {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return (true)
    } else {
      return (false)
    }
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
}

export default NotificationForm;
