const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: { type: String, trim: true },
    mosad: { type: mongoose.Types.ObjectId, ref: "Mosad" },
    phone: { type: String, trim: true },
    klasses: [{ type: mongoose.Types.ObjectId, ref: "Klass" }],
    createdAt: { type: Date, default: Date.now },
});

const Teacher = mongoose.model("Teacher", schema);

module.exports = Teacher;
