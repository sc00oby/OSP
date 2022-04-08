import {LitElement, html, css} from 'lit';

export class Name extends LitElement {

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
    this.val = '';
    this.error = null;
    this.required = null;
    this.placeholder = "name";
    this.regex =  null;
    this.max = null;
    this.message = null;
    this.unique = `NameId${Math.round(10000*Math.random())}`
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
    this.val = value
    this.error = this.validation();
    this.requestUpdate();
  }

  //this is a sample "validation function" idk how to implement but imagine developer would create this themselves
  validation() {
    let error = null;

    const max = RegExp(String.raw`^.{0,${this.max}}$`)
    const regex = RegExp(String.raw`${this.regex}`)

    //error if field is left blank
    if (this.required && !this.val) {
      error = 'Required';
      //error if val is too long
    } else if (this.regex && this.message && !regex.test(this.val)) {
      error = this.message
    } else if (this.max && !max.test(this.val)) {
      error = `Must be less than ${this.max} characters`;
    }

    return error;
  }

}

window.customElements.define('name-', Name)