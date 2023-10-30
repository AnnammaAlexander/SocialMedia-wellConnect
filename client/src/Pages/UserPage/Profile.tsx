
import { useEffect, useState } from 'react';
import { ComplexNavbar } from '../../Components/User/Home/NavBar';
import UserProfile from '../../Components/User/profile/UserProfile';
import { User } from '../../Interfaces/userInterfaces';
import { useParams } from 'react-router-dom';
import { getdp } from '../../API/apiConnections/userProfileConnection';

function Profile() {
  const [userDetails, setUserDetails] = useState<User>();

  const {user} = useParams()
  //get uploaded dp

  useEffect(() => {
    async function getUserDp() {
      if(user){

        const response = await getdp(user);
         console.log("response.dp...../", response);
  
        setUserDetails(response);
      }
    }
    getUserDp();
  }, [user]);
  return (
    <div>
      <ComplexNavbar/>
      {userDetails ? <UserProfile userDetails={userDetails}  setUserDetails={setUserDetails} /> : <></>}
    </div>
  )
}

export default Profile;
