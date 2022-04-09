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
    id: {},
    value: {},
    required: {},
    regex: {},
    max: {},
    error: {},
    message: {},
  }

  constructor() {
    super();
    this.placeholder = "email";
    this.id = `EmailId${Math.round(10000*Math.random())}`;
    this.value = '',
    this.required = null;
    // eslint-disable-next-line no-useless-escape 
    this.standardRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.max = null;
    this.error = null;    
    this.message = null;
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
    return this.value
  }

  getPlaceholder() {
    return this.placeholder
  }

  getUnique() {
    return this.id
  }

  //handles blur events. applies error validation if user interacts with this field
  handleBlur() {
    this.error = this.validation()
    this.requestUpdate()
  }

  //handles user input. update's state and applies error validation with each character input
  handleInput(event) {
    const { value } = event.target;
    this.value = value
    this.error = this.validation();
    this.requestUpdate();
  }

  //this is a sample "validation function" idk how to implement but i imagine developer would create this themselves
  validation() {
    let error = null;

    const max = RegExp(String.raw`^.{0,${this.max}}$`)
    const regex = RegExp(String.raw`${this.regex}`)

    //error if field is left blank
    if (this.required && !this.val) {
      // console.log(this.required)
      error = 'Required';
      //error if val is too long
    } else if (this.regex && this.message && !regex.test(this.value)) {
      error = this.message
    }  else if (this.max && !max.test(this.value)) {
      error = `Must be less than ${this.max} characters`;
    } else if ((!this.regex || !this.message) && !this.standardRegex.test(this.value)) {
      error = 'Invalid Email'
    }

    return error;
  }

}

window.customElements.define('email-', Email)