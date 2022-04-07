import {LitElement, html, css} from 'lit';

export class Email extends LitElement {

  static get styles() {
    return css`
      #main{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
      }
    `
  }

  static properties = {
    placeholder: {},
    unique: {},
    required: {},
    regex: {},
    max: {},
    message: {},
  }

  constructor() {
    super();
    this.email = '';
    this.error = null;
    this.required = null;
    this.placeholder = "email";
    // eslint-disable-next-line no-useless-escape
    this.standardRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.max = null;
    this.message = null;
    this.unique = `EmailId${Math.round(10000*Math.random())}`
  }

  render() {
    return html`
      <div id="main">
        <input @blur=${this.handleBlur} @input=${this.handleInput} type="text" placeholder=${this.placeholder}>
        <div ?hidden=${!this.error}>${this.error}</div>
      </div>
    `;
  }

  getValue() {
    return this.email
  }

  getPlaceholder() {
    return this.placeholder
  }

  getUnique() {
    return this.unique
  }

  //handles blur events. applies error validation if user interacts with this field
  handleBlur() {
    this.error = this.validation()
    this.requestUpdate()
  }

  //handles user input. update's state and applies error validation with each character input
  handleInput(event) {
    const { value } = event.target;
    this.email = value
    this.error = this.validation();
    this.requestUpdate();
  }

  //this is a sample "validation function" idk how to implement but i imagine developer would create this themselves
  validation() {
    let error = null;

    const max = RegExp(String.raw`^.{0,${this.max}}$`)
    const regex = RegExp(String.raw`${this.regex}`)

    //error if field is left blank
    if (this.required && !this.email) {
      // console.log(this.required)
      error = 'Required';
      //error if email is too long
    } else if (this.regex && this.message && !regex.test(this.email)) {
      error = this.message
    }  else if (this.max && !max.test(this.email)) {
      error = `Must be less than ${this.max} characters`;
    } else if ((!this.regex || !this.message) && !this.standardRegex.test(this.email)) {
      error = 'Invalid Email'
    }

    return error;
  }

}

window.customElements.define('email-', Email)