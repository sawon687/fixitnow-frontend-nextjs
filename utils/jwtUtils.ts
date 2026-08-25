import jwt from 'jsonwebtoken'

const verifyToken=(token:string,secret:string)=>{
    try {
        const verifedToken=jwt.verify(token,secret)
        return{
            success:true,
            data:verifedToken
        }
    } catch (error:any) {
           console.log('Token verifed falied',error)
           
        return {
         
            success:false,
            error:error.message
        }
    }
}


export const jwtUtils={
     
     verifyToken
}