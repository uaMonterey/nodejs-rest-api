const listContacts = require('./listContacts')

const getContactById = require('./getContactById')

const updateContact = require('./updateContact')

const removeContact = require('./removeContact')

const addContact = require('./addContact')

const patchContact = require('./patchContact')

module.exports = {
  listContacts,
  getContactById,
  updateContact,
  removeContact,
  addContact,
  patchContact,
}
