import sharp from 'sharp';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  console.log(req.file.path);

  try {
    const thumbnailPath = `uploads/${req.file.filename}_thumb.png`;

    await sharp(req.file.path).resize(160, 160).png().toFile(thumbnailPath);

    next();
  } catch (error) {
    next(error);
  }
};

export {createThumbnail};
