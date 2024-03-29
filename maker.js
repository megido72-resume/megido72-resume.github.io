// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

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
const FULL_WIDTH = 1400;
function createCanvas(width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas;
}
const HIDDEN_FRONT = createCanvas(1400, 700);
const HIDDEN_BACK = createCanvas(1400, 700);
const MEGIDO_BACK = createCanvas(549, 606);
const MEGIDO_FRONT = createCanvas(549, 606);
const MEGIDO_THUMB = createCanvas(549, 606);
const MEGIDO_OVERLAY = createCanvas(549, 606);
const MEGIDO_EN = new Map();
const MEGIDO_TABLE = new Map();
var MEGIDO_LIST = [];
const SPECIAL_TABLE = [
    [
        "",
        ""
    ],
    [
        "ソロモン",
        "solomon"
    ],
    [
        "シバの女王",
        "sheva"
    ]
];
var ShowState;
(function(ShowState) {
    ShowState[ShowState["MegidoFront"] = 0] = "MegidoFront";
    ShowState[ShowState["MegidoThumb"] = 1] = "MegidoThumb";
})(ShowState || (ShowState = {}));
let MEGIDO_SHOW_STATE = ShowState.MegidoFront;
let CAN_I_USE_WEBP = true;
var DrawTarget;
(function(DrawTarget) {
    DrawTarget[DrawTarget["HiddenFront"] = 0] = "HiddenFront";
    DrawTarget[DrawTarget["MegidoOverlay"] = 1] = "MegidoOverlay";
})(DrawTarget || (DrawTarget = {}));
var SortOrder;
(function(SortOrder) {
    SortOrder[SortOrder["Number"] = 0] = "Number";
    SortOrder[SortOrder["Alphabet"] = 1] = "Alphabet";
})(SortOrder || (SortOrder = {}));
async function drawText(txt, x, y, w, h, isSubset = true, target = DrawTarget.HiddenFront) {
    const fontFamily = await new Promise((resolve, _)=>{
        if (isSubset) {
            const font = new FontFace("Kosugi Maru Subset", "url(/img/Kosugi-Maru-Subset.woff2)");
            font.load().then(()=>{
                document.fonts.add(font);
                resolve("Kosugi Maru Subset");
            });
        } else {
            resolve("Kosugi Maru");
        }
    });
    let ctx;
    if (target == DrawTarget.HiddenFront) {
        ctx = HIDDEN_FRONT.getContext("2d");
    } else {
        ctx = MEGIDO_OVERLAY.getContext("2d");
    }
    ctx.clearRect(x - 2, y - 2, w + 2 * 2, h + 2 * 2);
    ctx.font = h + `px '${fontFamily}'`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    ctx.fillText(txt, x + w / 2, y + h / 2);
}
function showMegidoAsImg() {
    const canvas = createCanvas(549, 606);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(MEGIDO_BACK, 0, 0);
    if (MEGIDO_SHOW_STATE == ShowState.MegidoThumb) {
        ctx.drawImage(MEGIDO_THUMB, 0, 0);
    } else {
        ctx.drawImage(MEGIDO_FRONT, 0, 0);
    }
    ctx.drawImage(MEGIDO_OVERLAY, 0, 0);
    return new Promise((resolve, reject)=>{
        canvas.toBlob((blob)=>{
            if (!blob) {
                alert("Error: canvas.toBlob cannot create image");
                reject();
            } else {
                const img = document.getElementById("megido_img");
                const url = URL.createObjectURL(blob);
                img.onload = ()=>{
                    URL.revokeObjectURL(url);
                };
                img.src = url;
                resolve();
            }
        });
    });
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
function simpleChangeListeners() {
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
}
function favoriteContentListener() {
    document.querySelectorAll("#favorite_contents input[type='checkbox']").forEach(function(item) {
        item.addEventListener("change", function(ev) {
            const ctx = HIDDEN_FRONT.getContext("2d");
            const doCheck = (ctx, x, y)=>{
                const img = new Image();
                img.src = "/img/checkbox.png";
                img.onload = function() {
                    ctx.drawImage(img, x, y, 35, 35);
                };
            };
            const target = ev.target;
            const checked = target.checked;
            const checkOrClear = (x, y)=>{
                if (checked) {
                    doCheck(ctx, x, y);
                } else {
                    ctx.clearRect(x, y, 35, 35);
                }
            };
            switch(target.id){
                case "contents_1":
                    checkOrClear(865, 436);
                    break;
                case "contents_2":
                    checkOrClear(1115, 436);
                    break;
                case "contents_3":
                    checkOrClear(865, 468);
                    break;
                case "contents_4":
                    checkOrClear(1115, 468);
                    break;
                case "contents_5":
                    checkOrClear(865, 502);
                    break;
                case "contents_6":
                    checkOrClear(1115, 502);
                    break;
                case "contents_7":
                    checkOrClear(865, 537);
                    break;
                case "contents_8":
                    checkOrClear(1115, 536);
                    break;
            }
        });
    });
}
function drawMegidoFront(stem) {
    return new Promise((resolve, _)=>{
        const bg = new Image();
        bg.setAttribute("crossorigin", "anonymous");
        bg.src = "/character/character_bg.jpg";
        const ctx = MEGIDO_FRONT.getContext("2d");
        bg.onload = ()=>{
            ctx.clearRect(6, 6, 537, 537);
            ctx.drawImage(bg, 6, 6, 537, 537);
            if (stem) {
                const img = new Image();
                img.setAttribute("crossorigin", "anonymous");
                img.src = `/character/${stem}.png`;
                img.onload = ()=>{
                    ctx.drawImage(img, 21, 21, 520, 520);
                    resolve();
                };
            } else {
                resolve();
            }
        };
    });
}
function drawMegidoThumb(stem) {
    return new Promise((resolve, _)=>{
        const ctx = MEGIDO_THUMB.getContext("2d");
        const img = new Image();
        img.setAttribute("crossorigin", "anonymous");
        const ft = CAN_I_USE_WEBP ? "webp" : "jpg";
        img.src = `/thumbnail/${stem}.${ft}`;
        img.onload = ()=>{
            ctx.clearRect(6, 6, 537, 537);
            ctx.drawImage(img, 6, 6, 537, 537);
            resolve();
        };
    });
}
function drawMegidoListener() {
    async function drawMegidral(txt) {
        const ctx = MEGIDO_OVERLAY.getContext("2d");
        ctx.clearRect(0, 0, ctx.canvas.width, 550);
        if (!document.querySelector("#enable_megidral").checked) {
            return;
        }
        const font = await new FontFace("Megidral", "url(/img/Megidral-Regular.ttf)").load();
        document.fonts.add(font);
        const color = document.querySelector("rgba-string-color-picker").color;
        let fontSize = document.querySelector("#megidral_size").value;
        ctx.font = fontSize + "px 'Megidral'";
        const pos = document.querySelector("#megidral_pos").value;
        let x, y;
        switch(pos){
            case "lower_left":
                x = 11;
                y = 538;
                ctx.textAlign = "left";
                ctx.textBaseline = "bottom";
                break;
            case "lower_right":
                x = 538;
                y = 538;
                ctx.textAlign = "right";
                ctx.textBaseline = "bottom";
                break;
            case "upper_left":
                x = 11;
                y = 11;
                ctx.textAlign = "left";
                ctx.textBaseline = "top";
                break;
            case "upper_center":
                x = 275;
                y = 11;
                ctx.textAlign = "center";
                ctx.textBaseline = "top";
                break;
            case "lower_center":
                x = 275;
                y = 538;
                ctx.textAlign = "center";
                ctx.textBaseline = "bottom";
                break;
            default:
                x = 538;
                y = 11;
                ctx.textAlign = "right";
                ctx.textBaseline = "top";
                break;
        }
        ctx.fillStyle = color;
        ctx.fillText(txt, x, y);
    }
    Utils.addChangeListener("#megidral", async (target)=>{
        await drawMegidral(target.value);
        showMegidoAsImg();
    });
    Utils.addChangeListener("#megido_image", (target)=>{
        if (!target.files?.length) {
            return;
        }
        const fileData = target.files?.item(0);
        if (fileData.name) {
            const txtElem = document.querySelector("#megido_image_txt");
            txtElem.innerText = fileData.name.substring(0, 8);
        }
        const reader = new FileReader();
        reader.onload = ()=>{
            const ctx = MEGIDO_FRONT.getContext("2d");
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
                MEGIDO_SHOW_STATE = ShowState.MegidoFront;
                showMegidoAsImg();
            };
        };
        reader.readAsDataURL(fileData);
    });
    Utils.addChangeListener("#enable_megidral", (_)=>{
        const meg = document.querySelector("#megidral");
        meg.dispatchEvent(new Event("change"));
    });
    async function drawMegidoName(name, isSubset) {
        await drawText(name, 150, 555, 380, 32, isSubset, DrawTarget.MegidoOverlay);
    }
    Utils.addChangeListener("#recommend_megido_name", async (el)=>{
        await drawMegidoName(el.value, false);
        showMegidoAsImg();
    });
    Utils.addChangeListener("#recommend_megido", async (target)=>{
        const name = MEGIDO_TABLE.get(target.value) || "";
        const en_name = MEGIDO_EN.get(name) || "";
        document.querySelector("#megidral").value = en_name;
        document.querySelector("#recommend_megido_name").value = name;
        if (target.value) {
            const imgPromise = drawMegidoThumb(target.value);
            await Promise.all([
                drawMegidral(en_name),
                drawMegidoName(name, true),
                imgPromise
            ]);
        } else {
            MEGIDO_THUMB.getContext("2d")?.clearRect(0, 0, 549, 606);
            MEGIDO_OVERLAY.getContext("2d")?.clearRect(0, 0, 549, 606);
        }
        MEGIDO_SHOW_STATE = ShowState.MegidoThumb;
        showMegidoAsImg();
    });
    Utils.addChangeListener("#megidral_pos", (_)=>{
        document.querySelector("#megidral").dispatchEvent(new Event("change"));
    });
    Utils.addChangeListener("#megidral_size", (_)=>{
        document.querySelector("#megidral").dispatchEvent(new Event("change"));
    });
}
function bottomButtonListener() {
    document.querySelector("#toggle_detail_conf").addEventListener("click", (_)=>{
        const el = document.querySelector("#detail_conf");
        el.classList.toggle("d-none");
    });
    document.querySelector("#gen_image").addEventListener("click", async (_)=>{
        const canvas = createCanvas(1400, 700);
        const ctx = canvas.getContext("2d");
        let promise = null;
        if (MEGIDO_SHOW_STATE == ShowState.MegidoThumb) {
            const stem = document.querySelector("#recommend_megido").value;
            promise = drawMegidoFront(stem);
        } else {
            promise = new Promise((resolve, _)=>{
                resolve();
            });
        }
        await promise;
        ctx.drawImage(HIDDEN_BACK, 0, 0);
        ctx.drawImage(HIDDEN_FRONT, 0, 0);
        ctx.drawImage(MEGIDO_BACK, 22, 77);
        ctx.drawImage(MEGIDO_FRONT, 22, 77);
        ctx.drawImage(MEGIDO_OVERLAY, 22, 77);
        document.querySelector("#gen_image_description").classList.remove("d-none");
        canvas.toBlob((blob)=>{
            if (!blob) {
                alert("Error: canvas.toBlob cannot create image");
                return;
            }
            const newImg = document.createElement("img");
            const url = URL.createObjectURL(blob);
            newImg.src = url;
            newImg.alt = "メギド履歴書";
            newImg.style.width = "100%";
            newImg.style.height = "auto";
            newImg.style.maxWidth = `${FULL_WIDTH}px`;
            const el_result = document.getElementById("image_result");
            el_result.querySelectorAll("img").forEach((el)=>{
                el.parentNode.removeChild(el);
            });
            el_result.appendChild(newImg);
        });
    });
}
function switchSortOrderListener() {
    let elem = document.querySelector("#switch_sort_order");
    const ATTR_NAME = "sortOrderNumber";
    elem.addEventListener("click", (ev)=>{
        if (elem.dataset[ATTR_NAME]) {
            switchSortOrder(SortOrder.Alphabet);
            delete elem.dataset[ATTR_NAME];
            elem.innerText = "五十音順";
        } else {
            switchSortOrder(SortOrder.Number);
            elem.dataset[ATTR_NAME] = "true";
            elem.innerText = "番号順";
        }
    });
}
function switchSortOrder(order) {
    const sel = document.querySelector("#recommend_megido");
    let currentValue = sel.value;
    sel.replaceChildren();
    SPECIAL_TABLE.forEach(([ja, fn])=>{
        const opt = document.createElement("option");
        opt.text = ja;
        opt.value = fn;
        sel.add(opt);
    });
    let sorted;
    if (order == SortOrder.Number) {
        sorted = MEGIDO_LIST;
    } else {
        sorted = MEGIDO_LIST.toSorted((item1, item2)=>item1.name.localeCompare(item2.name));
    }
    sorted.forEach((item)=>{
        if (item.n) {
            const opt = document.createElement("option");
            opt.text = item.name;
            opt.value = item.n;
            sel.add(opt);
        }
        if (item.re_n) {
            const opt = document.createElement("option");
            opt.text = item.name + " Re";
            opt.value = item.re_n;
            sel.add(opt);
        }
    });
    sel.value = currentValue;
}
function startUp() {
    const img = new Image();
    img.src = "/img/recommend_bg.png";
    img.onload = ()=>{
        const ctx = MEGIDO_BACK.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
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
            MEGIDO_LIST = json.list;
            SPECIAL_TABLE.forEach(([ja, fn])=>{
                MEGIDO_TABLE.set(fn, ja);
            });
            MEGIDO_LIST.forEach((item)=>{
                if (item.n) {
                    MEGIDO_TABLE.set(item.n, item.name);
                }
                if (item.re_n) {
                    MEGIDO_TABLE.set(item.re_n, item.name);
                }
            });
            switchSortOrder(SortOrder.Alphabet);
        });
    });
}
function colorPicker() {
    const picker = document.querySelector("rgba-string-color-picker");
    picker.addEventListener("color-changed", (_)=>{
        document.querySelector("#megidral").dispatchEvent(new Event("change"));
    });
}
function checkWebp(feature) {
    const kTestImages = {
        lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
        lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
        alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
        animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
    };
    const img = new Image();
    const callback = function(result) {
        CAN_I_USE_WEBP = result;
    };
    img.onload = function() {
        const result = img.width > 0 && img.height > 0;
        callback(result);
    };
    img.onerror = function() {
        callback(false);
    };
    img.src = "data:image/webp;base64," + kTestImages[feature];
}
document.addEventListener("DOMContentLoaded", ()=>{
    simpleChangeListeners();
    favoriteContentListener();
    drawMegidoListener();
    bottomButtonListener();
    startUp();
    colorPicker();
    checkWebp("lossy");
    switchSortOrderListener();
});
