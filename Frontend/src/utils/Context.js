let ctx
const setUpContext = (canvasRef, mobileView) => {
    /* dynamically fetching padding and evaluating it to set canvas height and width precisely */
    var style = getComputedStyle(document.body);
    let spacing = style.getPropertyValue('--spacing-large').split('px')[0];
    spacing = parseInt(spacing); // converting to int
    let paddingY = (spacing * 2) / window.innerHeight
    let paddingX = (spacing * 2) / window.innerWidth
    canvasRef.current.width = (0.67 - paddingX) * window.innerWidth;
    canvasRef.current.height = (0.75 - paddingY) * window.innerHeight;
    canvasRef.current.style.width = `${100}%`;
    canvasRef.current.style.height = `${mobileView ? 70 : 75}%`;
    ctx = canvasRef.current.getContext("2d");
    // ctx.lineCap = "round";
    // ctx.strokeStyle = 'black';
    // ctx.lineWidth = 5;
    return ctx
}

export const changeColor = (color) => {
    ctx.strokeStyle = color;
}

export const changeBrushSize = (size) => {
    ctx.lineWidth = size;
}
export default setUpContext