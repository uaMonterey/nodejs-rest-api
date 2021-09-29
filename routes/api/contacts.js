const express = require('express')
const router = express.Router()

const { joiSchema, joiSchemaUpdateFavorite } = require('../../models')
const { validation } = require('../../middlewares')
const ctrl = require('../../controllers/contacts')

const validationMiddleware = validation(joiSchema)
const validationMiddlewareUpdFav = validation(joiSchemaUpdateFavorite)

router.get('/', ctrl.listContacts)

router.get('/:contactId', ctrl.getContactById)

router.delete('/:contactId', ctrl.removeContact)

router.post('/', validationMiddleware, ctrl.addContact)

router.put('/:contactId', validationMiddleware, ctrl.updateContact)

router.patch('/:contactId/favorite', validationMiddlewareUpdFav, ctrl.patchContact)

module.exports = router
