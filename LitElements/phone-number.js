import {LitElement, html} from 'lit';

export class PhoneNumber extends LitElement {

  static properties = {
    placeholder: {},
  }

  constructor() {
    super();
    this.phoneNumber = '';
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
    return this.phoneNumber
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
    this.phoneNumber = value
    this.error = this.validation();
    this.requestUpdate();
  }

  validation() {
    let error = null;

    const regex=  /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

    if (!this.phoneNumber) {
      error = 'Required';
    } else if (this.phoneNumber.length > 9 && !regex.test(this.phoneNumber)) {
      error = 'Invalid phone number: (xxx-xxx-xxxx)';
    }

    return error;
  }

}

window.customElements.define('phone-number', PhoneNumber)