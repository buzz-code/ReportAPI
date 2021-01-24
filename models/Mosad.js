const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
});

const Mosad = mongoose.model("Mosad", schema);

module.exports = Mosad;
