const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
  name: String,
  studentId: String,
  graduationYear: String,
  program: String,
  email: String,
  company: String,
  role: String,
  placementData: String,
  feedbackStatus: String
});

let modelInstance;
const getModel = () => {
  if (!modelInstance) {
    const { connections } = require('../../config/db');
    if (!connections.alumni) {
      throw new Error("Alumni database connection not initialized yet.");
    }
    modelInstance = connections.alumni.models.Alumni || connections.alumni.model('Alumni', alumniSchema);
  }
  return modelInstance;
};

const handler = {
  get: (target, prop) => {
    const model = getModel();
    const value = model[prop];
    return typeof value === 'function' ? value.bind(model) : value;
  },
  set: (target, prop, value) => {
    getModel()[prop] = value;
    return true;
  },
  construct: (target, args) => {
    const Model = getModel();
    return Reflect.construct(Model, args);
  },
  getPrototypeOf: (target) => {
    return Object.getPrototypeOf(getModel());
  },
  has: (target, prop) => {
    return Reflect.has(getModel(), prop);
  }
};

module.exports = new Proxy({}, handler);