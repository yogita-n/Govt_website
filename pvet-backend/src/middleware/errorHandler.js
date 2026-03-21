const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Multer file-size error
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      success: false,
      message: 'File too large. Maximum size is 10 MB.',
    });
  }

  // Default 500
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};

export default errorHandler;
