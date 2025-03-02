const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Ocurrió un error en el servidor',
    error: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
};

module.exports = errorHandler;
