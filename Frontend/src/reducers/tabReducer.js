export const tabReducer=(state={activeTab:""},action)=>{
    if(action.type==="changeTab"){
        return {...state,activeTab:action.payload}
    }
    return state
}