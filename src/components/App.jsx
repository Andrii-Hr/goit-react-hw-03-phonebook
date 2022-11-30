import React, { Component } from 'react';
import Section from './Section/Section';
import Form from './Form/Form';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';

const LS_KEY = 'contacts_id__list'

class App extends Component {
  state = {
    contacts: [   
    ],
    filter: '',
  };
  c
  componentDidMount() {
    const SavedData = JSON.parse(localStorage.getItem(LS_KEY));

    if (SavedData) {
      this.setState({ contacts: SavedData });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState !== this.state) {
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
    }
  }

  onFormSubmit = data => {
    if (this.checkName(data)) {
      alert(`${data.name} is already in contracts.`);
      return;
    }

    this.setState({
      contacts: [data, ...this.state.contacts],
    });
  };

  onChange = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  onFilter = () => {
    const normalizedFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter(el =>
      el.name.toLowerCase().includes(normalizedFilter)
    );
  };

  checkName = data => {
    return this.state.contacts.some(el => el.name.toLowerCase() === data.name.toLowerCase());
  };

  onContactDelete = evt => {
    this.setState({
      contacts: this.state.contacts.filter(el => el.id !== evt.target.id),
    });
  };

  render() {
    return (
      <>
        <h1>Phonebook</h1>
        <Form submit={this.onFormSubmit} />
        <Section title="Contacts">
          <Filter filter={this.state.filter} change={this.onChange} />
          <Contacts
            contacts={this.onFilter()}
            onContactDelete={this.onContactDelete}
          />
        </Section>
      </>
    );
  }
}

export default App;
