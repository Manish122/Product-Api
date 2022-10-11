const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsynchError = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
// console.log(Product);

//Create A Product
const createProduct = catchAsynchError(async (req, res, next) => {
  // const product

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});
//Get All Products
const getAllProducts = catchAsynchError(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const product = await apiFeature.query;
  res.status(201).json({
    success: true,
    product,
  });
});

// Get Product Details
const getProductDetails = catchAsynchError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("product Not Found", 404));
    // res.status(500).json({
    //     success : false,
    //     message : "product is not found"
    // })
  }
  res.status(200).json({
    success: true,
    product,
    productCount
  });
});

//Update Product --Admin

const updateProduct = catchAsynchError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("product Not Found", 404));
  }
  product = await Product.findByIdAndUpdate(product, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(201).json({
    success: true,
    product,
  });
});

//Delete Product
const deleteProduct = catchAsynchError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("product Not Found", 404));
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product delete succesfully",
  });
});

module.exports = {
  getAllProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  deleteProduct,
};
