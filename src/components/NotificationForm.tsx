import axios, { AxiosResponse } from 'axios';
import { DefaultButton, Label, TextField } from 'office-ui-fabric-react';
import * as React from 'react';
import '../assets/styles/App.css';
import { ContactMethod } from '../types/Enums';
import { isValidEmail, isValidNumber, isValidPhoneNumber } from '../utilities/validations';

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

class NotificationForm extends React.Component<{}, INotificationFormState>{

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
    // bind this to event handlers that set state
    this.handleAmountOwedChanged = this.handleAmountOwedChanged.bind(this);
    this.handleIntervalChanged = this.handleIntervalChanged.bind(this);
    this.handleContactMethodChanged = this.handleContactMethodChanged.bind(this);
    this.handleEmailChanged = this.handleEmailChanged.bind(this);
    this.handlePhoneNumberChanged = this.handlePhoneNumberChanged.bind(this);
    this.handleButtonSubmit = this.handleButtonSubmit.bind(this);
  }

  public renderContactMethodIcons() {
    // by default phone and email class will be unselected
    let phoneClass: string = 'ms-Grid-col ms-sm5 ms-md5 contact-method-choice-container';
    let emailClass: string = 'ms-Grid-col ms-sm5 ms-md5 contact-method-choice-container';
    const selectedClass: string = 'ms-Grid-col ms-sm5 ms-md5 contact-method-choice-container ms-bgColor-neutralLighter';
    // update phone or email class depending on which one was selected by user
    this.state.contactMethod === ContactMethod.Phone ? phoneClass = selectedClass : emailClass = selectedClass;
    return (
      <div className='ms-Grid-row'>
        <div className="ms-Grid-col ms-sm1 ms-md1" />
        <div className={phoneClass} onClick={this.handleContactMethodChanged.bind(this, ContactMethod.Phone)}>
          <span className='ms-font-su'><i className="ms-Icon ms-Icon--Phone" /></span>
        </div>
        <div className={emailClass} onClick={this.handleContactMethodChanged.bind(this, ContactMethod.Email)}>
          <span className='ms-font-su'><i className="ms-Icon ms-Icon--Mail" /></span>
        </div>
        <div className="ms-Grid-col ms-sm1 ms-md1" />
      </div>
    )
  }

  public renderContact() {
    return (
      <div className='ms-Grid-row ms-font-m'>
        <div className="ms-Grid-col ms-sm12 ms-md12">

          {/* Contact Method */}
          <div className='ms-Grid-row form-field'>
            <div className="ms-Grid-col ms-sm2 ms-md3" />
            <div className="ms-Grid-col ms-sm8 ms-md6">
              <Label>Contact Method</Label>
              {this.renderContactMethodIcons()}
            </div>
            <div className="ms-Grid-col ms-sm2 ms-md3" />
          </div>

          {/* Phone # */}
          {this.state.contactMethod === ContactMethod.Phone ?
            <div className='ms-Grid-row form-field'>
              <div className="ms-Grid-col ms-sm2 ms-md3" />
              <div className="ms-Grid-col ms-sm8 ms-md6">
                <TextField
                  label="Phone #"
                  onChange={this.handlePhoneNumberChanged}
                  value={this.state.phoneNumber}
                  errorMessage={this.state.phoneNumberError}
                />
              </div>
              <div className="ms-Grid-col ms-sm2 ms-md3" />
            </div>
            :

            // Email Address
            <div className='ms-Grid-row form-field'>
            <div className="ms-Grid-col ms-sm2 ms-md3" />
            <div className="ms-Grid-col ms-sm8 ms-md6">
              <TextField
                label="Email Address"
                onChange={this.handleEmailChanged}
                value={this.state.email}
                errorMessage={this.state.emailError}
              />
            </div>
            <div className="ms-Grid-col ms-sm2 ms-md3" />
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
          <div className='ms-Grid-row form-field'>
            <div className="ms-Grid-col ms-sm2 ms-md3" />
            <div className="ms-Grid-col ms-sm8 ms-md6">
              <TextField
                label="Amount Owed"
                suffix={'$'}
                onChange={this.handleAmountOwedChanged}
                value={this.state.amountOwed}
                errorMessage={this.state.amountOwedError}
              />
            </div>
            <div className="ms-Grid-col ms-sm2 ms-md3" />
          </div>

          {/* SMS Interval */}
          <div className='ms-Grid-row form-field'>
            <div className="ms-Grid-col ms-sm2 ms-md3" />
            <div className="ms-Grid-col ms-sm8 ms-md6">
              <TextField
                label="Notification Interval"
                suffix={'seconds'}
                onChange={this.handleIntervalChanged}
                value={this.state.notificationInterval}
                errorMessage={this.state.notificationIntervalError}
              />
            </div>
            <div className="ms-Grid-col ms-sm2 ms-md3" />
          </div>

          {/* Contact */}
          {this.renderContact()}

          {/* Button */}
          <div className='ms-Grid-row go-button-container'>
            <div className="ms-Grid-col ms-sm12 ms-md12">
              <DefaultButton className="go-button" text='GO' onClick={this.handleButtonSubmit} />
            </div>
          </div>

        </div>
      </div>
    );
  }

  private handleAmountOwedChanged(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
    // validate that the amount is a valid number
    const errorMessage: string | undefined = !isValidNumber(value) ? `The value should be a number, actual is ${value}.` : undefined;
    return this.setState({
      amountOwed: value,
      amountOwedError: errorMessage
    });
  }

  private handleIntervalChanged(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
    // validate that the interval is a valid number
    const errorMessage: string | undefined = !isValidNumber(value) ? `The value should be a number, actual is ${value}.` : undefined;
    return this.setState({
      notificationInterval: value,
      notificationIntervalError: errorMessage
    });
  }

  private handleContactMethodChanged(method: ContactMethod) {
    // reset error message for the other contact method so as not to prevent submission
    if (method === ContactMethod.Phone) {
      this.setState({
        contactMethod: method,
        emailError: undefined
      });
    } else {
      this.setState({
        contactMethod: method,
        phoneNumberError: undefined
      });
    }
  };

  private handleEmailChanged(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
    // validate that the email is valid
    const errorMessage: string | undefined = !isValidEmail(value) ? `Invalid email.` : undefined;
    return this.setState({
      email: value,
      emailError: errorMessage
    });
  }

  private handlePhoneNumberChanged(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
    // validate that the phone number is valid
    const errorMessage: string | undefined = !isValidPhoneNumber(value) ? `The value should use the format XXXXXXXXXX.` : undefined;
    return this.setState({
      phoneNumber: value,
      phoneNumberError: errorMessage
    });
  }

  private handleButtonSubmit() {
    if (this.state.amountOwed.length === 0) {
      this.setState({
        amountOwedError: 'You must provide a value.'
      })
    } else if (this.state.notificationInterval.length === 0) {
      this.setState({
        notificationIntervalError: 'You must provide a value.'
      })
      // re validate phone number because the error message resets on contact method toggle
    } else if (this.state.contactMethod === ContactMethod.Phone && (this.state.phoneNumber.length === 0 || !isValidPhoneNumber(this.state.phoneNumber)) ) {
      this.setState({
        phoneNumberError: 'The value should use the format XXXXXXXXXX.'
      })
      // re validate email address because the error message resets on contact method toggle
    } else if (this.state.contactMethod === ContactMethod.Email && (this.state.email.length === 0 || !isValidEmail(this.state.email))) {
      this.setState({
        emailError: 'Invalid email.'
      })
    } else if (!this.state.amountOwedError && !this.state.emailError && !this.state.phoneNumberError && !this.state.notificationIntervalError) {
      // validation has passed, send the relevant information to the durable function orchestrator
      const body = {
        amountOwed: this.state.amountOwed,
        contactMethod: this.state.contactMethod,
        email: this.state.email,
        notificationInterval: this.state.notificationInterval,
        phoneNumber: this.state.phoneNumber,
      }
      console.log(`Prepared to send the following body to ${process.env.REACT_APP_ORCHESTRATOR_ENDPOINT}`, body)
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
