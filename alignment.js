// ==UserScript==
// @name         alignment
// @version      0.0.1
// @author       awada
// @match        http://www.example.org/*
// @run-at       document-idle
// @description  put item to left or right
// ==/UserScript==

let u_query = "#id";
let positions = -1; // 0: left, 1: middle, 2: right

let u_menu_name = "alignment";
logs = (...msg) => console.log(...msg);
addModNum = (itemName, itemFunc = (number, store = {}) => {}, initNum = -1, limit = [0, 2]) => {
  console.log(itemName, new Date().toLocaleTimeString());
  if (initNum != -1) itemFunc(initNum, {});
};

if (window.U_Mod_Menu) {
  logs = window.U_Mod_Menu.setLogs(u_menu_name);
  addMod = window.U_Mod_Menu.addMod;
  addModNum = window.U_Mod_Menu.addModNum;
}

let switchStyle = (target, styleMap = {}, revertArr = []) => {
  for (let i of revertArr) target.style[i] = "";
  for (let [i, j] of Object.entries(styleMap)) target.style[i] = j;
};

let alignObject = (positionNum = positions) => {
  let query = u_query;
  let pos = "";
  if (positionNum == 0) pos = "left";
  else if (positionNum == 1) pos = "middle";
  else if (positionNum == 2) pos = "right";
  if (pos) {
    logs("aligning item<", query, ">to<", pos, ">");
    const objs = document.querySelectorAll(query);
    objs.forEach((obj) => {
      obj.style.position = "relative";
      if (pos === "left") switchStyle(obj, { left: "0", textAlign: "left" }, ["transform", "right", "left"]);
      else if (pos === "middle")
        switchStyle(obj, { left: "50%", textAlign: "center", transform: "translateX(-50%)" }, [
          "transform",
          "right",
          "left",
        ]);
      else if (pos === "right") switchStyle(obj, { right: "0", textAlign: "right" }, ["transform", "right", "left"]);
    });
  }
};

addModNum("alignObject", (num) => alignObject(num), positions);
