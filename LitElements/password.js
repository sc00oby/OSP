import {LitElement, html} from 'lit';

export class Password extends LitElement {

  static properties = {
    placeholder: {},
  }

  constructor() {
    super();
    this.password = '';
    this.error = null;
    this.touched = false;
  }

  render() {
    return html`
      <input @blur=${this.handleBlur} @input=${this.handleInput} type="text" placeholder=${this.placeholder}>
      <div ?hidden=${!this.error}>${this.error}</div>
    `;
  }

  getValue() {
    return this.password
  }

  getPlaceholder() {
    return this.placeholder
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

    const regex=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    if (!this.password) {
      error = 'Required';
    } else if (!regex.test(this.password)) {
      error = 'Invalid password';
    }

    return error;
  }

}

window.customElements.define('password-', Password)