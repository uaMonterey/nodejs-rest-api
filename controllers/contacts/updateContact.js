const { Contact } = require('../../models')

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const updContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
    if (!updContact) {
      return res.status(404).json({
        message: 'Not found',
      })
    }
    res.json({
      updContact,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateContact
