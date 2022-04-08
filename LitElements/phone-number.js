import {LitElement, html, css} from 'lit';

export class PhoneNumber extends LitElement {

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
    required: {},
    regex: {},
    max: {},
    message: {},
  }

  constructor() {
    super();
    this.val = '';
    this.error = null;
    this.required = null;
    this.placeholder = "phone number";
    this.standardRegex =  /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    this.max = null;
    this.message = null;
    this.id = `PhoneNumberId${Math.round(10000*Math.random())}`
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
    return this.val
  }

  getPlaceholder() {
    return this.placeholder
  }

  getUnique() {
    return this.id
  }

  handleBlur() {
    this.error = this.validation()
    this.requestUpdate()
  }

  handleInput(event) {
    const { value } = event.target;
    this.val = value
    this.error = this.validation();
    this.requestUpdate();
  }

  validation() {
    let error = null;

    const max = RegExp(String.raw`^.{0,${this.max}}$`)
    const regex = RegExp(String.raw`${this.regex}`)

    //error if field is left blank
    if (this.required && !this.val) {
      // console.log(this.required)
      error = 'Required';
      //error if phone number is too long
    } else if (this.regex && this.message && !regex.test(this.val)) {
      error = this.message
    }  else if (this.max && !max.test(this.val)) {
      error = `Must be less than ${this.max} characters`;
    } else if ((!this.regex || !this.message) && !this.standardRegex.test(this.val)) {
      error = 'Invalid Phone Number (XXX-XXX-XXXX)'
    }

    return error;
  }

}

window.customElements.define('phone-number', PhoneNumber)