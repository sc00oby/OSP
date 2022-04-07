import {LitElement, html, css} from 'lit';

export class Date extends LitElement {

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
    this.date = '';
    this.error = null;
    this.required = null;
    this.placeholder = "date";
    this.regex =  null;
    this.max = null;
    this.message = null;
    this.unique = `DateID${Math.round(10000*Math.random())}`
  }

  render() {
    return html`
      <div id="main">
        <input min="2021-1-1" max="2022-1-1" @blur=${this.handleBlur} @input=${this.handleInput} type="date" placeholder=${this.placeholder}>
        <div ?hidden=${!this.error}>${this.error}</div>
      </div>
    `;
  }

  getValue() {
    return this.date
  }

  getPlaceholder() {
    return this.placeholder
  }

  getUnique() {
    return this.unique
  }

  //handles blur events. applies error validation if user interacts with this field
  handleBlur() {
    console.log(this.required)
    this.error = this.validation()
    this.requestUpdate()
  }

  //handles user input. update's state and applies error validation with each character input
  handleInput(event) {
    console.log(event.target.value)
    console.log(event.target.valueAsNumber)
    const { value } = event.target;
    this.date = value
    this.error = this.validation();
    this.requestUpdate();
  }

  //this is a sample "validation function" idk how to implement but imagine developer would create this themselves
  validation() {
    let error = null;

    const max = RegExp(String.raw`^.{0,${this.max}}$`)
    const regex = RegExp(String.raw`${this.regex}`)

    //error if field is left blank
    if (this.required && !this.date) {
      // console.log(this.required)
      error = 'Required';
      //error if date is too long
    } else if (this.regex && this.message && !regex.test(this.date)) {
      error = this.message
    } else if (this.max && !max.test(this.date)) {
      error = `Must be less than ${this.max} characters`;
    }

    return error;
  }

}

window.customElements.define('date-', Date)