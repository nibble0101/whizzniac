function getHeaderHeight() {
  const header = document.querySelector(".header");
  return header ? header.offsetHeight : 0;
}

function getViewportHeight() {
  return Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
}

function getSelectElementWidth() {
  const selectElement = document.querySelector("#select");
  return selectElement ? `${selectElement.offsetWidth}px` : "auto";
}
export { getHeaderHeight, getViewportHeight, getSelectElementWidth };
