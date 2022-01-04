const mongoose = require(`mongoose`)

const ProductSchema = new mongoose.Schema({
  title: String,
  slug: String,
  description: String,
  price: String,
  rating: String,
  niche: {
    type: String,
    default: 'iphones',
  },
  category: {
    type: String,
    default: 'Featured',
  },
  image: String,
  stockCount: String,
  active: {
    type: Boolean,
    default: true,
  },
  DOD: {
    type: String,
    default: 'No',
  },
  discount: {
    type: Number,
    default: 0,
  },
  discountPrice: {
    type: Number,
    default: 0,
  },
  productSubtotal: Number,
  productTotal: Number,
  amount: {
    type: Number,
    default: 1,
  },
})

ProductSchema.pre(`save`, function (next) {
  if (this.slug) return next()
  this.slug = this.title.replace(` `, `-`)
  next()
})

const ProductsModel = mongoose.model(`product`, ProductSchema)
module.exports = ProductsModel
