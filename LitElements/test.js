import {LitElement, html} from 'lit';
import './email.js'
import './name.js'
import './password.js'
import './phone-number.js'

export class Test extends LitElement {

  constructor() {
    super();
    this.name = '';
    this.error = null;
    this.touched = false;
  }

  render() {
    return html`
      <name- placeholder='first name'></name->
      <name- placeholder='last name'></name->
      <name- placeholder='last name'></name->
      <name- placeholder='last name'></name->
      <name- placeholder='last name'></name->
      <email- placeholder='email1'></email->
      <email- placeholder='email2'></email->
      <password- placeholder='password'></password->
      <phone-number placeholder='phone number'></phone-number>
      <input @click=${() => this.ourFunc(this.handleSubmit)} type='submit'>
    `;
  }

  ourFunc(callback) {
    const names = this.shadowRoot.querySelectorAll('name-')
    let namesCheck = true
    const emails = this.shadowRoot.querySelectorAll('email-')
    let emailsCheck = true
    const passwords = this.shadowRoot.querySelectorAll('password-')
    let passwordsCheck = true
    const phoneNumbers = this.shadowRoot.querySelectorAll('phone-number')
    let phoneNumbersCheck = true 

    console.log(names)

    for(let key in names) {
      if (!isNaN(Number(key))) {
        namesCheck = namesCheck && !names[key].validation()
      }
    }
    for(let key in emails) {
      if (!isNaN(Number(key))) {
        emailsCheck = emailsCheck && !emails[key].validation()
      }
    }
    for(let key in passwords) {
      if (!isNaN(Number(key))) {
        passwordsCheck = passwordsCheck && !passwords[key].validation()
      }
    }
    for(let key in phoneNumbers) {
      if (!isNaN(Number(key))) {
        phoneNumbersCheck = phoneNumbersCheck && !phoneNumbers[key].validation()
      }
    }
    
    if (namesCheck && emailsCheck && passwordsCheck && phoneNumbersCheck) {
      callback()
    } else console.log('bad form')

  }

  handleSubmit() {
    alert('successful submission!')
  }


}

window.customElements.define('test-', Test)