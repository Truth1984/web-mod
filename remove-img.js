// ==UserScript==
// @name         remove-img
// @version      0.0.1
// @author       awada
// @match        http://www.example.org/*
// @run-at       document-idle
// @description  remove images
// ==/UserScript==

let u_remove_img_query = "img";

let u_menu_name = "remove-img";
logs = (...msg) => console.log(...msg);
addMod = (itemName, itemFunc = (checks, store = {}) => {}, initState = false) => {
  console.log(itemName, new Date().toLocaleTimeString());
  if (initState) itemFunc(true, {});
};
if (window.U_Mod_Menu) {
  logs = window.U_Mod_Menu.setLogs(u_menu_name);
  addMod = window.U_Mod_Menu.addMod;
}

let rmImg = (query = u_remove_img_query) => {
  logs("remove image with query:", query);
  const images = document.querySelectorAll(query);
  images.forEach((image) => image.remove());
};

addMod("remove-img", () => rmImg(), true);
