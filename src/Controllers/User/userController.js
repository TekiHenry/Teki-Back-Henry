const Users = require("../../Models/UserModel/UserModel");
const sendMail = require("../../Utils/emailCtrl");
const generateToken = require("../../Utils/jwtEncode");

const userController = () => {};



userController.createUser = async(user) =>{
  try{
    // VALIDATE IF THE EMAIL OR USER IS IN USE
    const validateEmail = await Users.findOne({
      where:{
        email: user.email
      }
    });

    const validateUsername = await Users.findOne({
      where:{
        userName: user.userName
      }
    });

    if(validateEmail){
      return {msg: "Email Error"}
    };
    if(validateUsername){
      return {msg: "Username Error"}
    }

    // CREATE THE USER
    const createUser = await Users.create(user);

    return {msg: "User created", data: createUser.dataValues};

  }catch(error){
    console.log(error);
  }
};

userController.loginUser = async(user) =>{
  try{
    
    const { credential, password } = user;


    const findUserByEmail = await Users.findOne({
      where:{
        email: credential
      }
    });

    const findUserByUsername = await Users.findOne({
      where:{
        userName: credential
      }
    });

    if(!findUserByEmail && !findUserByUsername){
      if(credential.includes("@")){
        return {msg: "Wrong Email"}
      }else{
        return {msg: "Wrong Username"}
      }
    };

    if(findUserByEmail || findUserByUsername){
      const userFound = findUserByEmail ? findUserByEmail : findUserByUsername;

      if(userFound.password === password){
        // Logged succesfully
        return {msg: "User logged", data: userFound}
      }else{
        // Wrong Password
        return {msg: "Wrong Password"};
      }
    }

    
  }catch(error){
    console.log(error);
  }
};

userController.updateUser = async(newUser, userId) =>{
  try{
    
    const findUser = await Users.findOne({
      where:{
        id: userId
      }
    });

    if(!findUser){
      return {msg: "No user found"}
    };

    await findUser.update(newUser);

    await findUser.save();

    return {msg: "User updated", data: findUser};

  }catch(error){
    console.log(error);
  }
};

userController.deleteUser = async(userId) =>{
  try{
    const deleteUser = await Users.destroy({
      where:{
        id: userId
      }
    });

    console.log(deleteUser);
    return {msg: "User deleted"};
  }catch(error){
    console.log(error);
  }
};

userController.disableUser = async(userId) =>{
  try{
    const findUser = await Users.findOne({
      where:{
        id: userId
      }
    });

    if(!findUser){
      return {msg: "User not found"}
    };

    if(findUser){
      if(!findUser.disabled){
        await findUser.update({
          disabled: true
        });

        await findUser.save();

        return {msg: "User disabled", data: findUser}
      }else{
        await findUser.update({
          disabled: false
        });

        await findUser.save();

        return {msg: "User activated", data: findUser}
      }
    };

  }catch(error){
    console.log(error);
  }
  
  // El disable actua como un toggle, si la propiedad DISABLED del user,
  // esta en TRUE, la pone en FALSE, y viceversa.
};


userController.getAllUsers = async() =>{
  try{
    const getAllUsers = await Users.findAll();

    return getAllUsers;

  }catch(error){
    console.log(error);
  }
};




module.exports = userController;
