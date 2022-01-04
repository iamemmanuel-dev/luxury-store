const cloudinary = require(`cloudinary`).v2
const ProductsModel = require(`../models/productsModel`)

exports.getProducts = async (req, res) => {
  if (req.query.id) {
    const product = await ProductsModel.findById(req.query.id)
    return res.status(200).json({ product })
  }
  const products = await ProductsModel.find({ active: true })
  res.status(200).json({ products })
}

exports.addProducts = async (req, res) => {
  try {
    const { url } = await cloudinary.uploader.upload(
      `public/images/${req.body.image}`
    )
    const price = req.body.price.replace(',', '')
    const discount = Number(req.body.discount)
    const discountPrice = Number(req.body.discountPrice)
    const data = { ...req.body, price, discount, discountPrice, image: url }
    await ProductsModel.create(data)
    res.status(201).json({ status: `success` })
  } catch (err) {
    res.json({ status: `error` })
  }
}

exports.editProduct = async (req, res) => {
  try {
    const { id } = req.query
    if (req.body.image && req.file) {
      const { url } = await cloudinary.uploader.upload(
        `public/images/${req.body.image}`
      )
      const price = req.body.price.replace(',', '')
      const data = { ...req.body, price, image: url }
      await ProductsModel.findByIdAndUpdate(id, data)
      return res.status(200).json({ status: `success` })
    }

    const price = req.body.price.replace(',', '')
    const data = { ...req.body, price }
    await ProductsModel.findByIdAndUpdate(id, data)
    res.status(200).json({ status: `success` })
  } catch (err) {
    res.json({ status: `error` })
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    await ProductsModel.findByIdAndUpdate(req.query.id, { active: false })
    res.status(200).json({ status: `success` })
  } catch (err) {
    res.json({ status: `fail` })
  }
}
