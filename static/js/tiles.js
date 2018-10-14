var dir = require("electron-directory");
var path = require("path");
var fs = require("fs");

class AppManager{
    constructor(){
        this.apps = {};
        this.tiles = document.getElementById("tiles");
    }
    /**
     * 
     * @param {string} appid ID of the app
     */
    addTile(appid){
        dir(__dirname).then((info)=>{
            info.getApplicationPath().then((appath)=>{
                var tile = document.createElement("div");
                tile.id = appid;
                tile.classList.add("tile");
                this.tiles.appendChild(tile);
                var titlebar = document.createElement("div");
                titlebar.classList.add("titlebar");                
                tile.appendChild(titlebar);
                dragElement(tile);
                // tile.appendChild(document.createElement("br"));
                var webview = document.createElement("webview");
                webview.classList.add("webview");
                webview.autosize = "on";
                webview.style.minWidth = "300px";
                webview.style.minHeight = "300px";
                webview.style.top = "38px"
                webview.src = "file:///"+path.join(appath,"..","apps",appid,"index.html");
                console.log("file:///"+path.join(appath,"..","apps",appid,"index.html"))
                webview.addEventListener("dom-ready",()=>{
                    console.log("des");
                    webview.getWebContents().insertCSS(fs.readFileSync(path.join(appath,"css","wbv.css")).toString())
                    webview.getWebContents().executeJavaScript("document.title").then((title)=>{
                        titlebar.textContent = title;
                    }).catch(()=>{
                        titlebar.textContent = "Unnamed Tile";
                    });
                })
                tile.appendChild(webview);
                this.apps[appid] = tile;
            });
        });
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    global.apps = new AppManager();
});