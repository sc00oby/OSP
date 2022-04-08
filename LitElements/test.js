import {LitElement, html, css} from 'lit';
import './email.js'
import './name.js'
import './password.js'
import './phone-number.js'
import './date.js'

export class Test extends LitElement {

  static get styles() {
    return css`
      #main{
        display: flex;
        flex-direction: column;
      }
    `
  }

  constructor() {
    super();
    this.name = '';
    this.error = null;
    this.touched = false;
  }

  render() {

    //sample regex that matches only letters: ^[a-zA-Z]+$ ^[codesmithCODESMITH]+$

    return html`
      <div id="main">
        <!-- <name-  placeholder="country" max="15" regex="^[a-zA-Z]+$" message="you suck"></name-> -->
        <!-- <name- unique="blah" placeholder="country"></name-> -->
        <!-- <email- required="true"  ></email->
        <password- required="true" max="11"></password->
        <phone-number required="true" regex="^[codesmithCODESMITH]+$" message="you an idiot"></phone-number>
        <date- required="true"></date-> -->
        <button @click=${() => this.ourFunc(this.handleSubmit)} type='submit'>submit</button>
      </div>
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

    const cache = {}

    for(let key in names) {
      if (!isNaN(Number(key))) {
        namesCheck = namesCheck && !names[key].validation()
        cache[names[key].getUnique()] = names[key].getValue()
      }
    }
    for(let key in emails) {
      if (!isNaN(Number(key))) {
        emailsCheck = emailsCheck && !emails[key].validation()
        cache[emails[key].getUnique()] = emails[key].getValue()
      }
    }
    for(let key in passwords) {
      if (!isNaN(Number(key))) {
        passwordsCheck = passwordsCheck && !passwords[key].validation()
        cache[passwords[key].getUnique()] = passwords[key].getValue()
      }
    }
    for(let key in phoneNumbers) {
      if (!isNaN(Number(key))) {
        phoneNumbersCheck = phoneNumbersCheck && !phoneNumbers[key].validation()
        cache[phoneNumbers[key].getUnique()] = phoneNumbers[key].getValue()
      }
    }
    
    if (namesCheck && emailsCheck && passwordsCheck && phoneNumbersCheck) {
      callback(cache)
    } else console.log('bad form')

  }

  handleSubmit(cache) {
    console.log(cache)
  }


}

window.customElements.define('test-', Test)