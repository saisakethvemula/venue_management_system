
export const userRegisterReducer = (state={},action)=>{
    switch(action.type){
        case "user_register_success":
            return {userInfo:action.payload}
        case "user_register_fail":
            return {error:action.payload}
        default:
            return state;
    }
}

export const userSigninReducer = (state={userInfo:null,error:false},action)=>{
    switch(action.type){
        case "user_signin_success":
            return {userInfo:action.payload}
        case "user_signin_fail":
            return {error:action.payload}
        case "user_signout":
            return {}
        default:
            return state;
    }
}