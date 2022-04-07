import {LitElement, html} from 'lit';

export class Name extends LitElement {

  static properties = {
    placeholder: {},
  }

  constructor() {
    super();
    this.name = '';
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
    return this.name
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
    this.name = value
    this.error = this.validation();
    this.requestUpdate();
  }

  //this is a sample "validation function" idk how to implement but imagine developer would create this themselves
  validation() {
    let error = null;

    //error if field is left blank
    if (!this.name) {
      error = 'Required';
      //error if name is too long
    } else if (this.name.length > 15) {
      error = 'Must be less than 15 characters';
    }

    return error;
  }

}

window.customElements.define('name-', Name)