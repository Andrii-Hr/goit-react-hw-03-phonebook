import { nanoid } from 'nanoid';
import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Form.module.css';

class Form extends Component {
  static propTypes = { submit: PropTypes.func.isRequired };

  state = {
    name: '',
    number: '',
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.submit({
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    });
    this.formReset();
  };

  onChange = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  formReset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form className={s.form} onSubmit={this.onSubmit}>
        <label className={s.label}>
          Name
          <input
            className={s.input}
            type="text"
            value={this.state.name}
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.onChange}
          />
        </label>
        <label className={s.label}>
          Number
          <input
            className={s.input}
            value={this.state.number}
            onChange={this.onChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={s.submit} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default Form;
