let initialState = {
    photo: null
}

const photoReducer = (state=initialState,action)=>{
    switch(action.type) {
        case "DELETE_ONE":
            return {
                ...state,
                photo: action.payload
            }
        case "MARK_ONE": 
            return {
                ...state,
                photo: action.payload
            }
        case "UNMARK_ONE": 
            return {
                ...state,
                photo: action.payload
            }
            
        default: 
        return state
    }
}

export default photoReducer