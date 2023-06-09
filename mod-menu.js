// ==UserScript==
// @name         mod-menu
// @version      0.0.4
// @author       awada
// @match        *
// @run-at       document-start
// @description  run mod-menu first, use window.U_Mod_Menu in other scripts
// ==/UserScript==

adding = () => {
  // addMod("logging", (checked, storage) => {
  //   console.log({ checked, storage });
  // });

  // addModNum("nums", (num) => {
  //   console.log("num", num);
  // });

  addMod("clear U_Storage", () => {
    localStorage.clear("U_Storage");
  });

  addMod("logging Panel", (checks) => {
    modConsole.style.display = checks ? "block" : "none";
  });
};

function setLogs(location) {
  return (...msg) => {
    console.log(location, new Date().toLocaleTimeString(), ...msg);
    const consoleElement = document.querySelector("#U_Console");
    if (consoleElement) {
      msgs = location + " " + new Date().toLocaleTimeString() + " " + msg.join(" ") + "\n";
      consoleElement.innerHTML += msgs;
      modConsole.scrollTop = modConsole.scrollHeight - modConsole.clientHeight;
    }
  };
}

let storage = {};
let logs = setLogs("Mod-Menu");

function storeSet(map = {}) {
  storage = Object.assign(storage, map);
  localStorage.setItem("U_Storage", JSON.stringify(storage));
}

if (localStorage.getItem("U_Storage")) {
  storage = JSON.parse(localStorage.getItem("U_Storage"));
} else {
  storage = {
    modBackground: "black",
    modMenuBackground: "black",
    modColor: "white",
    modMenuColor: "white",
    modConsoleBackground: "black",
    modConsoleColor: "white",
  };

  function isBackgroundLight(ele = "html") {
    let element = document.querySelector(ele);
    const bgColor = window.getComputedStyle(element).backgroundColor;
    const colorValues = bgColor.match(/\d+/g).map(Number);
    const brightness = (colorValues[0] * 299 + colorValues[1] * 587 + colorValues[2] * 114) / 1000;
    return brightness < 128;
  }

  if (!isBackgroundLight()) {
    storage.modBackground = "white";
    storage.modMenuBackground = "white";
    storage.modColor = "black";
    storage.modMenuColor = "black";
  }

  storeSet(storage);
}

const modButton = document.createElement("div");
modButton.innerHTML = "<div>Mod</div>";
modButton.style.cssText = `z-index:9999; position:fixed;bottom:20px;right:20px;width:50px;height:50px;background-color:${storage.modBackground};border-radius:50%;color:${storage.modColor};display:flex;justify-content:center;align-items:center;cursor:pointer;user-select:none;`;
document.body.appendChild(modButton);

const modMenu = document.createElement("div");
modMenu.style.cssText = `z-index:9998; position:fixed;bottom:85px;right:20px;width:200px;height:auto;background-color:${storage.modMenuBackground};border-radius:10px;color:${storage.modMenuColor};padding:10px;display:none;user-select:none;`;
document.body.appendChild(modMenu);

const modConsole = document.createElement("textarea");
modConsole.id = "U_Console";
modConsole.readOnly = true;
modConsole.disabled = true;
modConsole.style.cssText = `z-index:9997; position: fixed; bottom: 20px; right: 20px; width: 400px; height: 200px; background-color: rgba(49, 49, 49, 0.5); border-radius: 10px; color: black; padding: 10px; display: none; user-select: none; overflow: scroll;`;
modConsole.innerText = "";
document.body.appendChild(modConsole);

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
    modConsole.style.left = e.clientX - offsetX + "px";
    modConsole.style.top = e.clientY - offsetY + 80 + "px";
    isMoved = true;
  }
});

modButton.addEventListener("mouseup", function () {
  isDragging = false;
});

function addMod(itemName, itemFunc = (checks, store = {}) => {}, initState = false) {
  const modMenuItem = document.createElement("div");
  modMenuItem.innerHTML = `<div style="display: inline-block; width: calc(100% - 60px);">${itemName}</div><label style="display: flex;align-items: center;width: 60px;height: 34px;">
  <input style="margin: auto;" type="checkbox" ${initState ? "checked" : ""}> </label>`;
  modMenuItem.style.cssText = "display:flex; align-items:center; padding:5px; border-bottom:1px solid #ccc;";
  modMenuItem.state = initState;
  if (initState) itemFunc(modMenuItem.state, storage);
  modMenuItem.addEventListener("change", () => {
    modMenuItem.state = !modMenuItem.state;
    logs("Called:", itemName, modMenuItem.state);
    itemFunc(modMenuItem.state, storage);
  });
  modMenu.appendChild(modMenuItem);
}

function addModNum(itemName, itemFunc = (number, store = {}) => {}, initNum = -1, limit = [0, 2]) {
  const modMenuItem = document.createElement("div");
  modMenuItem.innerHTML = `<div style="display:inline-block; text-align:left; width: calc(100% - 80px);">${itemName}</div>
    <div style="display:inline-block; margin-left:auto;">
      <span class="U_plus" style="display: inline-block; cursor: pointer; width:10px; height:20px; background:${storage.modMenuBackground}; color:${storage.modMenuColor}; text-align:center; margin-bottom:2px;">+</span>
      <span class="U_minus" style="display: inline-block; cursor: pointer; width:10px; height:20px; background:${storage.modMenuBackground}; color:${storage.modMenuColor}; text-align:center; margin-top:2px;">-</span>
    </div>
    <div style="display:inline-block; margin-left:auto;">
    <input type="text" value="${initNum}" style="height:20px; width: 20px; text-align: center; font-size: 10px; display:inline-block; vertical-align: middle;height:20px; width: 30px; text-align: center; font-size: 10px; display:inline-block; vertical-align: middle;">
    </div>`;
  modMenuItem.style.cssText = "display:flex; align-items:center; padding:5px; border-bottom:1px solid #ccc;";
  modMenuItem.state = initNum;

  if (initNum != -1) itemFunc(modMenuItem.state, storage);

  const minusBtn = modMenuItem.querySelector(".U_minus");
  const plusBtn = modMenuItem.querySelector(".U_plus");
  const numInput = modMenuItem.querySelector("input");

  minusBtn.addEventListener("click", () => {
    modMenuItem.state = parseInt(numInput.value) - 1;
    modMenuItem.state = modMenuItem.state < limit[0] ? limit[0] : modMenuItem.state;
    numInput.value = modMenuItem.state;
    numInput.dispatchEvent(new Event("change"));
  });

  plusBtn.addEventListener("click", () => {
    modMenuItem.state = parseInt(numInput.value) + 1;
    modMenuItem.state = modMenuItem.state > limit[1] ? limit[1] : modMenuItem.state;
    numInput.value = modMenuItem.state;
    numInput.dispatchEvent(new Event("change"));
  });

  numInput.addEventListener("change", () => {
    modMenuItem.state = parseInt(numInput.value);
    modMenuItem.state = modMenuItem.state < limit[0] ? limit[0] : modMenuItem.state;
    modMenuItem.state = modMenuItem.state > limit[1] ? limit[1] : modMenuItem.state;
    logs("Called:", itemName, modMenuItem.state);
    itemFunc(modMenuItem.state, storage);
  });

  modMenu.appendChild(modMenuItem);
}

adding();

window.U_Mod_Menu = {
  setLogs,
  addMod,
  addModNum,
};
