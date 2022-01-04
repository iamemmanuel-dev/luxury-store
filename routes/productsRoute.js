const { Router } = require(`express`)
const adminProductsController = require(`../controllers/adminProductsController`)
const { upload } = require(`../utils/fileupload`)
const router = Router()

router
  .route(`/`)
  .get(adminProductsController.getProducts)
  .post(
    upload.single('originalImg'),
    (req, res, next) => {
      req.body.image = req.file.filename
      next()
    },
    adminProductsController.addProducts
  )
  .put(
    upload.single('originalImg'),
    (req, res, next) => {
      if (req.body.image && req.file) {
        req.body.image = req.file.filename
      }
      next()
    },
    (req, res, next) => {
      if (req.body.DOD === 'No') {
        req.body.discount = ''
        req.body.discountPrice = ''
      }
      next()
    },
    adminProductsController.editProduct
  )
  .delete(adminProductsController.deleteProduct)

module.exports = router
