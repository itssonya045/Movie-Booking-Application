const User = require("../models/user.model")

const createUser = async (data)=>{
    try {
        const response = await User.create(data)
        return response
    } catch (error) {
        if(error.name == "ValidationError"){
            let err ={}
            Object.keys(error.errors).forEach((key)=>{
                err[key] =error.errors[key].message
            })

            throw {err : err , code : 422}
        }
        throw error
        
    }
}   

const getEmail = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("No user found for this email id");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const getUser = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    const error = new Error("No user found with this id");
    error.statusCode = 404;
    throw error;
  }

  return user;
};





module.exports ={
    createUser,
    getEmail,
    getUser
}