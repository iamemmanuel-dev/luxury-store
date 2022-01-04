const multer = require(`multer`)

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `product-${file.fieldname}-${Date.now()}.${ext}`)
  },
})

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true)
  } else {
    cb(new Error('Not an image File!!'), false)
  }
}

exports.upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
})
