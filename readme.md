## url

```
https://raw.gitmirror.com/Truth1984/web-mod/main/mod-menu.js
```

## init new file with

```js
let u_menu_name = "MENUNAME";
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
```

## script

```js
// @run-at      document-start
// @run-at      document-idle
// @run-at      document-end
// @include     http://www.example.org/*
// @exclude     http://www.example.org/foo

// entry: window.U_Mod_Menu
```
