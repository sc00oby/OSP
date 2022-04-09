import {LitElement, html, css} from 'lit';
import {styleMap} from 'lit/directives/style-map.js';

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

  // static styles = css`
  //  div {
  //    color: green;
  //  }
  // `

  static properties = {
    placeholder: {},
    id: {},
    value: {},
    required: {},
    regex: {},
    max: {},
    error: {},
    message: {},
    styles: {}
  }

  constructor() {
    super();
    this.placeholder = 'name';
    this.id = `NameId${Math.round(10000*Math.random())}`;
    this.value = '';
    this.required = null,
    this.standardRegex =  null;
    this.max = null;
    this.error = null;
    this.message = null;
    this.styles = {color: 'lightgreen', fontFamily: 'Roboto'};
  }

  render() {
    return html`
      <div id="main">
        <input @blur=${this.handleBlur} @input=${this.handleInput} type="text" placeholder=${this.placeholder}>
        <div ?hidden=${!this.error} style=${styleMap(this.styles)}>${this.error}</div>
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
    console.log(this.styles)
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
    } else if (this.regex && this.message && !regex.test(this.value)) {
      error = this.message
    } else if (this.max && !max.test(this.value)) {
      error = `Must be less than ${this.max} characters`;
    }

    return error;
  }

}

window.customElements.define('name-', Name)