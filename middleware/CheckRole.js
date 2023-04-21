exports.CheckRole = (...roles) => {
    return (req, res, next) => {
      // console.log(roles,"roles=========================================");
      console.log(req.userData,"============name of role")

      if (!roles.includes(req.userData.roles[0].name.toLowerCase())) {
        return next(
          res.status(403).json({
            message: 'Unauthorized user',
          })
        )
      }
      next()
    }
  }