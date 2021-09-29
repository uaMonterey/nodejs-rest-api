const {Schema, model} = require('mongoose')
const gr = require('gravatar')
const Joi = require('joi')
const {nanoid} = require('nanoid')

const emailRegexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const userSchema = Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: emailRegexp,
        },
        password: {
            type: String,
            minlength: 6,
        },
        subscription: {
            type: String,
            enum: ['starter', 'pro', 'business'],
            default: 'starter',
        },
        token: {
            type: String,
            default: null,
        },
        avatarURL: {
            type: String,
            default: function () {
                return gr.url(this.email, {s: '250'}, true)
            },
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verifyToken: {
            type: String,
            required: [true, 'Verify token is required'],
            default: nanoid(),
        },
    },
    {
        virtuals: true,
        versionKey: false,
        timestamps: true,
        toJSON: {
            transform: function (_doc, ret) {
                delete ret._id
                return ret
            },
        },
    }
)

const joiSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string(),
    token: Joi.string(),
    avatarURL: Joi.string(),
})

const User = model('user', userSchema)

module.exports = {
    User,
    joiSchema,
}
