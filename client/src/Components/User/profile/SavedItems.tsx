
import {
    Card,
    CardHeader,
  
  } from "@material-tailwind/react";
//   import { User } from "../../../Interfaces/userInterfaces";
import { savedimages } from "../../../Interfaces/userInterfaces";
import { CLOUDINARY_POST_PATH } from "../../../constants/constant";
 interface savedItemsProps{
  singleImg:savedimages
 }

const SavedItems:React.FC<savedItemsProps>=({singleImg})=> {
    // console.log("userDetails............qqqqqq.",userDetails);
    
  return (
    
    <div className="">
        

      <Card  className="w-60 h-60 m-2 gap-2 mt-16 ">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={CLOUDINARY_POST_PATH + singleImg.postdata.image}
          alt="card-image"
        />
      </CardHeader>
      {/* <CardBody> */}
        {/* {/* <Typography variant="h5" color="blue-gray" className="mb-2">
          
        </Typography>
        <Typography>
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to &quot;Naviglio&quot; where you can enjoy the main
          night life in Barcelona.
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>Read More</Button> */}
      {/* </CardFooter>  */}
    </Card>
        
    </div>
  )
}

export default SavedItems
