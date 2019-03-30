const mongoose = require("mongoose");

module.exports = mongoose.model("todo", { task: String });
