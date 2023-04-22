exports.CheckRole = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.userData.role.toLowerCase())) {
        return next(
          res.status(403).json({
            message: 'Unauthorized user',
          })
        )
      }
      next()
    }
  }