exports.CheckRole = (roles) => {
    return (req, res, next) => {

     console.log("role:",req.userData.role)
      console.log("role:",roles)


      if (roles.toLowerCase() !== req.userData.role.toLowerCase()) {
        return next(
          res.status(403).json({
            message: 'Unauthorized user',
          })
        )
      }
      next()
    }
  }