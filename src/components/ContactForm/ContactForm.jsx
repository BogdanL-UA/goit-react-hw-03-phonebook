import { Component } from 'react';
import propTypes from 'prop-types';
import styles from '../ContactForm/ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);

    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <div className={styles.phonebook}>
        <form className={styles.form} onSubmit={this.onSubmit}>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Name</label>
            <input
              onChange={this.onChange}
              className={styles.input}
              value={name}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </div>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Number</label>
            <input
              onChange={this.onChange}
              className={styles.input}
              value={number}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </div>
          <button className={styles.button}>Add contact</button>
        </form>
      </div>
    );
  }
}
export default ContactForm;

ContactForm.propTypes = {
  onSubmit: propTypes.func,
};
