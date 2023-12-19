const { nanoid } = require('nanoid');
const { Stores, createStore } = require('../models/stores');

const addStoreHandler = (request, h) => {
  const storeId = nanoid(10);
  // getting body request in Hapi with request.payload
  const { storeName, address } = request.payload;

  // insert into table stores
  createStore(storeId, storeName, address);

  // check if the record are available
  const isFound = Stores.findAll();

  // condition if store have added to table stores
  if (isFound) {
    const response = h.response({
      status: 'success',
      message: 'store has been successfully added',
      data: {
        storeId,
      },
    });
    response.code(201);
    return response;
  }

  // condition if store are not added to table stores
  const response = h.response({
    status: 'fail',
    message: 'store failed to add',
  });
  response.code(500);
  return response;
};

const getAllStoresHandler = async (request, h) => {
  try {
    // sequelize syntax to get all record
    const stores = await Stores.findAll();
    return h.response(stores);
  } catch (error) {
    return h.response(error).code(500);
  }
};

const getStoreByIdHandler = async (request, h) => {
  try {
    // sequelize syntax to get record by primary key
    const store = await Stores.findByPk(request.params.id);
    return h.response(store);
  } catch (error) {
    return h.response(error).code(500);
  }
};

const editStoreByIdHandler = async (request, h) => {
  try {
    // getting id from request parameter
    const { id } = request.params;

    const { storeName, address } = request.payload;

    const findId = await Stores.findByPk(id);

    if (findId !== null) {
      // sequelize syntax to set/update record
      Stores.update({
        storeName,
        address,
      }, { where: { storeId: id } });

      const response = h.response({
        status: 'success',
        message: 'store has been successfully edited',
      });
      return response.code(200);
    }
  } catch (error) {
    return h.response(error).code(500);
  }

  // response when id can't be found
  const response = h.response({
    status: 'fail',
    message: 'failed to edit the store, id can\'t be found',
  });
  response.code(400);
  return response;
};

const deleteStoreByIdHandler = async (request, h) => {
  try {
    // sequelize syntax to delete record from table stores
    const drop = await Stores.destroy({ where: { storeId: request.params.id } });

    if (drop) {
      const response = h.response({
        status: 'success',
        message: 'store has been successfully deleted',
      });
      return response.code(200);
    }
  } catch (error) {
    return h.response(error).code(500);
  }

  // response when id can't be found
  const response = h.response({
    status: 'fail',
    message: 'failed to delete the store, id can\'t be found',
  });
  return response.code(400);
};

module.exports = {
  addStoreHandler,
  getAllStoresHandler,
  getStoreByIdHandler,
  editStoreByIdHandler,
  deleteStoreByIdHandler,
};
