export function getIcons() {
  var head = document.getElementsByTagName("head")[0];
  for (let weight of ["regular", "thin", "light", "bold", "fill", "duotone"]) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.crossOrigin = "anonymous";
    link.href =
      "https://unpkg.com/@phosphor-icons/web@2.0.3/src/" + weight + "/style.css";
    head.appendChild(link);
  }
};