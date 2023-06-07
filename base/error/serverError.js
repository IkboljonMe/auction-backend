const serverError = (err, req, res, next) => {
  res.status(500).send({ message: err.message });
};
export default serverError;
