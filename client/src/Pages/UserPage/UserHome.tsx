
import { ComplexNavbar } from '../../Components/User/Home/NavBar';
import {SidebarWithCta} from '../../Components/User/Home/SideBar';
import {RightSidebarWithCta} from '../../Components/User/Home/RightSideBar';
import {Post} from '../../Components/User/Home/Post'
import { useEffect, useState } from 'react';
import { getAllPost } from '../../API/apiConnections/postConnections';
import { post } from '../../Interfaces/postInterfaces';
function UserHome() {
  const [data, setData] = useState<post[]>([]); //store post datas
  useEffect(() => {
    fetchData()
  },[]);
 //get all post
  const fetchData = async () => {
    
    const posts = await getAllPost();
    console.log("get post...............",posts)
      
      
      setData(posts);
      
   
  };
  return (
    <>
      <ComplexNavbar/>
      <Post data={data} setData={setData}/>
      <SidebarWithCta  setData={setData} data={data}/>
      <RightSidebarWithCta/>
    </>
  )
}

export default UserHome
