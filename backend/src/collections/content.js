import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  type: { type: String, require: true },
  content: { type: String, require: true },
});

const Content = mongoose.model('content', Schema, 'content');

export default Content;
