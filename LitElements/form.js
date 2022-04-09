import {LitElement, html, css} from 'lit';
// import {styleMap} from 'lit/directives/style-map.js';

import './email.js'
import './name.js'
import './password.js'
import './phone-number.js'
import './date.js'

export class Test extends LitElement {

  static get styles() {
    return css`
      #main{
        display: flex;
        flex-direction: column;
      }
    `
  }

  constructor() {
    super();
    this.name = '';
    this.error = null;
    this.touched = false;
  }

  render() {

    //sample regex that matches only letters: ^[a-zA-Z]+$ ^[codesmithCODESMITH]+$
    
    return html`
      <div id="main">
        <name- placeholder="first name" required="true" unique="first name" styles:{ color: blue, fontFamily: 'Arial'}></name->
        <name- placeholder="last name" required="true" unique="first name"></name->
        <email- placeholder="email" required="true" unique="email"></email->
        <password- placeholder="password" required="true" unique="password"></password->
        <phone-number placeholder="phone number 1" required="true" unique="phone number 1"></phone-number>
        <phone-number placeholder="phone number 2" required="true" unique="phone number 2"></phone-number>
        <input type="date" unique="date" id="date"> 
        <input type="email" unique="best" id="best">
        <input type="submit" @click=${() => {this.ourFunc(this.handleSubmit)}} id="submit">
      </div>
    `;
  }

  ourFunc(callback) {
    const formElements = this.shadowRoot.children.main.children
    let formElementsCheck = true

    console.log(formElements[7].id)
    console.log(formElements[7].value)

    const cache = {}

    for(let singleElement in formElements) {
      if (!isNaN(Number(singleElement))) { //first conditional: removes extraneous methods/prototypical stuff; second conditional: removes the submit button or any other developer added input fields (since we don't handle those data validations)
        if (formElements[singleElement].validation) {
          formElementsCheck = formElementsCheck && !formElements[singleElement].validation()
          const { val, id } = formElements[singleElement]
          cache[id] = val
        } else {
          const { id, value } = formElements[singleElement]
          cache[id] = value
        }
      } 
    }
    
    if (formElementsCheck) {
      callback(cache)
    } else console.log('bad form')

  }

  handleSubmit(cache) {
    console.log(cache)
  }
}

window.customElements.define('test-', Test)