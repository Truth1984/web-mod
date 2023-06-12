// ==UserScript==
// @name         XXX
// @namespace    Github, web-mod
// @version      0.0.1
// @author       awada
// @match        https://www.example.com/*
// @run-at       document-end
// @description  XXX
// ==/UserScript==

let pre_defined = 0;

let u_menu_name = "XXX";
logs = (...msg) => console.log(...msg);
addMod = (itemName, itemFunc = (checks, store = {}) => {}, initState = false) => {
  console.log(itemName, new Date().toLocaleTimeString());
  if (initState) itemFunc(true, {});
};
addModNum = (itemName, itemFunc = (number, store = {}) => {}, initNum = -1, limit = [0, 2]) => {
  console.log(itemName, new Date().toLocaleTimeString());
  if (initNum != -1) itemFunc(initNum, {});
};

if (window.U_Mod_Menu) {
  logs = window.U_Mod_Menu.setLogs(u_menu_name);
  addMod = window.U_Mod_Menu.addMod;
  addModNum = window.U_Mod_Menu.addModNum;
}

let XdoSomething = (def = pre_defined) => {
  logs("doSomething");
};

document.addEventListener("mouseup", function (e) {
  logs("doSomething");
});

if ("ontouchstart" in window)
  document.addEventListener("touchend", function (e) {
    logs("doSomething");
  });

addMod("remove-img", (state) => XdoSomething(state), false);
addModNum("XXX", (num) => XdoSomething(num), positions);
