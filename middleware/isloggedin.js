import jwt from 'jsonwebtoken';

const isLoggedIn = async (req, res, next) => {
  try {
    // Extracting token from the cookies
    const { token } = req.cookies;

    // If no token, send an unauthorized message
    if (!token) {
      res.status(400).error('You are not logged in');
    }

    // Decoding the token using jwt package verify method
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If decoding fails, send an unauthorized message
    if (!decoded) {
      res.status(401).error('token not identified');
    }

    // If all good, store the decoded payload in the req object
    req.user = decoded;

    // Do not forget to call the next, otherwise, the flow of execution will not be passed further
    next();
  } catch (error) {
    // Handle any errors that occur during token verification
    if (error.name === 'TokenExpiredError') {
      // Token has expired
      return next(new AppError('Token has expired, please log in again', 401));
    }

    // For other errors, you might want to log the error and send a generic unauthorized message
    console.error('Error during token verification:', error);
    return res.status(401).error('token not identified');
  }
};

export default isLoggedIn;