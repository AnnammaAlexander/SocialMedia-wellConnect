import React, {  useState } from "react";
import {
  
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { BookmarkIcon, FilmIcon, PhotoIcon } from "@heroicons/react/24/outline";
import {
  
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import {
  profileImgUpload,
  
  uploadCoverPhoto,
  getSavedItems,
  followUser,
  getFollowers,
  getAbout,
  
  
} from "../../../API/apiConnections/userProfileConnection";
import {
 
  
  Button,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { User, followList, savedimages } from "../../../Interfaces/userInterfaces";

import {
  CLOUDINARY_COVERPIC_PATH,
  CLOUDINARY_DP_PATH,
  
} from "../../../constants/constant";
import { useDispatch } from "react-redux";
import { setCoverPhoto, setProfileImages } from "../../../redux/Slices/userSlice";
import EditProfile from "./EditProfile";
import {  Typography } from "@material-tailwind/react";
import SavedItems from "./SavedItems";
// import { useParams } from "react-router-dom";
import Followers from "./Followers";
import { useParams } from "react-router-dom";

interface userprofileInterface{
  userDetails:User ,
  setUserDetails:(user:User)=>void
}




const UserProfile:React.FC<userprofileInterface> =({userDetails}) =>{
  const[aboutDetails,srtAboutDetails] = useState(null)
  const {user} = useParams()

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [profileUrl, setProfileUrl] = useState<string>("");
  const handleOpen = () => setOpen(!open);

  const [editOpen, setEditOpen] = React.useState<boolean>(false);
  const handleEdit = () => setEditOpen(!editOpen);
  const [coverImgOpen, setCoverImgOpen] = useState<boolean>(false);
  const [coverImgUrl, setCoverImgUrl] = useState("");
  const [coverPicFile, setCovrPicFile] = useState<File | null>(null);
  const [savedImg,setSavedImg] = useState<savedimages[]>([])
  // const [imageState,setimageState] =useState<boolean>(false)
  // const [data,setData] =useState<string>("")
  const [activeTab, setActiveTab] = useState('posts'); // Default to 'Videos'

  const { dp ,coverImag,userName} = useSelector(
    (store: {
      user: { items: { dp: string; userName: string; bio: string ,coverImag:string} };
    }) => store.user.items
  );
  const [profilePic, setProfilePic] = useState<string>(dp);
  const [coverPhoto ,setCoverPic] = useState<string>(coverImag)


  const status = userDetails?.followers?.includes(userName)
  const [followStatus,setFollowStatus] = useState(status)
  // console.log("followStatus",followStatus);
  
  const [followersData,setFollowersData] =useState<followList[]>([])
  const dispatch = useDispatch();

  //profile pic upload

  function profilePicHandler() {
    handleOpen();
  }

  function uploadfile(event: React.ChangeEvent<HTMLInputElement>) {
    const file: File | null | undefined = event.target.files?.[0];

    // console.log("file", file?.name);
    if (file) {
      setFile(file);
      const url = URL.createObjectURL(file);
      setProfileUrl(url);
    }
  }
  function handleUpload() {
    if (file) {
      profilePicUpload();
      setProfileUrl("");
      setOpen(!open);
    }
  }
  const profilePicUpload = async () => {
    // console.log("file...../",file);

    const response = await profileImgUpload(file);
    // console.log("profileImgUpload response....", response.profileImage);
    setProfilePic(response.profileImage);
    dispatch(setProfileImages(response.profileImage));
  };
 
  
  //cover image
  const handleCoverPic = () => setCoverImgOpen(!coverImgOpen);
  const selectImageFile = (event: React.ChangeEvent<HTMLInputElement>) => {
  
    const coverPicFile :File | null |undefined= event.target.files?.[0];
    if (coverPicFile) {
      setCovrPicFile(coverPicFile);
      const coverurl = URL.createObjectURL(coverPicFile);
      setCoverImgUrl(coverurl);
      // setimageState(!imageState)
    }
  };
  function uploadCoverImage() {
    if (coverPicFile) {
      coverphotoUpload();
      // setimageState(!imageState)

      setCoverImgOpen(!coverImgOpen);
    }
  }
  const coverphotoUpload = async () => {
    const response = await uploadCoverPhoto(coverPicFile);
    if(response){

      //  console.log("reaponsezzzzzzzzzzzz", response?.response.coverImag);

      setCoverPic(response?.response.coverImag)
      const coverPhoto = response?.response?.coverImag;
      dispatch(setCoverPhoto(coverPhoto));

    }
    
  };
  //get saved items
  // const handleSavedItems=async()=>{
  //   const savedImages = await getSavedItems()
  //   console.log("saveedImages",savedImages); 
  //   setSavedImg(savedImages) 
    
  // }
  console.log("savedImg...........aaaaaa",savedImg);
async function FollowHandle(user:string){
  const response = await followUser(user)
  //  setFollowStatus(response)
  if(response){

    setFollowStatus(!followStatus)
  }
}
const handleTabChange = async(tab:string) => {
  setActiveTab(tab);
  if(tab === "Saved" ){
    const savedImages = await getSavedItems()
      // console.log("saveedImages,,,,,,,,,,,,,,,:",savedImages); 
       setSavedImg(savedImages) 
  }else if(tab === "Followers"){
    console.log("hhhhhhhhhhhhh",userDetails?.userName);
    const user=userDetails?.userName
    const follwList =await getFollowers(user)
    // console.log("kkkkkk",follwList);
    
    setFollowersData(follwList)
  }else if(tab ==="About"){
    const user=userDetails?.userName
    const res = await getAbout(user)
    console.log("aboutDetails",aboutDetails);
    srtAboutDetails(res);
    
    

  }



}


  return (
    <div className=" w-screen">
      <div className="max-h-screen  pt-10 w-screen flex justify-center m-auto">
        <figure className="relative shadow-xl w-10/12  h-96 ml-10">
          <img
            className="h-full w-full  rounded-xl object-cover object-center "
            // src={coverPhoto? 
            //   CLOUDINARY_COVERPIC_PATH  + coverPhoto
            //   :"https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"}
            src={
              userDetails?.userName === userName ?
              coverPhoto
              ? CLOUDINARY_COVERPIC_PATH  + coverPhoto    
              : "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
             : userDetails?.coverImag 
             ? CLOUDINARY_COVERPIC_PATH+userDetails?.coverImag
             : "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"

            }
            alt="nature image"
          />
          <div className="flex justify-end">
          {userDetails?.userName === userName ?
            <Button className="  bottom-1 rounded custom-button" onClick={handleCoverPic}>
              change cover photo
            </Button>
            :
           ""
          }
          </div>
          <figcaption>
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex">
                <img
                  className="relative h-80 w-80 -mt-40 ml-10 rounded-full object-cover object-center"
                   src={
                    userDetails?.userName === userName ?
                     profilePic
                      ? CLOUDINARY_DP_PATH + profilePic
                       : "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                  
                  :userDetails?.dp 
                  ? CLOUDINARY_DP_PATH+userDetails?.dp
                     : "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"

                  }
                  alt="nature image"
                />
                {userDetails?.userName === userName?(
                <button className="absolute" onClick={profilePicHandler}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-10 mt-16 ml-80 bg-brown-500 p-1 rounded-full "
                  >
                    <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                    <path
                      fillRule="evenodd"
                      d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                ):null
}

                {/* dialog for  profile image upload       */}
                <Dialog open={open} handler={handleOpen}>
                  <div className="flex items-center flex-wrap justify-center">
                    <div className="">
                      {profileUrl ? (
                        <img
                          className="h-96 w-96 p-8 rounded-full object-cover object-center"
                          src={profileUrl}
                          alt="nature image"
                        />
                      ) : (
                        <img
                          className="h-96 w-96 p-8 rounded-full object-cover object-center"
                          src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                          alt="nature image"
                        />
                      )}
                    </div>
                    <label htmlFor="dropzone-file">
                      <div className="bg-orange-900 p-2 rounded-xl">
                        Choose File
                      </div>
                      <input
                        type="file"
                        name="uploadProImage"
                        id="dropzone-file"
                        className="hidden"
                        onChange={uploadfile}
                      ></input>
                    </label>
                  </div>

                  <DialogFooter>
                    <Button
                      variant="text"
                      color="red"
                      onClick={handleOpen}
                      className="mr-1"
                    >
                      <span>Cancel</span>
                    </Button>
                    <Button
                      variant="gradient"
                      color="green"
                      onClick={handleUpload}
                    >
                      <span>Upload </span>
                    </Button>
                  </DialogFooter>
                </Dialog>

                {/* dialog close */}

                <div className="">
  <Typography
  variant="h5"
  color="blue-gray"
  className="mt-10 ml-10"
  style={{
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Add text shadow
    fontWeight: 'bold', // Add font weight (e.g., bold)
    fontSize: '26px', // Increase font size
    color: 'black', // Change text color
    // Add underline effect
    fontStyle: 'italic', // Apply italic style
  }}
>
  {userDetails?.firstName + " " + userDetails?.lastName}
</Typography>


                  <Typography color="gray" className="ml-8 font-normal">
                    {userDetails?.bio}
                  </Typography>
                  <Typography color="gray" className="ml-8 font-normal">
                    20 followers
                  </Typography>
                </div>
              </div>

              {userDetails?.userName === userName ? (
  <div className="rounded">
    <Button onClick={handleEdit} 
    className="rounded custom-button"
    >
      Edit Profile
    </Button>
    <EditProfile setEditOpen={setEditOpen} editOpen={editOpen} />
  </div>
) :
 
  followStatus ?
  <Button  onClick={()=>FollowHandle(userDetails?.userName)} className="rounded custom-button">
  UnFollow
    </Button>
    :
    <Button  onClick={()=>FollowHandle(userDetails?.userName)} className="rounded custom-button">
        Follow

    </Button>

}


            </div>
          </figcaption>
        </figure>

        <Dialog
          open={coverImgOpen}
          size="xs"
          className="flex flex-col justify-center items-center"
          handler={handleCoverPic}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          {" "}
          <DialogHeader>Add Cover Photo</DialogHeader>
          <DialogBody divider>
            {coverImgUrl ? (
              <div className=" w-40 h-42 mt-3  m-auto gap-2 flex flex-col items-center">
                <div className="">
                  <img src={coverImgUrl} className="object-cover"></img>
                </div>
              </div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-40 h-40 "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                />
              </svg>
            )}
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleCoverPic}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>

            {coverImgUrl ? (
              <div>
                <Button
                  variant="gradient"
                  color="green"
                  onClick={uploadCoverImage}
                >
                  <span>Upload Image</span>
                </Button>
              </div>
            ) : (
              <label htmlFor="dropzone-file">
                <div className="bg-deep-purple-800 p-2 rounded-xl">
                  UploadPost
                </div>
                <input
                  type="file"
                  name="uploadPost"
                  id="dropzone-file"
                  className="hidden"
                  onChange={selectImageFile}
                ></input>
              </label>
            )}
          </DialogFooter>
        </Dialog>

     
      </div>

      {/* //NEXT DIV */}
      <div className="mt-60 m-auto max-w-[70rem] items-center bg-deep-purple-00 justify-center">
      <Tabs value={activeTab}>
        <TabsHeader>
          <Tab value="Images">
            <div className="flex items-center gap-5" onClick={() => handleTabChange('Images')}>
              <PhotoIcon className="w-5 h-5" />
              Images
            </div>
          </Tab>
          <Tab value="Videos">
            <div className="flex items-center gap-2" onClick={() => handleTabChange('posts')}>
              <FilmIcon className="w-5 h-5" />
              posts
            </div>
          </Tab>
          <Tab value="Saved">
            <div className="flex items-center gap-2" onClick={() => handleTabChange('Saved')}>
              <BookmarkIcon className="w-5 h-5" />
              Saved
            </div>
          </Tab>
          <Tab value="About">
            <div className="flex items-center gap-2" onClick={() => handleTabChange('About')}>
              <BookmarkIcon className="w-5 h-5" />
              About
            </div>
          </Tab>
          <Tab value="Followers">
            <div className="flex items-center gap-2" onClick={() => handleTabChange('Followers')}>
              <BookmarkIcon className="w-5 h-5" />
              Followers
            </div>
          </Tab>
          <Tab value="Following">
            <div className="flex items-center gap-2" onClick={() => handleTabChange('Following')}>
              <BookmarkIcon className="w-5 h-5" />
              Following
            </div>
          </Tab>


          </TabsHeader>
          {/* <TabsBody className="grid grid-cols-3 grid-rows-auto m-1 gap-1"> */}
          <TabsBody
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(230px,1fr))",
              gridGap: "5px",
              gridAutoFlow: "dense",
            }}
          >
            {/* {profileData?.posts ? (profileData?.posts?.map((post:postData) =>{
                                    post.profilePic = profilePic
                                    return (
                                    <TabPanel key={post._id} value='Images' className="p-0 w-full h-full max-h-72">
                                        <SinglePostPhoto post={post} />
                                    </TabPanel>)
                                })) : <></>} */}
          </TabsBody>
          <TabsBody
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(230px,1fr))",
              gridGap: "5px",
              gridAutoFlow: "dense",
            }}
          >
            <TabPanel value="posts">
            <div>
            {/* {data.map((post) => (
          <PostCard
            key={post._id}
            postData={post}
            getAfterDelete={getAfterDelete}
            userData ={reduxData}
          />
        ))} */}
            </div>
            </TabPanel>
          </TabsBody>

          <TabsBody>
            <TabPanel value="Saved">
              <div className="flex flex-wrap gap-2  items-center mt-10  ">
                
              {savedImg.map((singleImg)=>(

                <SavedItems 
                 key={singleImg._id}
                 singleImg={singleImg}
                 />
              ))}
                
              </div>
            </TabPanel>
          </TabsBody>



          <TabsBody>
            <TabPanel value="About">
              <div className="flex flex-wrap gap-2  items-center mt-10  ">
                
            {/* <p>  {aboutDetails?.city? aboutDetails?.city :"" }</p> */}
              
              </div>
            </TabPanel>
          </TabsBody>











          <TabsBody>
            <TabPanel value="Followers">
              <div className="flex flex-wrap gap-7 mt-5 ">
                {followersData.map((followListData)=>(
                 <Followers
                 key={followListData._id}
                 followListData={followListData}
                 user={user}
                 />
                ))}
              </div>
           
            </TabPanel>
          </TabsBody>
         
        </Tabs>
      </div>
    </div>
  );
}

export default UserProfile;
