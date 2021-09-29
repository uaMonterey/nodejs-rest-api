const { Contact } = require('../../models')

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const deleteContact = await Contact.findByIdAndDelete(contactId)
    if (!deleteContact) {
      res.status(404).json({ message: 'Not found' })
    }
    res.json({
      status: 'was successfuly deleted',
      code: 200,
      data: {
        result: deleteContact,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = removeContact
