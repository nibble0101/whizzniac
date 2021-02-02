function getHeaderHeight() {
    const header = document.querySelector(".header");
    return header ? header.offsetHeight : 0;
}

function getViewportHeight() {
    return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
}
export { getHeaderHeight, getViewportHeight };