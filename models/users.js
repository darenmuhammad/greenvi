const { DataTypes } = require('sequelize');
const connection = require('../db-config/connect');

// create database using models
const Users = connection.define('users', {
  email: {
    type: DataTypes.STRING(25),
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.DATE,
  },
  phoneNumber: {
    type: DataTypes.STRING(20),
    unique: true,
  },
}, {
  freezeTableName: true,
  timestamps: true,
  updatedAt: false,
  createdAt: 'registrationDate',
});

// Check if email already exist
const isUsernameExist = async (email) => {
  try {
    const existingUser = await Users.findOne({ where: { email } });
    return existingUser !== null;
  } catch (error) {
    console.error('Error checking username existence:', error.message);
    throw error;
  }
};

// Insert new user
const insertUser = async (email, hashedPassword, fullName, address, dateOfBirth, phoneNumber) => {
  try {
    const newUser = await Users.create({
      email,
      password: hashedPassword,
      fullName,
      address,
      dateOfBirth,
      phoneNumber,
    });
    console.log('User inserted:', newUser.toJSON());
  } catch (error) {
    console.error('Error inserting user:', error.message);
    throw error;
  }
};

module.exports = { Users, isUsernameExist, insertUser };
