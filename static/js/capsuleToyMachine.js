let rotateCount = 0;
let isClick = false;
let money = 0;

// window読み込み時動作
window.onload = function () {
    getMoney()
    gachabar = document.getElementById("gacha-bar-img");
    if(!isClick){
        gachabar.addEventListener("dblclick", {element: gachabar, handleEvent: play}, false);
    }
}

function getMoney(){
    money = Number(document.getElementById("money").textContent);
    document.getElementById("money").innerText = money;
}

function changeMoney(){
    if(money < 500){
        return false;
    }
    money -= 500;
    document.getElementById("money").innerText = money;

    // pythonにデータを渡す
    fetch('/setData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({money_data: money, item_data: null})
    })
    .then(response => response.json())
    .then(data => {
        // Pythonからのレスポンスを処理する
        var resultData = data.result;
        console.log(resultData);
    })
    .catch(error => console.error('エラー:', error));
    return true;
}

function setRandomItem(){
    let totalItems = getTotalItems();
    size = Object.keys(totalItems).length;
    var randomInt = Math.floor(Math.random() * size);
    itemImg = Object.keys(totalItems)[randomInt];
    itemParam = Object.values(totalItems)[randomInt];
    document.getElementById("hit-img").setAttribute("src", itemImg);

    text = "【パラメータ値】\n" + 
        "HP : " + itemParam[0] + "\n" + 
        "ATTACK : " + itemParam[1] + "\n" + 
        "BULLET : " + itemParam[2] + "\n" +
        "RANGE :  " + itemParam[3] + "\n" + 
        "SPEED : " + itemParam[4];
    
    document.getElementById("hit-param").innerText = text;

    if (bodyItemsDict[itemImg] !== undefined){
        parts = "body";
    } else if (armItemsDict[itemImg] !== undefined) {
        parts = "arm";
    } else if (legItemsDict[itemImg] !== undefined) {
        parts = "leg";
    }
    // pythonにデータを渡す
    fetch('/setData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({money_data: null, item_data: {parts,itemImg}})
    })
    .then(response => response.json())
    .then(data => {
        // Pythonからのレスポンスを処理する
        var resultData = data.result;
        console.log(resultData);
    })
    .catch(error => console.error('エラー:', error));
}

// function checkBodyItem(map){
//     map.has()
// }

// ガチャ実行
function play(){
    isClick = true;
    // 金額の変更(できる場合はTrue)
    canChange = changeMoney();
    if(!canChange){
        alert("お金が足りないよ！");
        return;
    }
    // ランダムでアイテムを取得する
    setRandomItem();

    this.element.style.transition = "unset";
    // ガチャアクション
    rotateItem(this.element)
}

// レバーを回すアクション
function rotateItem(element){
    if(rotateCount < 360){
        element.style.transform = "rotate(" + rotateCount + "deg)";
        rotateCount++;
        setTimeout(rotateItem, 1, element)
    }else{
        element.style.transform = "rotate(" + 0 + "deg)";
        let outElement = document.getElementById("gacha-out-img");
        rotateCount = outElement.clientHeight;
        outCapsule(outElement);
    }
}

// カプセルを出す
function outCapsule(element){
    if(rotateCount > 0){
        element.style.height = rotateCount + "px";
        rotateCount--;
        setTimeout(outCapsule, 1, element)
    }else{
        element.style.display = "none";
        let openElement = document.getElementById("capsuleOpen");
        rotateCount = 90;
        openCapsule(openElement);
    }
}

// カプセルの中身を開く
function openCapsule(element){
    if(rotateCount >= 0){
        element.style.transform = "rotateX(" + rotateCount + "deg)";
        // element.style.transform = "rotateY(" + rotateCount + "deg)";
        // element.style.transform = "rotate3d(1,1,0," + rotateCount + "deg)";
        // element.style.height = rotateCount + "%";
        rotateCount--;
        setTimeout(openCapsule, 10, element)
    }else{
        rotateCount = 0;
    }
}