import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react'
import { followList } from '../../../Interfaces/userInterfaces'
import { CLOUDINARY_DP_PATH } from '../../../constants/constant'
interface followersList{
  followListData:followList,
  user:string | undefined
}
const Followers:React.FC<followersList>=({followListData,user})=> {
  console.log("kkkkkkkkkkkkk.",user);
  
// const status = followListData?.following.includes(user)
// console.log(status);
// const [fStatus,setFStatus]=useSatate(status)
//  const [followstatus,setFollowstatus] =useSatate(status)
//  console.log("followstatus",followstatus);
 


  return (
    <Card className="mt-10 w-60" >
      <CardHeader color="blue-gray" className="relative h-46">
        <img
          src={CLOUDINARY_DP_PATH +followListData.dp}
          alt="card-image"
        />
      </CardHeader>
      <div className='flex flex-col '>
      <CardBody>
        <Typography variant="h6" color="blue-gray" className="mb-2">
          {followListData.firstName} {followListData.lastName}
        </Typography>
        
      </CardBody>
      <CardFooter className="pt-0 ">
        <Button >Unfollow</Button>
      </CardFooter>
      </div>
    </Card>
  )
}

export default Followers

// function useSatate(status: boolean): [any, any] {
//   throw new Error('Function not implemented.')
// }

