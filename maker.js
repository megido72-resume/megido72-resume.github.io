class Utils {
    static addChangeListener(selector, callback) {
        document.querySelector(selector).addEventListener("change", function(ev) {
            callback(ev.target);
        });
    }
    static canvasContext(selector) {
        return document.querySelector(selector).getContext("2d");
    }
}
const HIDDEN_FRONT = document.createElement("canvas");
HIDDEN_FRONT.width = 1400;
HIDDEN_FRONT.height = 700;
const HIDDEN_BACK = document.createElement("canvas");
HIDDEN_BACK.width = 1400;
HIDDEN_BACK.height = 700;
const MEGIDO_EN = new Map();
const MEGIDO_TABLE = new Map();
var DrawTarget;
(function(DrawTarget1) {
    DrawTarget1[DrawTarget1["HiddenFront"] = 0] = "HiddenFront";
    DrawTarget1[DrawTarget1["RevealedFront"] = 1] = "RevealedFront";
})(DrawTarget || (DrawTarget = {
}));
function drawText(txt, x, y, w, h, isSubset = true, target = DrawTarget.HiddenFront) {
    const doIt = (fontFamily)=>{
        let ctx;
        if (target == DrawTarget.HiddenFront) {
            ctx = HIDDEN_FRONT.getContext("2d");
        } else {
            ctx = Utils.canvasContext("#megido_front");
        }
        ctx.clearRect(x - 2, y - 2, w + 2 * 2, h + 2 * 2);
        ctx.font = h + `px '${fontFamily}'`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText(txt, x + w / 2, y + h / 2);
    };
    if (isSubset) {
        const font = new FontFace('Kosugi Maru Subset', 'url(/img/Kosugi-Maru-Subset.woff2)');
        font.load().then(()=>{
            document.fonts.add(font);
            doIt("Kosugi Maru Subset");
        });
    } else {
        doIt("Kosugi Maru");
    }
}
function drawHeader() {
    const ctx = HIDDEN_FRONT.getContext("2d");
    ctx.clearRect(0, 0, 1400, 80);
    const img = new Image();
    img.src = "/img/title.png";
    img.onload = ()=>{
        ctx.drawImage(img, 410, 12);
    };
    const font = new FontFace("Zen Kurenaido", "url(/img/Zen-Kurenaido.woff2)");
    font.load().then(()=>{
        document.fonts.add(font);
        const dt = new Date();
        const createdAt = "作成日: " + dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
        ctx.font = 24 + "px 'Zen Kurenaido'";
        ctx.fillStyle = "white";
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";
        ctx.fillText(createdAt, 1370, 65);
    });
}
document.addEventListener("DOMContentLoaded", ()=>{
    Utils.addChangeListener("#name", (target)=>{
        drawText(target.value, 700, 103, 600, 32, false);
    });
    Utils.addChangeListener("#howmany_megido", (target)=>{
        drawText(target.value, 830, 162, 150, 32);
    });
    Utils.addChangeListener("#howmany_sixstar", (target)=>{
        drawText(target.value, 1113, 162, 150, 32);
    });
    Utils.addChangeListener("#player_level", (target)=>{
        drawText(target.value, 830, 217, 150, 32);
    });
    Utils.addChangeListener("#play_style", (target)=>{
        drawText(target.value, 860, 274, 480, 32);
    });
    Utils.addChangeListener("#main_story", (target)=>{
        drawText(target.value, 860, 329, 480, 32);
    });
    Utils.addChangeListener("#favorite_tactics", (target)=>{
        drawText(target.value, 860, 385, 480, 30);
    });
    Utils.addChangeListener("#comment", (target)=>{
        drawText(target.value, 631, 624, 720, 32, false);
    });
    Utils.addChangeListener("#money", (target)=>{
        const ctx = HIDDEN_FRONT.getContext("2d");
        ctx.clearRect(1100, 205, 200, 50);
        let x = 0;
        if (target.value == "plankton") {
            x = 1142;
        } else if (target.value == "dolphin") {
            x = 1205;
        } else if (target.value == "whale") {
            x = 1268;
        } else {
            return;
        }
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";
        ctx.arc(x, 230, 22, 0, 2 * Math.PI);
        ctx.stroke();
    });
    document.querySelectorAll("#favorite_contents input[type='checkbox']").forEach(function(item) {
        item.addEventListener("change", function(ev) {
            const ctx1 = HIDDEN_FRONT.getContext("2d");
            const doCheck = (ctx, x, y)=>{
                const img = new Image();
                img.src = "/img/checkbox.png";
                img.onload = function() {
                    ctx.drawImage(img, x, y, 35, 35);
                };
            };
            const target = ev.target;
            const checked = target.checked;
            switch(target.id){
                case "contents_main":
                    if (checked) {
                        doCheck(ctx1, 865, 436);
                    } else {
                        ctx1.clearRect(865, 436, 35, 35);
                    }
                    break;
                case "contents_event":
                    if (checked) {
                        doCheck(ctx1, 1115, 436);
                    } else {
                        ctx1.clearRect(1115, 436, 35, 35);
                    }
                    break;
                case "contents_pvp":
                    if (checked) {
                        doCheck(ctx1, 865, 466);
                    } else {
                        ctx1.clearRect(865, 466, 35, 35);
                    }
                    break;
                case "contents_daigen":
                    if (checked) {
                        doCheck(ctx1, 1115, 466);
                    } else {
                        ctx1.clearRect(1115, 466, 35, 35);
                    }
                    break;
                case "contents_gacha":
                    if (checked) {
                        doCheck(ctx1, 865, 501);
                    } else {
                        ctx1.clearRect(865, 501, 35, 35);
                    }
                    break;
                case "contents_chara":
                    if (checked) {
                        doCheck(ctx1, 1115, 500);
                    } else {
                        ctx1.clearRect(1115, 500, 35, 35);
                    }
                    break;
                case "contents_reiho":
                    if (checked) {
                        doCheck(ctx1, 865, 536);
                    } else {
                        ctx1.clearRect(865, 536, 35, 35);
                    }
                    break;
                case "contents_raid":
                    if (checked) {
                        doCheck(ctx1, 1115, 533);
                    } else {
                        ctx1.clearRect(1115, 533, 35, 35);
                    }
                    break;
            }
        });
    });
    Utils.addChangeListener("#megidral", (target)=>{
        const ctx = Utils.canvasContext("#megido_overlay");
        const h = 32;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (!document.querySelector("#enable_megidoral").checked) {
            return;
        }
        const font = new FontFace("Megidral", "url(/img/Megidral-Regular.ttf)");
        font.load().then((fnt)=>{
            document.fonts.add(fnt);
            const txt = target.value;
            ctx.font = h + "px 'Megidral'";
            ctx.textAlign = "right";
            ctx.textBaseline = "top";
            ctx.fillStyle = "#CCCCCCDD";
            ctx.fillText(txt, 538, 11);
        });
    });
    Utils.addChangeListener("#megido_image", (target)=>{
        const fileData = target.files[0];
        const reader = new FileReader();
        reader.onload = ()=>{
            const ctx = Utils.canvasContext("#megido_front");
            ctx.clearRect(6, 6, 537, 537);
            const img = new Image();
            img.src = reader.result;
            img.onload = ()=>{
                const w = img.width;
                const h = img.height;
                let sx = 0;
                let sy = 0;
                let sw = 0;
                let sh = 0;
                if (h > w) {
                    sx = 0;
                    sy = (h - w) / 2;
                    sw = w;
                    sh = w;
                } else {
                    sx = (w - h) / 2;
                    sy = 0;
                    sw = h;
                    sh = h;
                }
                ctx.drawImage(img, sx, sy, sw, sh, 6, 6, 537, 537);
            };
        };
        reader.readAsDataURL(fileData);
    });
    Utils.addChangeListener("#enable_megidoral", (_)=>{
        const meg = document.querySelector("#megidral");
        meg.dispatchEvent(new Event("change"));
    });
    Utils.addChangeListener("#recommend_megido", (target)=>{
        const meg = document.querySelector("#megidral");
        const name = MEGIDO_TABLE.get(target.value);
        const en_name = MEGIDO_EN.get(name) || "";
        meg.value = en_name;
        meg.dispatchEvent(new Event("change"));
        drawText(name, 150, 555, 380, 32, true, DrawTarget.RevealedFront);
        const bg = new Image();
        bg.setAttribute("crossorigin", "anonymous");
        bg.src = "/character/character_bg.jpg";
        const ctx = Utils.canvasContext("#megido_front");
        bg.onload = ()=>{
            ctx.clearRect(6, 6, 537, 537);
            ctx.drawImage(bg, 6, 6, 537, 537);
            const img = new Image();
            img.setAttribute("crossorigin", "anonymous");
            img.src = "/character/" + target.value + ".png";
            img.onload = ()=>{
                ctx.drawImage(img, 31, 36, 500, 500);
            };
        };
    });
    document.querySelector("#gen_image").addEventListener("click", (_)=>{
        const canvas = document.createElement("canvas");
        canvas.width = 1400;
        canvas.height = 700;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(HIDDEN_BACK, 0, 0);
        ctx.drawImage(HIDDEN_FRONT, 0, 0);
        ctx.drawImage(document.querySelector("#megido_back"), 22, 77);
        ctx.drawImage(document.querySelector("#megido_front"), 22, 77);
        ctx.drawImage(document.querySelector("#megido_overlay"), 22, 77);
        document.querySelector("#gen_image_description").style.display = "block";
        canvas.toBlob((blob)=>{
            if (!blob) {
                alert("Error: canvas.toBlob cannot create image");
                return;
            }
            const newImg = document.createElement("img");
            const url = URL.createObjectURL(blob);
            newImg.src = url;
            newImg.alt = "メギド履歴書";
            const el_result = document.getElementById("image_result");
            el_result.querySelectorAll("img").forEach((el)=>{
                el.parentNode.removeChild(el);
            });
            el_result.appendChild(newImg);
        });
    });
    document.querySelectorAll("#favorite_contents input[type='checkbox']").forEach((item)=>{
        item.addEventListener("change", (ev)=>{
            const ctx2 = Utils.canvasContext("#megido_front");
            const doCheck = (ctx, x, y)=>{
                const img = new Image();
                img.src = "/img/checkbox.png";
                img.onload = ()=>{
                    ctx.drawImage(img, x, y, 35, 35);
                };
            };
            const target = ev.target;
            const checked = target.checked;
            switch(target.id){
                case "contents_main":
                    if (checked) {
                        doCheck(ctx2, 865, 436);
                    } else {
                        ctx2.clearRect(865, 436, 35, 35);
                    }
                    break;
                case "contents_event":
                    if (checked) {
                        doCheck(ctx2, 1115, 436);
                    } else {
                        ctx2.clearRect(1115, 436, 35, 35);
                    }
                    break;
                case "contents_pvp":
                    if (checked) {
                        doCheck(ctx2, 865, 466);
                    } else {
                        ctx2.clearRect(865, 466, 35, 35);
                    }
                    break;
                case "contents_daigen":
                    if (checked) {
                        doCheck(ctx2, 1115, 466);
                    } else {
                        ctx2.clearRect(1115, 466, 35, 35);
                    }
                    break;
                case "contents_gacha":
                    if (checked) {
                        doCheck(ctx2, 865, 501);
                    } else {
                        ctx2.clearRect(865, 501, 35, 35);
                    }
                    break;
                case "contents_chara":
                    if (checked) {
                        doCheck(ctx2, 1115, 500);
                    } else {
                        ctx2.clearRect(1115, 500, 35, 35);
                    }
                    break;
                case "contents_reiho":
                    if (checked) {
                        doCheck(ctx2, 865, 536);
                    } else {
                        ctx2.clearRect(865, 536, 35, 35);
                    }
                    break;
                case "contents_raid":
                    if (checked) {
                        doCheck(ctx2, 1115, 533);
                    } else {
                        ctx2.clearRect(1115, 533, 35, 35);
                    }
                    break;
            }
        });
    });
    const container = document.querySelector("#canvas_container");
    const calcLeft = (canvas)=>{
        const x = (container.clientWidth - canvas.width) / 2;
        if (x < 0) {
            return "0px";
        } else {
            return `${x}px`;
        }
    };
    const alignCenter = ()=>{
        [
            "#megido_back",
            "#megido_front",
            "#megido_overlay"
        ].forEach((selector)=>{
            const canvas = document.querySelector(selector);
            canvas.style.left = calcLeft(canvas);
        });
    };
    alignCenter();
    const resizeObserver = new ResizeObserver(alignCenter);
    resizeObserver.observe(container);
    const img1 = new Image();
    img1.src = "/img/recommend_bg.png";
    img1.onload = ()=>{
        const ctx = Utils.canvasContext("#megido_back");
        ctx.drawImage(img1, 0, 0, img1.width, img1.height);
    };
    const hiddenBg = new Image();
    hiddenBg.src = "/img/template.png";
    hiddenBg.onload = ()=>{
        const ctx = HIDDEN_BACK.getContext("2d");
        ctx.drawImage(hiddenBg, 0, 0, hiddenBg.width, hiddenBg.height);
        drawHeader();
    };
    fetch("/data/megido_eng.csv").then((data)=>{
        data.text().then((text)=>{
            text.split(/\r?\n/).forEach((line)=>{
                const [jp, en] = line.split(/,/);
                if (en) {
                    MEGIDO_EN.set(jp, en);
                }
            });
        });
    });
    fetch("/data/megido_list.json").then((data)=>{
        data.json().then((json)=>{
            const sel = document.querySelector("#recommend_megido");
            json.list.forEach((item)=>{
                if (item.n) {
                    const opt = document.createElement("option");
                    opt.text = item.name;
                    opt.value = item.n;
                    sel.add(opt);
                    MEGIDO_TABLE.set(item.n, item.name);
                }
                if (item.re_n) {
                    const opt = document.createElement("option");
                    opt.text = item.name + " Re";
                    opt.value = item.re_n;
                    sel.add(opt);
                    MEGIDO_TABLE.set(item.re_n, item.name);
                }
            });
        });
    });
});

