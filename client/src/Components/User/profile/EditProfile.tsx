
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  
  
  Textarea,
  Radio,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import {profileUpdate} from '../../../API/apiConnections/userProfileConnection'
import { editProfileValues } from "../../../Interfaces/userInterfaces";





// eslint-disable-next-line @typescript-eslint/no-explicit-any
function EditProfile(props:any) {



    const formik = useFormik({
        initialValues:{
          firstName:'',
          lastName:'',
          email:'',
          phoneNumber:'',
          city:'',
          gender:'',
          bio :'',

        
        },
        validationSchema: Yup.object({

        }),
        
        onSubmit:async (values:editProfileValues) => {
          console.log("values..........:",values);
          
          const updateResponse=await profileUpdate(values)
          console.log("profileUpdate....:",updateResponse);
          
          if(updateResponse){
            //  dispatch(setUser(updateResponse));
            //  props.setData(updateResponse.bio)
            props.setEditOpen(!props.editOpen);

          }
          
           
          }
    })
    const handleEdit = () => props.setEditOpen(!props.editOpen);

  return (
    <div>
      <Dialog open={props.editOpen} handler={props.handlEdit}>
        <DialogHeader>Edit profile</DialogHeader>
        <DialogBody divider className="h-[40rem] overflow-scroll">
   
<form onSubmit={formik.handleSubmit}>
        <div className="w-96  m-auto ">
          
      <input className='border-[.1rem] border-gray-400 rounded-md p-2 placeholder:text-sm focus:border-blue-600 w-full' placeholder='firstName' id="firstName"
                {...formik.getFieldProps('firstName')} />
                <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.firstName && formik.errors.firstName ? 
                formik.errors.firstName : null}</p>
       <input className='border-[.1rem] border-gray-400 rounded-md p-2 placeholder:text-sm focus:border-blue-600 w-full' placeholder='lastName' id="lastName"
                {...formik.getFieldProps('lastName')} />
                <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.lastName && formik.errors.lastName ? 
                formik.errors.lastName : null}</p>
        <input className='border-[.1rem] border-gray-400 rounded-md p-2 placeholder:text-sm focus:border-blue-600 w-full' placeholder='email' id="email"
                {...formik.getFieldProps('email')} />
                <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.email && formik.errors.email ? 
                formik.errors.email : null}</p>

         <input className='border-[.1rem] border-gray-400 rounded-md p-2 placeholder:text-sm focus:border-blue-600 w-full' placeholder='phoneNumber' id="phoneNumber"
                {...formik.getFieldProps('phoneNumber')} />
                <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.phoneNumber && formik.errors.phoneNumber ? 
                formik.errors.phoneNumber : null}</p>

          <input className='border-[.1rem] border-gray-400 rounded-md p-2 placeholder:text-sm focus:border-blue-600 w-full ' placeholder='city' id="city"
                {...formik.getFieldProps('city')} />
                <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.city && formik.errors.city ? 
                formik.errors.city : null}</p>
         <div className="flex gap-10">
      <Radio name="type" label="Male" value="Male"  checked={formik.values.gender === 'Male'}  onChange={() => formik.setFieldValue('gender', 'Male')} />
      <Radio name="type" label="Female" value="Female" checked={formik.values.gender === 'Female'}  onChange={() => formik.setFieldValue('gender', 'Female')} />
      <Radio name="type" label="Other" value="Other"   checked={formik.values.gender === 'Other'}   onChange={() => formik.setFieldValue('gender', 'Other')} defaultChecked />
    </div>
        <Textarea label="bio"  className="h-20 w-full"  {...formik.getFieldProps('bio')} />
        <div className=" flex justify-end gap-2 mt-6">
        <Button variant="outlined" color="red" onClick={handleEdit}>
            close
          </Button>
          <Button
  type="submit"
  variant="gradient"
  color="green"
  className="bg-green-500"
  disabled={Object.keys(formik.values).length === 0}
>
  Save changes
</Button>
          </div>
    </div>
      </form>
        </DialogBody>
        {/* <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={handleEdit}>
            close
          </Button>
          <Button type="submit" variant="gradient" color="green" className="bg-green-500">
            Save changes
          </Button>
        </DialogFooter> */}
      </Dialog>
    </div>
  )
}

export default EditProfile
