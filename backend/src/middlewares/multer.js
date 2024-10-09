import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, './backend/public/images')
  },
  filename: (req, file, cb) => {
    const { email } = req.body;
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

export const uploadMulter = multer({
  storage: storage
})