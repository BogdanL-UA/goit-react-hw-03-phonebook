import { Component } from 'react';
import { nanoid } from 'nanoid';

import Contacts from './Contacts/Contacts';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';

import styles from '../components/App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onChangeFilter = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts };
    });
  };

  isDublicate = (name, newNumber) => {
    const nameNormalize = name.toLowerCase();
    const { contacts } = this.state;
    const contact = contacts.find(({ name, number }) => {
      return nameNormalize === name.toLowerCase() && number === newNumber;
    });
    return Boolean(contact);
  };

  addContact = ({ name, number }) => {
    this.setState(prevState => {
      if (this.isDublicate(name, number)) {
        return alert(`${name}:${number} is already exist!`);
      }
      const id = nanoid();
      const newContact = { name, number, id };
      const { contacts } = prevState;
      return { contacts: [newContact, ...contacts] };
    });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const filterLowerCase = filter.toLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(filterLowerCase) ||
        number.includes(filterLowerCase)
      );
    });
    return result;
  };

  render() {
    const contacts = this.getFilteredContacts();

    return (
      <div className={styles.app}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2 className={styles.title}>Contacts</h2>
        <Filter onChange={this.onChangeFilter} />
        <Contacts contacts={contacts} removeContact={this.removeContact} />
      </div>
    );
  }
}
export default App;
