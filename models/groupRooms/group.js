const mongoose = require("mongoose");
const modelNames = require("../../constants/modelNames");
const toJSON = require("../plugins/toJSON.plugin");
const mongoosePaginate = require("mongoose-paginate-v2");

const schema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelNames.user,
      required: true,
    },
  ],
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: modelNames.user,
      required: true,
    },
  ],
  muteIds: [{}],
});
