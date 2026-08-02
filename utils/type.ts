export type TState={
    success:boolean,
    message:string,
    status:number,
    data?:{
        acccessToken:string,
        refreshToken:string,
    }
}