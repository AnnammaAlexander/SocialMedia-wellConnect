export interface User {
    firstName:string,
    lastName:string,
    userName:string ,
    email:string ,
    phoneNumber:number ,
    dp:string ,
    coverImag:string
    bio:string |null,
    gender:string |null,
    city:string |null,
    isBlock:boolean|null ,
    blockedUsers:string[] |null,
    followers:string[] |null,
    following:string[] |null,
    requests:string[] |null,
    requested:string[] |null,
    savedItems:string[] 
    token :string|null,
}


export interface resp {
   status: string;
    message: string;
    user: User;
    token: string;
  }
 export interface LoginResponse {
    message: string;
    status: string;
    user: User;
    token: string;
  }
  export interface editProfileValues{
    firstName:string,
    lastName :string ,
    email :string ,
    phoneNumber:string ,
    city :string ,
    gender:string,
    bio:string
  }
  export interface savedimages{
    
    _id:string ,
    postdata:{
    createdAt:string,
    description:string,
    image:string,
    like:[],
    listed:boolean,
    updatedAt:string
    
  },
  postedUserData:{
    dp:string,
    firstName:string,
    lastName:string,
    userName:string,                   
  }

} 
export interface followList{
  
dp:string,
firstName:string ,
lastName:string ,
_id:string,
following:[]

} 
export interface googlelogin{
  firstName:string,
      lastName : string ,
      userName:string,
      email:string
}
export interface reciveMsg{
  chatId: string,
  guestUser: string,
  currentMessage: string,
  _id:string
}
