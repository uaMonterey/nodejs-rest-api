const { Contact } = require('../../models')

const listContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 5 } = req.query
    const skip = (page - 1) * limit
    const total = await Contact.estimatedDocumentCount()
    const listContacts = await Contact.find({}, '', { skip, limit: +limit })
    res.json({
      status: 'success',
      code: 200,
      data: {
        total,
        pages: Math.ceil(total / limit),
        listContacts,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = listContacts
