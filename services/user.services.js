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

const getUserById = async (id)=>{
  try {
    
    const respose = await User.findById(id)
    if(!respose){
      throw { err : "No user find this id" , code : 404}
    }
    return respose
  } catch (error) {
   
    throw error
    
  }
}


const updateUserRoleorStatus = async (data, userId) => {
  try {
    let updateQuery = {};

    if (data.userRole) {
      updateQuery.userRole = data.userRole;
    }

    if (data.userStatus) {
      updateQuery.userStatus = data.userStatus;
    }

    const response = await User.findByIdAndUpdate(
      userId,
      updateQuery,
      { new: true, runValidators: true }
    );

    if (!response) {
      throw { message: "No user found with this id", code: 404 };
    }

    return response;

  } catch (error) {

    // 🔹 Mongoose validation error
    if (error.name === "ValidationError") {
      let err = {};

      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });

      throw { message: err, code: 400 };
    }

    // 🔹 Other errors
    throw error;
  }
};




module.exports ={
    createUser,
    getEmail,
    getUser,
    getUserById,
    updateUserRoleorStatus
}