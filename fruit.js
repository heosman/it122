"use strict"

import mongoose from 'mongoose';
const { Schema } = mongoose;
import { connectionString } from "./credentials.js";

mongoose.connect(connectionString, {
    dbName: 'sccprojects',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const fruitSchema = new Schema({
 fruitname: { type: String, required: true },
 price: String,
 quantity: Number,
 unit: String
});

export const Fruit = mongoose.model('Fruit', fruitSchema, 'fruits');