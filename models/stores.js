const { DataTypes } = require('sequelize');
const connection = require('../db-config/connect');

// create database using models
const Stores = connection.define('stores', {
  storeId: {
    type: DataTypes.STRING(10),
    primaryKey: true,
  },
  storeName: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

// function for query 'insert into'
const createStore = (storeId, storeName, address) => {
  Stores.create({
    storeId,
    storeName,
    address,
  }).then((data) => {
    console.log(data.toJSON());
  });
};

// function for query 'select * from stores'
const selectAll = () => {
  Stores.findAll({ attributes: ['storeName', 'address'] }).then((data) => {
    data.forEach((element) => {
      console.log(element.toJSON());
    });
  });
};

// function for query 'select * from stores where id = ...'
const selectById = (id) => {
  Stores.findAll({ attributes: ['storeName', 'address'], where: { storeId: id } }).then((data) => {
    data.forEach((element) => {
      console.log(element.toJSON());
    });
  });
};

// function for query 'update by filtering storeId'
const updateStore = (id, storeName, address) => {
  Stores.update({
    storeName,
    address,
  }, { where: { storeId: id } }).then((data) => {
    console.log(data.toJSON());
  });
};

// function for query 'delete or destroy by filtering storeId'
const deleteStore = (id) => {
  Stores.destroy({ where: { storeId: id } }).then(console.log('successfully deleted'));
};

module.exports = {
  Stores,
  createStore,
  selectAll,
  selectById,
  updateStore,
  deleteStore,
};
