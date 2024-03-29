import Image from "../models/Image.js";
import Video from "../models/Video.js";

export const MediasFactory = {
  createMedia: function (type) {
    switch (type) {
      case "image":
        return new Image();
      case "video":
        return new Video();
      default:
        return null;
    }
  },
};
