const Joi = require('@hapi/joi');

const {
  addProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  editProductByIdHandler,
  deleteProductByIdHandler,
  getCategoryHandler,
} = require('./handlers-products');

const {
  addStoreHandler,
  getAllStoresHandler,
  getStoreByIdHandler,
  editStoreByIdHandler,
  deleteStoreByIdHandler,
} = require('./handlers-stores');

const {
  registerHandler,
  loginHandler,
} = require('./handlers-users');

const routes = [
  {
    method: 'POST',
    path: '/register',
    options: {
      validate: {
        payload: Joi.object({
          email: Joi.string().required(),
          password: Joi.string().required(),
          fullName: Joi.string().required(),
          address: Joi.string().required(),
          dateOfBirth: Joi.date().optional(),
          phoneNumber: Joi.string().optional(),
        }),
      },
    },
    handler: registerHandler,
  },
  {
    method: 'POST',
    path: '/login',
    handler: loginHandler,
  },
  {
    method: 'POST',
    path: '/products',
    options: {
      validate: {
        payload: Joi.object({
          productName: Joi.string().required(),
          category: Joi.string().required(),
          price: Joi.number().required(),
          description: Joi.string().required(),
        }),
      },
    },
    handler: addProductHandler,
  },
  {
    method: 'GET',
    path: '/products',
    handler: getAllProductsHandler,
  },
  {
    method: 'POST',
    path: '/products/category',
    handler: getCategoryHandler,
  },
  {
    method: 'GET',
    path: '/products/{id}',
    handler: getProductByIdHandler,
  },
  {
    method: 'PUT',
    path: '/products/{id}',
    options: {
      validate: {
        payload: Joi.object({
          productName: Joi.string().optional(),
          category: Joi.string().optional(),
          price: Joi.number().optional(),
          description: Joi.string().optional(),
        }),
      },
    },
    handler: editProductByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/products/{id}',
    handler: deleteProductByIdHandler,
  },
  {
    method: 'POST',
    path: '/stores',
    options: {
      validate: {
        payload: Joi.object({
          storeName: Joi.string().required(),
          address: Joi.string().required(),
        }),
      },
    },
    handler: addStoreHandler,
  },
  {
    method: 'GET',
    path: '/stores',
    handler: getAllStoresHandler,
  },
  {
    method: 'GET',
    path: '/stores/{id}',
    handler: getStoreByIdHandler,
  },
  {
    method: 'PUT',
    path: '/stores/{id}',
    options: {
      validate: {
        payload: Joi.object({
          storeName: Joi.string().optional(),
          address: Joi.string().optional(),
        }),
      },
    },
    handler: editStoreByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/stores/{id}',
    handler: deleteStoreByIdHandler,
  },
];

module.exports = routes;
