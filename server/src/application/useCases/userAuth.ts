import { response } from "express";
import { userDbInterface } from "../repositories/userDbRepositories";
import { AuthServiceInterface } from "../services/authServiceInterface";
import bcrypt from "bcryptjs";
export const userSignUp = async (
  user: {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
  },
  authServices: ReturnType<AuthServiceInterface>,
  dbUserRepository: ReturnType<userDbInterface>
) => {
  //  user.email = user.email.toLowerCase();
  const isEmailExist = await dbUserRepository.getUserByEmail(user.email);
  if (isEmailExist) {
    const userData = {
      status: "failed",
      message: "Email already exist",
      user: {},
      token: "",
    };
    return userData;
  }
  const usernameExist = await dbUserRepository.getUserByUserName(user.userName);

  if (usernameExist) {
    const userData = {
      status: "failed",
      message: "username already exist",
      user: {},
      token: "",
    };
    return userData;
  }

  const encryptPassword = await authServices.encryptPassword(user.password);
  user.password = encryptPassword;

  const data = await dbUserRepository.addUser(user);

  const jwtatoken = await authServices.generateToken(data._id?.toString());
  data.password = "";
  const userData = {
    status: "success",
    message: "User Registered",
    user: data,
    token: jwtatoken,
  };
  return userData;
};

export const userLogin = async (
  loginData: {
    userName: string;
    password: string;
  },
  authServices: ReturnType<AuthServiceInterface>,
  dbUserRepository: ReturnType<userDbInterface>
) => {
  const usernameExist = await dbUserRepository.getUserByUserName(
    loginData.userName
  );

  console.log("user name exist...", usernameExist);

  if (usernameExist?.password) {
    const validPassword = await bcrypt.compare(
      loginData.password,
      usernameExist.password
    );

    if (validPassword) {
      if (usernameExist.isBlock) {
        const userData = {
          status: "failed",
          message: "user is blocked",
          user: {},
          token: "",
        };
        return userData;
      } else {
        const jwtatoken = await authServices.generateToken(
          usernameExist._id?.toString()
        );
        usernameExist.password = "";
        const userData = {
          status: "success",
          message: "login success",
          user: usernameExist,
          token: jwtatoken,
        };
        return userData;
      }
    } else {
      const userData = {
        status: "failed",
        message: "password inncorret",
        user: {},
        token: "",
      };
      return userData;
    }
  } else {
    const userData = {
      status: "failed",
      message: "invalid creidentials",
      user: {},
      token: "",
    };
    return userData;
  }
};
//add profile image
export const addProfileImage = async (
  userName: string,
  profileImage: string,
  dbUserRepository: ReturnType<userDbInterface>
) => {
  const response = await dbUserRepository.profileImageRepo(
    userName,
    profileImage
  );
  return response;
};
//get profile image
export const getProfileDp = async (
  userName: string,
  dbUserRepository: ReturnType<userDbInterface>
) => {
  console.log("ppppppppppppppppppppppppppp",userName);
  
  const response = await dbUserRepository.getProImageRepo(userName);
  return response;
};

//signup with google
export const googlesignup = async (
  user: {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
  },
  authServices: ReturnType<AuthServiceInterface>,
  dbUserRepository: ReturnType<userDbInterface>
) => {
  try {
    const isEmailExist = await dbUserRepository.getUserByEmail(user.email);
    if (isEmailExist) {
      const jwtatoken = await authServices.generateToken(
        isEmailExist._id?.toString()
      );
      isEmailExist.password = "";
      const userData = {
        status: "success",
        message: "login success",
        user: isEmailExist,
        token: jwtatoken,
      };
      return userData;
    }
    const data = await dbUserRepository.addUser(user);

    const jwtatoken = await authServices.generateToken(data._id?.toString());
    data.password = "";
    const userData = {
      status: "success",
      message: "User Registered",
      user: data,
      token: jwtatoken,
    };
    return userData;
  } catch (error) {
    console.log("error in usecase..", error);
  }
};
//update profile
export  const profileDetails = async(
    userName: string,
    firstName:string ,
    lastName:string ,
    email:string ,
    phoneNumber:number,
    city:string,
    gender:string,
    bio:string ,
    dbUserRepository:ReturnType<userDbInterface>
)=>{
  try {
    const response = await dbUserRepository.profileDetailsRepo(
      userName,firstName,lastName,email,phoneNumber,city,gender,bio
    )
    return response;
  } catch (error) {
    console.log("error in usecase..", error);

  }
}
//upload cover photo
export const uploaCoverPic = async(userName:string,coverPhoto:string,dbUserRepository:ReturnType<userDbInterface>)=>{
  try {
    const response = await dbUserRepository.uploadCoverPicRepo(userName,coverPhoto)
    return response;
  } catch (error) {
    console.log("error in usecase..", error);

  }
}
//getSaved images
export const getSavedImg =async(userName:string,dbUserRepository:ReturnType<userDbInterface>)=>{
  try {
    const response = await dbUserRepository.getSavedRepo(userName)
    return response;
  } catch (error) {
    console.log("error in usecase..", error);

  }

}
//follow Handler
export const followHander = async(user:string,userName:string,dbUserRepository:ReturnType<userDbInterface>)=>{
  try {
    const res= await dbUserRepository.followHanderRepo(user,userName)
    return res;
  } catch (error) {
    console.log("error in usecase..", error);

  }
}
//get followers list
export const getFollowersList = async(
  user:string,
  dbUserRepository:ReturnType<userDbInterface>
  )=>{
    try {
      const res= await dbUserRepository.followersListRepo(user)
      return res;
    } catch (error) {
      console.log("error in usecase..", error);

    }
  
}
//get about
export const getAbout =async(
  user:string,
  dbUserRepository:ReturnType<userDbInterface>

)=>{
  try {
    const response = await dbUserRepository.getAboutRepo(user)
    return response;
  } catch (error) {
    console.log("error in usecase..", error);
  }
}

