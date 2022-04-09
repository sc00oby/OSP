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
    this.placeholder = 'password';
    this.id = `PasswordId${Math.round(10000*Math.random())}`;
    this.value = '';
    this.required = null;
    this.standardRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
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
      //error if val is too long
    } else if (this.regex && this.message && !regex.test(this.value)) {
      error = this.message
    }  else if (this.max && !max.test(this.value)) {
      error = `Must be less than ${this.max} characters`;
    } else if ((!this.regex || !this.message) && !this.standardRegex.test(this.value)) {
      error = 'Invalid Password'
    }

    return error;
  }

}

window.customElements.define('password-', Password)