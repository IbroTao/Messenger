const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const { uploadSingle, uploadMany } = require("../libs/cloudinary");
const { groupService } = require("../services");
const pick = require("../utils/pick");
const { MESSAGES } = require("../constants/responseMessages");

const createGroup = catchAsync(async (req, res) => {
  const { file, body } = req;

  let data = {
    members: body.members || [],
    admins: [req.user._id],
    name: body.name,
  };
  data.members.push(req.user._id);

  if (file) {
    const { publicId, url } = await uploadSingle(file.path);

    let fileData = {};
  }
});
