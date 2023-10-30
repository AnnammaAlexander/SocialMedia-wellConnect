import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUserDetails } from "../../../redux/Slices/userSlice";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  // Card,
  IconButton,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  //   CubeTransparentIcon,
  UserCircleIcon,
  //   CodeBracketSquareIcon,
  //   Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  // RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import { CLOUDINARY_DP_PATH } from "../../../constants/constant";
import { chatSearch } from "../../../API/apiConnections/chatConnection";
import { User } from "../../../Interfaces/userInterfaces";

// profile menu component

export function ProfileMenu() {
  console.log("entering navbar");

  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function logout() {
    localStorage.removeItem("token");
    dispatch(clearUserDetails());
    navigate("/");
  }
  const navigate = useNavigate();
  // const closeMenu = () => setIsMenuOpen(false);
  const profileMenuItems = [
    // {
    //   label: "My Profile",
    //   to: "/userProfile",
    //   icon: UserCircleIcon,
    // },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
    },
    {
      label: "Inbox",
      icon: InboxArrowDownIcon,
    },
    {
      label: "Help",
      icon: LifebuoyIcon,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      // onclick:logout(),
      // function:logout()
    },
  ];

  const { userName,dp } = useSelector(
    (store: { user: { items: { userName:string,dp: string } } }) => store.user.items
  );

  const getProfileHandle =()=>{
    navigate(`/${userName}`)
  }

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          {dp ? (
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src={CLOUDINARY_DP_PATH + dp}
            />
          ) : (
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
          )}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
      <MenuItem onClick={getProfileHandle} ><UserCircleIcon className="w-5 h-5"/>My Profile</MenuItem>
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label} // Provide a unique key prop here
              onClick={() => {
                if (isLastItem) logout();
              }}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);
const [searchInput,setSearchInput] = useState<string>("")
const [searchResult,setSearchResult]=useState<User[]>([])
// const [open, setOpen] = React.useState(false);
  

const searchPeople =async()=>{
  
  const Searchresponse  =await chatSearch(searchInput)
  setSearchResult(Searchresponse)
  console.log("response.setSearchResult.........",searchResult);
  handleOpen();
  
}
const [open, setOpen] = React.useState(false);

const handleOpen = () => setOpen(!open);

const navigate=useNavigate()
function handleProfile(user:string){
  setOpen(!open)

  navigate(`/${user}`)
}
  return (
    <div className="flex w-screen  bg-deep-purple-100 fixed z-50">
      {/* <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6 mt-2 bg-light-blue-200 "> */}
      <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6 mt-2 bg-light-blue-200 h-16">
        <div className="relative mx-auto flex items-center text-blue-gray-900 justify-center">
          <Typography
            as="a"
            href="#"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-medium "
            style={{ color: '#9370DB', textShadow: '2px 2px royalblue', fontSize: '24px', fontWeight: 'bold' }}
          >
            WellConnect
          </Typography>
          <button>
            <Link to={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
                stroke="orange"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
            </Link>
          </button>
          <div className="relative flex w-full m-auto gap-2 md:w-max ">
            <Input
              type="search"
              onChange={(event)=>setSearchInput(event.target.value)}
              color="white"
              label="Type here..."
              className="pr-20 relative"
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
  <Button
  onClick={searchPeople}
  size="sm"
  className="!absolute right-1 top-1 rounded custom-button" // Apply your custom class here
>
  Search
</Button>



          </div>
          <div className="  bg-brown-300 absolute mt-80 w-96 rounded ">
          
          <Dialog open={open} handler={handleOpen} size="xs">
        <DialogHeader>search result</DialogHeader>
        <DialogBody divider>
        {searchResult !==null? searchResult.map((ele)=>(
          <>
          <div className="flex p-2">
          <div className="">
            <Avatar
              variant="circular"
              size="xl"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src={CLOUDINARY_DP_PATH + ele?.dp} />
          </div>
          <div className=" p-5">
          <button onClick={() => handleProfile(ele?.userName)}>
              <Typography color="blue-gray" variant="h5" >
                {ele?.firstName} {ele?.lastName}
              </Typography>

              </button>

            </div>
            </div>
            </>
          
       
          ))
        : <p>
          no user
        </p>
        }
          </DialogBody>
        



        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>

        </DialogFooter>
      </Dialog>
        
          
          {/* {searchResult ? searchResult.map((ele)=>(
                <MenuItem  className="bg-blue-gray-50 w-80 m-auto mt-5 flex gap-3 ">
                   
                    <Avatar
                      variant="circular"
                      size="sm"
                      alt="tania andrew"
                      className="border border-gray-900 p-0.5"
                      src={CLOUDINARY_DP_PATH + ele?.dp}
                    />
                    <div className="">
                        
                        <Typography color="blue-gray" variant="h6" onClick={()=>handleProfile(ele?.userName)} >
                        {ele?.firstName} {ele?.lastName}
                        </Typography>
                      
                      
                     
                    </div>
                  </MenuItem> 

))
:
<p>no result</p>
          } */}
          </div>

          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>
          <ProfileMenu />
        </div>
        <MobileNav open={isNavOpen} className="overflow-scroll">
          {/* <NavList /> */}
        </MobileNav>
      </Navbar>
    </div>
  );
}
