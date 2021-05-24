let initialState = {
    logged: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "Log_In":
            return {
                ...state,
                logged: action.payload
            }

        case "Log_Out":
            return {
                ...state,
                logged: action.payload
            }
        default:
            return state
    }
}

export default authReducer;