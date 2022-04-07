import {LitElement, html} from 'lit';

export class Email extends LitElement {

  static properties = {
    placeholder: {},
  }

  constructor() {
    super();
    this.email = '';
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
    return this.email
  }

  getPlaceholder() {
    return this.placeholder
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

    

    //error if field is left blank
    if (!this.email) {
      error = 'Required';
      //checks for valid email string
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.email)) {
      error = 'Invalid Email';
    }

    return error;
  }

}

window.customElements.define('email-', Email)