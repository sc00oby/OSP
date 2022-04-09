import {LitElement, html} from 'lit';
import './elite-form'

export class Test extends LitElement {

  render() {

    return html`
      <div>
        <elite-form 
          type='email' 
          label='Email:'
          placeholder='email'
          fieldId='email',
          validationRules: {
            required: true,
            email: true, 
            min: 10, 
            max: 20
          },
        ></elite-form>
        <button @click=${() => this.ourFunc(this.handleSubmit)} type='submit'>submit</button>
      </div>
    `;
  }
}