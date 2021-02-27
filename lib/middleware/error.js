// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  let status = err.status || 500;

  const sameUsername = 'duplicate key value violates unique constraint "users_username_key"';

  if(err.message === sameUsername) {
    err.message = 'This username already exists. Please select another.';
  }

  res.status(status);

  console.log(err);

  res.send({
    status,
    message: err.message
  });
};
