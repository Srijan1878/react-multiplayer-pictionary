const getSpacing = () => {
    var style = getComputedStyle(document.body);
    let spacing = style.getPropertyValue("--spacing-large").split("px")[0];
    spacing = parseInt(spacing); // converting to int
    let paddingY = (spacing * 2) / window.innerHeight;
    let paddingX = (spacing * 2) / window.innerWidth;
    return {
        x: paddingX,
        y: paddingY
    }
}

export default getSpacing