let fs = require("fs");

var __main = function() {
  // load_show_file();
  console.log("start");
  testGetPoiList();
};

var load_show_file = function() {
  fs.readFile("./data.json", "utf-8", function(err, file) {
    if (err) {
      console.log(err);
      return false;
    }

    var fileData = JSON.parse(file);
    // console.log(fileData);
    addFile(fileData);
  });
};

// 保存html文件
function addFile(html) {
  console.log("保存网页!");
  // var path = new URL(url);
  // var host = path.host;
  fs.writeFileSync(`./html/1.html`, html, err => {
    console.log(err);
  });
}

// 拿取需要的列表信息
function getPoiList(file) {
  var start = "poiLists";
  var end = "comHeader";
  var startIndex = file.indexOf(start) + start.length + 3;
  var endIndex = file.indexOf(end) - 3;
  var neededText = file.substring(startIndex, endIndex);
  return neededText;
}

function testGetPoiList() {
  fs.readFile("./data.json", "utf-8", function(err, file) {
    if (err) {
      console.log(err);
      return false;
    }
    var a = getPoiList(file);
    // var b = JSON.parse(decodeURI(a));
    var b = '"' + a + '"';
    var c = JSON.parse(b);
    console.log("*****", typeof c);
  });
}

__main();
