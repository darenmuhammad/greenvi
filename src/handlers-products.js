const { nanoid } = require('nanoid');
const { Products, createProduct } = require('../models/products');

const addProductHandler = (request, h) => {
  const productId = nanoid(10);
  // getting body request in Hapi with request.payload
  const {
    productName,
    category,
    price,
    description,
  } = request.payload;

  // insert into table products
  createProduct(productId, productName, category, price, description);

  // check if the record are available
  const isFound = Products.findAll();

  // condition if product have added to table products
  if (isFound) {
    const response = h.response({
      status: 'success',
      message: 'product has been successfully added',
      data: {
        productId,
      },
    });
    response.code(201);
    return response;
  }

  // condition if product are not added to table products
  const response = h.response({
    status: 'fail',
    message: 'product failed to add',
  });
  response.code(500);
  return response;
};

const getAllProductsHandler = async (request, h) => {
  try {
    // sequelize syntax to get all record
    const products = await Products.findAll();
    return h.response(products);
  } catch (error) {
    return h.response(error).code(500);
  }
};

const getCategoryHandler = async (request, h) => {
  try {
    // sequelize syntax to get all record
    const products = await Products.findAll({ where: { category: request.payload.category } });
    return h.response(products);
  } catch (error) {
    return h.response(error).code(500);
  }
};

const getProductByIdHandler = async (request, h) => {
  try {
    // sequelize syntax to get record by primary key
    const product = await Products.findByPk(request.params.id);
    return h.response(product);
  } catch (error) {
    return h.response(error).code(500);
  }
};

const editProductByIdHandler = async (request, h) => {
  try {
    // getting id from request parameter
    const { id } = request.params;

    const {
      productName,
      category,
      price,
      description,
    } = request.payload;

    const findId = await Products.findByPk(id);

    if (findId !== null) {
      // sequelize syntax to set/update record
      Products.update({
        productName,
        category,
        price,
        description,
      }, { where: { productId: id } });

      const response = h.response({
        status: 'success',
        message: 'product has been successfully edited',
      });
      return response.code(200);
    }
  } catch (error) {
    return h.response(error).code(500);
  }

  // response when id can't be found
  const response = h.response({
    status: 'fail',
    message: 'failed to edit the product, id can\'t be found',
  });
  response.code(400);
  return response;
};

const deleteProductByIdHandler = async (request, h) => {
  try {
    // sequelize syntax to delete record from table products
    const drop = await Products.destroy({ where: { productId: request.params.id } });
    if (drop) {
      const response = h.response({
        status: 'success',
        message: 'product has been successfully deleted',
      });
      return response.code(200);
    }
  } catch (error) {
    return h.response(error).code(500);
  }

  // response when id can't be found
  const response = h.response({
    status: 'fail',
    message: 'failed to delete the product, id can\'t be found',
  });
  return response.code(400);
};

module.exports = {
  addProductHandler,
  getAllProductsHandler,
  getCategoryHandler,
  getProductByIdHandler,
  editProductByIdHandler,
  deleteProductByIdHandler,
};
