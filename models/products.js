const { DataTypes } = require('sequelize');
const connection = require('../db-config/connect');

// create database using models
const Products = connection.define('products', {
  productId: {
    type: DataTypes.STRING(10),
    primaryKey: true,
  },
  productName: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  description: {
    type: DataTypes.TEXT('long'),
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

const createProduct = (productId, productName, category, price, description) => {
  // sequelize syntax for insert into database
  Products.create({
    productId,
    productName,
    category,
    price,
    description,
  }).then((data) => {
    console.log(data.toJSON());
  });
};

const selectAll = () => {
  // sequelize syntax for select all from products table
  Products.findAll({ attributes: ['productName', 'category', 'price', 'description'] }).then((data) => {
    data.forEach((element) => {
      console.log(element.toJSON());
    });
  });
};

const selectById = (id) => {
  // sequelize syntax for filtering by id
  Products.findAll({ attributes: ['productName', 'category', 'price', 'description'], where: { productId: id } }).then((data) => {
    data.forEach((element) => {
      console.log(element.toJSON());
    });
  });
};

const updateProduct = (id, productName, category, price, description) => {
  // sequelize syntax for updating database
  Products.update({
    productName,
    category,
    price,
    description,
  }, { where: { productId: id } }).then((data) => {
    console.log(data.toJSON());
  });
};

const deleteProduct = (id) => {
  // sequelize syntax to deleting row
  Products.destroy({ where: { productId: id } }).then(console.log('successfully deleted'));
};

module.exports = {
  Products,
  createProduct,
  selectAll,
  selectById,
  updateProduct,
  deleteProduct,
};
