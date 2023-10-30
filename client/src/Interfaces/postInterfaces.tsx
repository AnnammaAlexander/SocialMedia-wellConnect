export interface PostResponse {
    status?: string;
    message?: string;
    userData?: object;
}

export interface post{
    
   _id :string  ,
    postedUser: string ;
    image ?: string;
    like ?: [];
    createdAt: string;
    dp ?: string ;
    description ?:string;
    listed?:boolean ,
    updatedAt :string ,
    reported :[{
        userName:string ,
        selectedOption :string
    }]
}
export interface sngleCmt{
    cmtId: any;
    chatfocus(): unknown;
    // replyHandler: (singleCommentId: string) => Promise<void>;
    replyHandler: (singleCommentId: string) => void;
    getAfterDelete(cmtId: string): unknown;
    
    singleComment: any;
    _id:string,
    commentedUesr ?:[] ,
    comment ?:string ,
    liked ?: [],
    reply ?:[],
    createdAt:string,
    updatedAt:string ,
    reported:[],

}
export interface cmtReply{
    
userName:string,

comment:string,

_id:string




}
 