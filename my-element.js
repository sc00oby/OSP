import {LitElement, html, css} from 'lit';

export class MyElement extends LitElement {
  static get styles() {
    return css`
    #form{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
    }
    `;
  }

  constructor() {
    super();
    this.state = {
      firstName: {
        name: 'firstName',
        value: '',
      },
      errors: {
        default: true
      },
      touched: {}
    }
  }

  render() {
    return html`
      <form id="form" @submit=${this.handleSubmit} >

        <input @blur=${this.handleBlur} @input=${this.handleInput} type="text" name=${this.state.firstName.name} placeholder=${this.state.firstName.name} >
        <div ?hidden=${!this.state.touched.firstName && !this.state.errors.firstName}>${this.state.errors.firstName}</div>

        <input type="submit">
      </form>
    `;
  }

  handleBlur(event) {
    this.state.touched[event.target.name] = true
    this.state.errors = this.validate(event.target.name)
    console.log(this.state.errors)
    this.requestUpdate()
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(this.state.errors)
    if (Object.keys(this.state.errors).length !== 0) {
      if (this.state.errors.default) {
        this.state.errors = this.validate('submit')
      }
      this.requestUpdate()
    } else {
      alert(this.state.firstName.value)
    }
  }

  handleInput(event) {
    const { name, value } = event.target
    console.log(name)
    console.log(value)
    console.log(this.state.errors)
    this.state[name].value = value
    this.state.errors = this.validate(event.target.name)
    console.log(this.state.errors)
    this.requestUpdate()
  }

  validate(value) {
    const errors = {}

    if (value === 'submit' && this.state.errors.firstName) {
      errors.firstName = this.state.errors.firstName
    } else if (value === 'submit' || (value === 'firstName' && !this.state.firstName.value)) {
      errors.firstName = 'Required'
    } else if (this.state.firstName.value.length > 15) {
      errors.firstName = 'Must be fewer than 15 characters'
    }

    return errors
  }

}

window.customElements.define('my-element', MyElement);
