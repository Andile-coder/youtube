const videoController = require("../controller/videoController");
const express = require("express");
const router = express.Router();
router.get("/", videoController.video_getAll);
router.post("/", videoController.video_add);
router.delete("/:id", videoController.video_deleteById);
router.put("/:id", videoController.video_updateRating);
module.exports = router;
