const mongoose = require("mongoose");
const modelNames = require("../../constants/modelNames");
const mongoosePaginate = require("mongoose-paginate-v2");
const toJSON = require("../plugins/toJSON.plugin");
const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const { toJSON } = require("../plugins");

const schema = new mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: modelNames.group,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    enum: ["24hours", "7days", "1month", "6months"],
    default: "24hours",
  },
});
