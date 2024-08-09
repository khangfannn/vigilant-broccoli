const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  role: { type: Number, required: true, default: 1 },
});

module.exports = mongoose.models.users || mongoose.model('users', usersSchema);
