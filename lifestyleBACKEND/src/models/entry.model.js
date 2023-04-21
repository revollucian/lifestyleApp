const mongoose = require('mongoose');
require('dotenv').config()

const entryModel = mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, required: true },
      total_calories: { type: Number, required: true, default: 0 },
      steps: { type: Number, required: true, default: 0 },
      date: { type: Number, required: true },
      products: []
    }
);

const Entry = mongoose.model('Entry', entryModel);
module.exports = Entry;