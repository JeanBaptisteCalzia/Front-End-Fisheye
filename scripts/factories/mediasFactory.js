class MediasFactory {
  constructor(data) {
    if (data === data.image) {
      return new Img(data);
    } else if (data === data.video) {
      return new Video(data);
    } else {
      throw "Unknown data format";
    }
  }
}
