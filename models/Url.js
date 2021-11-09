const mongoose = require('mongoose');

const { Schema } = mongoose;

  const URLSchema = new Schema({
    url:  String, 
    slug: String,
  });

const URL = mongoose.model('URL', URLSchema);
module.exports = {URL,URLSchema};