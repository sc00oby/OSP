import {LitElement, html, css} from 'lit';

export class Password extends LitElement {

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
    this.password = '';
    this.error = null;
    this.required = null;
    this.placeholder = "password";
    this.standardRegex =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    this.max = null;
    this.message = null;
    this.unique = `PasswordId${Math.round(10000*Math.random())}`
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
    return this.password
  }

  getPlaceholder() {
    return this.placeholder
  }

  getUnique() {
    return this.unique
  }

  handleBlur() {
    this.error = this.validation()
    this.requestUpdate()
  }

  handleInput(event) {
    const { value } = event.target;
    this.password = value
    this.error = this.validation();
    this.requestUpdate();
  }

  validation() {
    let error = null;

    const max = RegExp(String.raw`^.{0,${this.max}}$`)
    const regex = RegExp(String.raw`${this.regex}`)

    //error if field is left blank
    if (this.required && !this.password) {
      // console.log(this.required)
      error = 'Required';
      //error if password is too long
    } else if (this.regex && this.message && !regex.test(this.password)) {
      error = this.message
    }  else if (this.max && !max.test(this.password)) {
      error = `Must be less than ${this.max} characters`;
    } else if ((!this.regex || !this.message) && !this.standardRegex.test(this.password)) {
      error = 'Invalid Password'
    }

    return error;
  }

}

window.customElements.define('password-', Password)