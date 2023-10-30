
import { post } from "../../../Interfaces/postInterfaces";

import PostCard from "./PostCard";
import { useSelector } from "react-redux";
interface postInterface {
  data:post[],
  setData:(value:post[])=>void
}
export const Post:React.FC<postInterface> = ({data,setData})=>{
  
  const {...reduxData} = useSelector((store:{user:{items:{userName:string,dp:string ,lastName:string,firstName:string, savedItems:[]}}}) => store.user.items)
 

 
  const getAfterDelete = (postId: string) => {
    const delResult = data.filter((post) => {
      return post._id !== postId;
    });
    setData(delResult);
  };




 
  return (
    <div className="fixed w-screen bg-deep-purple-100">
      <div className="py-10 h-screen flex flex-col items-center overflow-y-scroll no-scrollbar">
        {data.map((post) => (
          <PostCard
            key={post._id}
            postData={post}
            
            getAfterDelete={getAfterDelete}
            userData ={reduxData}
          />
        ))}
      </div>
    </div>
  );
}
