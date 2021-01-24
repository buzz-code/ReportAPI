const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: { type: String, trim: true },
    mosad: { type: mongoose.Types.ObjectId, ref: "Mosad" },
    createdAt: { type: Date, default: Date.now },
});

const Klass = mongoose.model("Klass", schema);

module.exports = Klass;
