const express = require('express')
const router = express.Router()

const { joiSchema } = require('../../models/user')
const { validation, controllerWrapper, authenticate, upload } = require('../../middlewares/')
const { auth: ctrl } = require('../../controllers')

const userValidationMiddleware = validation(joiSchema)

router.post('/register', userValidationMiddleware, controllerWrapper(ctrl.register))
router.post('/login', userValidationMiddleware, controllerWrapper(ctrl.login))
router.get('/logout', controllerWrapper(authenticate), controllerWrapper(ctrl.logout))
router.get('/current', controllerWrapper(authenticate), controllerWrapper(ctrl.currentUser))
router.patch(
  '/avatars',
  controllerWrapper(authenticate),
  upload.single('avatarURL'),
  controllerWrapper(ctrl.updateAvatar)
)
router.get('/verify/:token', controllerWrapper(ctrl.verify))
router.post('/verify', controllerWrapper(ctrl.repeatEmailVerification))

module.exports = router
