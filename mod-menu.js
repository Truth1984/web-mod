// addMod (name, (checked, storage)=>{})

adding = () => {
  addMod("logging", (checked, storage) => {
    console.log({ checked, storage });
  });
};

let storage = {};

const modButton = document.createElement("div");
modButton.innerHTML = "<div>Mod</div>";
modButton.style.cssText =
  "position:fixed;bottom:20px;right:20px;width:50px;height:50px;background-color:black;border-radius:50%;color:white;display:flex;justify-content:center;align-items:center;cursor:pointer;user-select:none;";
document.body.appendChild(modButton);

const modMenu = document.createElement("div");
modMenu.style.cssText =
  "position:fixed;bottom:85px;right:20px;width:200px;height:auto;background-color:black;border-radius:10px;color:white;padding:10px;display:none;user-select:none;";
document.body.appendChild(modMenu);

let isDragging = false;
let isMoved = false;
let offsetX = 0;
let offsetY = 0;

modButton.addEventListener("mousedown", function (e) {
  isDragging = true;
  offsetX = e.clientX - modButton.offsetLeft;
  offsetY = e.clientY - modButton.offsetTop;
});

modButton.addEventListener("click", function () {
  if (!isMoved) modMenu.style.display = modMenu.style.display === "none" ? "block" : "none";
  else isMoved = false;
});

document.addEventListener("mousemove", function (e) {
  if (isDragging) {
    modButton.style.left = e.clientX - offsetX + "px";
    modButton.style.top = e.clientY - offsetY + "px";
    modMenu.style.left = e.clientX - offsetX + "px";
    modMenu.style.top = e.clientY - offsetY + 60 + "px";
    isMoved = true;
  }
});

modButton.addEventListener("mouseup", function () {
  isDragging = false;
});

function addMod(itemName, itemFunc = (checks, store = {}) => {}) {
  const modMenuItem = document.createElement("div");
  modMenuItem.innerHTML = `<div style="display: inline-block; width: calc(100% - 60px);">${itemName}</div><label style="display: flex;align-items: center;width: 60px;height: 34px;">
  <input style="margin: auto;" type="checkbox" > </label>`;
  modMenuItem.style.cssText = "display:flex; align-items:center; padding:5px; border-bottom:1px solid #ccc;";
  modMenuItem.state = false;
  modMenuItem.addEventListener("change", () => {
    modMenuItem.state = !modMenuItem.state;
    itemFunc(modMenuItem.state, storage);
  });
  modMenu.appendChild(modMenuItem);
}

adding();
