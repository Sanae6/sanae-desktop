var {app, BrowserWindow} = require("electron");
let win;

app.on("ready",()=>{
    win = new BrowserWindow({
        frame: false,
        title: "Sanae's Desktop Shell"
    });
    win.loadFile("static/index.html");
    win.webContents.openDevTools({mode:'undocked'});
    win.show()
});