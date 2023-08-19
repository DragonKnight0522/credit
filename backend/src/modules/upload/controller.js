export default (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  res.json({ secure_url: req.file.path });
  //res.json({ secure_url: process.env.SERVER_URL + req.file.path });
  //console.log(req.file);
};
