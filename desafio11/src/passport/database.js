import mongoose from 'mongoose';
import config from '../../config.js';

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

const db = mongoose.model(
  'usuarios',
  new mongoose.Schema({
    id: { type: Number, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  })
);

export const getByName = async (username) => {
  return await db.findOne({ username }, { _id: 0, __v: 0 }).lean();
};

export const save = async (data) => {
  await db.create(data);
};

export const getById = async (id) => {
  return await db.findOne({ id }, { _id: 0, __v: 0 }).lean();
};
