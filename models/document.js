const mongoose = require('mongoose');
const { Schema } = mongoose;

const documentTypesSchema = new Schema({
  Id: String,
  tag: String
});

const documentSchema = new Schema({
  dropboxId: String,
  tagId: String
});

mongoose.model('documentTypes', documentTypesSchema);
mongoose.model('documents', documentSchema);
