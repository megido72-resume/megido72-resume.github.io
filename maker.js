
var MEGIDO_EN = {}
var MEGIDO_TABLE = {}

function drawText(txt, x, y, w, h) {
  drawTextSync(txt, x, y, w, h)
  // wait for 1 seconds to load font, and write again. what a dirty hack!!
  setTimeout(function(){
    drawTextSync(txt, x, y, w, h)
  }, 1000)
}

function drawTextSync(txt, x, y, w, h) {
  var ctx = document.getElementById('megido_front').getContext('2d');
  ctx.clearRect(x, y, w, h)
  ctx.font = h + "px 'Kosugi Maru'";
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = "white";
  ctx.fillText(txt, x + w/2, y + h/2);
}

function drawHeader() {
  drawHeaderSync()
  // wait for 2 seconds to load font, and write again. what a dirty hack!!
  setTimeout(drawHeaderSync, 2000)
}
function drawHeaderSync(){
  var ctx = document.getElementById('megido_front').getContext('2d');
  ctx.clearRect(0, 0, 1400, 80)
  txt = "メギド履歴書"
  ctx.font = 38 + "px 'Mochiy Pop P One'";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor="black";
  ctx.shadowBlur=7;
  ctx.strokeStyle = "blue";
  ctx.strokeText(txt,700,38);
  ctx.shadowBlur=0;
  ctx.fillStyle="#ddccff";
  ctx.fillText(txt,700,38);
  dt = new Date();
  txt = "作成日: " + dt.getFullYear() + "/" + (dt.getMonth()+1) + "/" + dt.getDate();
  ctx.font = 24 + "px 'Zen Kurenaido'"
  ctx.fillStyle="white";
  ctx.textAlign = "right"
  ctx.txtBaseline = "bottom"
  ctx.fillText(txt,1370,65);
}
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("name").addEventListener("change", function(ev){
    drawText(ev.target.value, 700, 103, 600, 32);
  })
  document.getElementById("howmany_megido").addEventListener("change", function(ev){
    drawText(ev.target.value, 830, 162, 150, 32);
  })
  document.getElementById("howmany_sixstar").addEventListener("change", function(ev){
    drawText(ev.target.value, 1113, 162, 150, 32);
  })
  document.getElementById("player_level").addEventListener("change", function(ev){
    drawText(ev.target.value, 830, 217, 150, 32);
  })
  document.getElementById("play_style").addEventListener("change", function(ev){
    drawText(ev.target.value, 860, 274, 480, 32);
  })
  document.getElementById("main_story").addEventListener("change", function(ev){
    drawText(ev.target.value, 860, 329, 480, 32);
  })
  document.getElementById("favorite_tactics").addEventListener("change", function(ev){
    drawText(ev.target.value, 860, 385, 480, 30);
  })
  document.getElementById("comment").addEventListener("change", function(ev){
    drawText(ev.target.value, 631, 624, 720, 32);
  })
  document.getElementById("money").addEventListener("change", function(ev){
    var ctx = document.getElementById("megido_front").getContext("2d")
    ctx.clearRect(1100, 205, 200, 50)
    var x = 0;
    var y = 230;
    if(ev.target.value == "plankton"){
      x = 1142;
    }else if(ev.target.value == "dolphin"){
      x = 1205;
    }else if(ev.target.value == "whale"){
      x = 1268;
    }else{
      return
    }
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";
    ctx.arc(x, y, 22, 0, 2 * Math.PI);
    ctx.stroke();
  })
  document.getElementById("megidral").addEventListener("change", function(ev){
    var ctx = document.getElementById('megido_overlay').getContext('2d');
    var x = 560;
    var y = 88;
    var w = 540;
    var h = 32;
    var margin = 4;
    ctx.clearRect(0, 0, 1400, 700);
    if (!document.getElementById("enable_megidoral").checked) {
      return
    }
    var font = new FontFace('Megidral', 'url(/img/Megidral-Regular.ttf)')
    font.load().then(function(fnt){
      document.fonts.add(fnt)
      var txt = ev.target.value
      ctx.font = h + "px 'Megidral'";
      ctx.fillStyle = "#00000066";
      var txtw = ctx.measureText(txt).width
      //ctx.fillRect(x-txtw-margin, y-margin, txtw+margin, h+margin)
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      ctx.fillStyle = "#CCCCCCDD";
      ctx.fillText(txt, x, y);
    })
  })
  document.getElementById("megido_image").addEventListener("change", function(ev){
    var fileData = ev.target.files[0];
    var reader = new FileReader()
    reader.onload = function(a) {
      var ctx = document.getElementById('megido_front').getContext('2d');
      ctx.clearRect(28, 83, 537, 537);
      var img = new Image();
      img.src = reader.result;
      img.onload = function() {
        var w = img.width;
        var h = img.height;
        var sx = 0
        var sy = 0
        var sw = 0
        var sh = 0
        if (h > w){
          sx = 0
          sy = (h - w) / 2
          sw = w
          sh = w
        } else {
          sx = (w -h) / 2
          sy = 0
          sw = h
          sh = h
        }
        ctx.drawImage(img, sx, sy, sw, sh, 28, 83, 537, 537);
      }
    }
    reader.readAsDataURL(fileData)
  })
  document.getElementById("enable_megidoral").addEventListener("change", function(ev){
    var meg = document.getElementById("megidral")
    meg.dispatchEvent(new Event('change'))
  })
  document.getElementById("recommend_megido").addEventListener("change", function(ev){
    var meg = document.getElementById("megidral")
    var name = MEGIDO_TABLE[ev.target.value]
    var en_name = MEGIDO_EN[name] || ""
    meg.value = en_name
    meg.dispatchEvent(new Event('change'))

    drawText(name, 172, 632, 380, 32)

    var bg = new Image();
    bg.setAttribute('crossorigin', 'anonymous')
    bg.src = "/character/character_bg.jpg";
    var ctx = document.getElementById('megido_front').getContext('2d');
    bg.onload = function() {
      ctx.clearRect(28, 83, 537, 537);
      ctx.drawImage(bg, 28, 83, 537, 537)
      var img = new Image();
      img.setAttribute('crossorigin', 'anonymous')
      img.src = "/character/" + ev.target.value + ".png";
      img.onload = function() {
        ctx.drawImage(img, 53, 113, 500, 500);
      }
    }
  })
  document.getElementById("gen_image").addEventListener("click", function(ev){
    var canvas = document.createElement("canvas")
    canvas.width = 1400
    canvas.height = 700
    var ctx = canvas.getContext("2d")
    ctx.drawImage(document.getElementById("megido_back"), 0, 0)
    ctx.drawImage(document.getElementById("megido_front"), 0, 0)
    ctx.drawImage(document.getElementById("megido_overlay"), 0, 0)
    var link = document.createElement("a")
    link.href = canvas.toDataURL()
    link.download = "megido-resume.png"
    link.innerText = "このリンクから画像をダウンロードして「#メギド履歴書」「#メギドクラスタと繋がりたい」とかつけてツイートして下さい"
    link.classList.add("download_link")
    var el_result = document.getElementById("image_result")
    document.querySelectorAll(".download_link").forEach(function(el){
      el.parentNode.removeChild(el)
    })
    el_result.appendChild(link)

  })
  document.querySelectorAll("#favorite_contents input[type='checkbox']").forEach(function(item){
    item.addEventListener("change", function(ev){
      var ctx = document.getElementById('megido_front').getContext('2d');
      var doCheck = function(ctx, x, y) {
        var img = new Image()
        img.src = "/img/checkbox.png"
        img.onload = function(){
          ctx.drawImage(img, x, y, 35, 35)
        }
      }
      var checked = ev.target.checked;
      switch(ev.target.id){
        case "contents_main":
          if(checked){
            doCheck(ctx, 865, 436)
          }else{
            ctx.clearRect(865, 436, 35, 35)
          }
          break;
        case "contents_event":
          if(checked){
            doCheck(ctx, 1115, 436)
          }else{
            ctx.clearRect(1115, 436, 35, 35)
          }
          break;
        case "contents_pvp":
          if(checked){
            doCheck(ctx, 865, 466)
          }else{
            ctx.clearRect(865, 466, 35, 35)
          }
          break;
        case "contents_daigen":
          if(checked){
            doCheck(ctx, 1115, 466)
          }else{
            ctx.clearRect(1115, 466, 35, 35)
          }
          break;
        case "contents_gacha":
          if(checked){
            doCheck(ctx, 865, 501)
          }else{
            ctx.clearRect(865, 501, 35, 35)
          }
          break;
        case "contents_chara":
          if(checked){
            doCheck(ctx, 1115, 500)
          }else{
            ctx.clearRect(1115, 500, 35, 35)
          }
          break;
        case "contents_reiho":
          if(checked){
            doCheck(ctx, 865, 536)
          }else{
            ctx.clearRect(865, 536, 35, 35)
          }
          break;
        case "contents_raid":
          if(checked){
            doCheck(ctx, 1115, 533)
          }else{
            ctx.clearRect(1115, 533, 35, 35)
          }
          break;
      }
    })
  })
  var canvas = document.getElementById('megido_back');
  var canvasWidth = 1400;
  var canvasHeight = 700;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  var ctx = canvas.getContext('2d');

  var img = new Image();
  img.src = "/img/template.png"
  img.onload = function() {
    ctx.drawImage(img, 0, 0, canvasWidth, this.height * (canvasWidth / this.width));
    drawHeader()
  }
  fetch("/data/megido_eng.csv").then(function(data){
    data.text().then(function(text){
      text.split(/\r?\n/).forEach(function(line){
        ss = line.split(/,/)
        if(ss[1]){
          MEGIDO_EN[ss[0]] = ss[1]
        }
      })
    })
  })
  fetch("/data/megido_list.json").then(function(data){
    data.json().then(function(json){
      var sel = document.getElementById("recommend_megido")
      json.list.forEach(function(item){
        if (item.n) {
          var opt = document.createElement("option")
          opt.text = item.name
          opt.value = item.n
          sel.add(opt)
          MEGIDO_TABLE[item.n] = item.name
        }
        if (item.re_n) {
          var opt = document.createElement("option")
          opt.text = item.name + " Re"
          opt.value = item.re_n
          sel.add(opt)
          MEGIDO_TABLE[item.re_n] = item.name
        }
      })
    })
  })
})
