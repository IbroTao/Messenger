const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");
const { uploadMany, uploadSingle } = require("../../libs/cloudinary");
const { MESSAGES } = require("../../constants/responseMessages");
const { notificationInfo, communityCommentService } = require("../../services");
const otherConstants = require("../../constants/others");
const { notificationQueue } = require("../../schemas");

const submitComment = catchAsync(async (req, res) => {
  const { body, user } = req;

  const comment = await communityCommentService.createComment(
    body.postId,
    body.content,
    user._id,
    body.parentId || null
  );

  if (!comment)
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, MESSAGES.FAILURE);

  notificationQueue.msg = `${req.user.username} commented on your post`;
  notificationQueue.type = "comment";
  notificationQueue.timestamp = new Date().toISOString();
  notificationQueue.senderId = comment.author;
});

const getComments = catchAsync(async (req, res) => {
  const { limit, page, sortBy, orderBy } = req.query;
  const comments = await communityCommentService.queryComments({
    postId: req.query.postId,
    limit,
    page,
    sortBy,
    orderBy,
  });
  if (!comments)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      MESSAGES.RESOURCE_MISSING
    );
  res.status(200).json(comments);
});

module.exports = {
  submitComment,
  getComments,
};
