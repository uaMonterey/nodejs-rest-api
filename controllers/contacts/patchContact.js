const { Contact } = require('../../models')

const patchContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const { favorite } = req.body

    const updateContact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true })
    if (!updateContact) {
      return res.status(404).json({
        message: 'Not found',
      })
    }
    res.json({
      updateContact,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = patchContact
