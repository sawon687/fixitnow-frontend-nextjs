'use server'
type LoginState={
    success:boolean,
    message:string,
    status:number,
    data:{
        acccessToken:string,
        refreshToken:string,
    }
}
export const loginAction = async (prevState:LoginState,fromdata: FormData) => {
    console.log(prevState)
  const email = fromdata.get('email')
  const password = fromdata.get('password')
  console.log('email',password,'email',email)
  const loginPayload = {
    email,
    password,
  }
  console.log(process.env.API_URL)

  const res = await fetch(`${process.env.API_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(loginPayload),
  })

   
  const result = await res.json()

  console.log(result,'login')
  return result
}