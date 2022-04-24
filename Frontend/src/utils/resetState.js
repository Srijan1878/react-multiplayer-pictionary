
const resetState = (statesArray) => {
    statesArray.map((setState) => {
        setState(0)
        return null
    })
}

export default resetState