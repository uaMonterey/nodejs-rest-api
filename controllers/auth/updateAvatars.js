const fs = require('fs/promises')
const path = require('path')
const jimp = require('jimp')

const { User } = require('../../models')

const usersDir = path.join(__dirname, '../../', 'public/avatars')

const updateAvatar = async (req, res) => {
  const { id, avatarURL } = req.user
  const { path: tempPath, originalname } = req.file
  const uploadPath = path.join(usersDir, id, `${id}-${originalname}`)
  const pic = await jimp.read(tempPath)
  await pic
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(tempPath)
  const avatar = `${id}-${originalname}`

  try {
    await fs.rename(tempPath, uploadPath)
    try {
      await fs.unlink(path.join(usersDir, id, avatarURL))
    } catch (error) {
      console.log(error.message)
    }
    await User.findByIdAndUpdate(id, { avatarURL: avatar })
    res.status(200).json({ status: 'success', code: 200, data: { avatarURL: avatar } })
  } catch (error) {
    await fs.unlink(tempPath)
    throw error
  }
}

module.exports = updateAvatar
