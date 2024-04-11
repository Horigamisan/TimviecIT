const mongoose = require('mongoose');

const connect = async () => {
  try {
    mongoose.set('strictQuery', true);

    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connect db successfully');
  } catch (error) {
    console.log('Fail to connect db');
  }
};

module.exports = { connect };
