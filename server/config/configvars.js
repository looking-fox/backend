module.exports = {
  cookieOptions: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365
  },
  allowedOrigins: [process.env.FRONTEND_URL]
};
