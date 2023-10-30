import baseURL from "../api";
import { editProfileValues } from "../../Interfaces/userInterfaces";

export const profileImgUpload = async (inputFile: File | null) => {
  try {
    const formData = new FormData();
    if (inputFile !== null) {
      formData.append("uploadProImage", inputFile);
      // console.log("input file...........",inputFile);
      // console.log("formdata....",formData);

      const response = await baseURL.post("/profile/uploadProfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log("response api..",response.data);

      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
//get dp
export const getdp = async (user: string) => {
  try {
    const response = await baseURL.get(`/profile/getdp/${user}`);
    console.log("uuuuuuuu", response);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
//edit profile details
export const profileUpdate = async (values: editProfileValues) => {
  try {
    const response = await baseURL.post("/profile/updateProfile", { values });
    console.log("profileUpdate....:");

    return response.data;
  } catch (error) {
    console.log("error in Api", error);
  }
};

//upload cover photo
export const uploadCoverPhoto = async (inputFile: File | null) => {
  try {
    // console.log("fffffffffff",inputFile);

    const formData = new FormData();
    // console.log("llllllllllll");
    console.log("input file.........", inputFile);

    if (inputFile !== null) {
      // console.log("apl..................");

      formData.append("uploadCover", inputFile);

      const response = await baseURL.post("/profile/uploadCoverpic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response..in api.", response);

      return response.data;
    }
  } catch (error) {
    console.log("error in api ", error);
  }
};
//get saved photos
export const getSavedItems = async () => {
  try {
    const response = await baseURL.get(`/profile/getsaved`);
    // console.log("getSavedItemsresponse...............",response);
    return response.data;
  } catch (error) {
    console.log("error in api ", error);
  }
};
//follow user
export const followUser = async (user: string) => {
  const res = await baseURL.post("/profile/follow", { user });

  return res.data;
};
//get followers

export const getFollowers = async (user: string | undefined) => {
  try {
    const res = await baseURL.get(`/profile/follow/${user}`);
    return res.data;
  } catch (error) {
    console.log("error in api ", error);
  }
};
//get about 
export const getAbout = async(user:string) =>{
    try {
       const res =await baseURL.get(`/profile/about/${user}`) 
       console.log("qqqqqqqqqqqqqqqqq",res.data);
       
       return res.data;
    } catch (error) {
    console.log("error in api ", error);
    }
}
