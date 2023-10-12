const User = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timeStamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`
    timestamp: ${timeStamp}
    method used: ${method}
    url: http:localhost:9000${url}
  `)
  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const { id } = req.params;
  try{
    const user = await User.getById(id);

    if(!user){
      res.status(404).json({
        message: `/not found/${id}`
      })
    }
    else{
      req.user = user;
      next();
    }
  }catch(err){
    res.status(500).json({message: 'There was a problem with accessing the user'})
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body;
  if(!name || !name.trim()){
    res.status(400).json({message: 'missing required name field'})
  }
  else{
    req.name = name.trim();
    next();
  }
}

async function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body;
  if(!text || !text.trim()){
    res.status(400).json({message: 'missing required text field'});
  }else{
    req.text = text.trim();
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}