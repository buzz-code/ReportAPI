const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: { type: String, trim: true },
    klass: { type: mongoose.Types.ObjectId, ref: "Klass" },
    mosad: { type: mongoose.Types.ObjectId, ref: "Mosad" },
    createdAt: { type: Date, default: Date.now },
});

const Student = mongoose.model("Student", schema);

module.exports = Student;
