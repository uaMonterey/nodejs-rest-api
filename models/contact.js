const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
)

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: false }).optional(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
})

const joiSchemaUpdateFavorite = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: false }).optional(),
  phone: Joi.string().optional(),
  favorite: Joi.boolean().required(),
})

const Contact = model('contact', contactSchema)

module.exports = { Contact, joiSchema, joiSchemaUpdateFavorite }
