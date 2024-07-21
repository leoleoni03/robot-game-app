let bodyItems;
let armsItems;
let legsItems;
const popup = document.getElementById("toolTip");

// window読み込み時動作
window.onload = function () {
    getData();
    setItems("body-item", bodyItems);
    setItems("arm-item", armsItems);
    setItems("leg-item", legsItems);
    itemViews = document.getElementsByClassName("item-view");
    for(let i = 0; i < itemViews.length; ++i){
        itemViews[i].addEventListener("mouseover", {element: itemViews[i], handleEvent: mouseOver}, false);
        itemViews[i].addEventListener("mouseleave", {element: itemViews[i], handleEvent: mouseLeave}, false);
    }
}

function getData() {
    // JSONからデータをとるようにする
    bodyItems = jsonBodyData;
    armsItems = jsonArmData;
    legsItems = jsonLegData;
}

function setItems(id, items){
    bodyItemViews = document.getElementById(id).children;
    for(let i = 0; i < items.length; ++i){
        // bodyItemViews[i]（要素）にbodyItems[i]（画像）を設定していく
        var newItemImg = document.createElement("img"); // img要素作成
        newItemImg.setAttribute("src", items[i]); // img要素にsrcを設定
        newItemImg.setAttribute("class", "item"); // img要素にclassを設定 

        bodyItemViews[i].appendChild(newItemImg);
    }
}

function mouseOver() {
    targetId = this.element.getAttribute("id");
    targetElement = document.getElementById(targetId);
    this.element.style.border = "5px solid rgba(219, 183, 2, 0.9)";
    
    elementPosition = this.element.getBoundingClientRect();

    itemFlag = targetId.slice(0, 1);
    setTooltip(itemFlag, targetElement, elementPosition);
}

function mouseLeave() {
    targetId = this.element.getAttribute("id");
    this.element.style.border = "5px solid rgb(20, 20, 20)";

    popup.style.display = "none";
}

function setTooltip(flag, element, elementPosition){
    try{
        elementImg = element.children[0];
        img = elementImg.getAttribute("src");

        if(flag == "0"){
            param = bodyItemsDict[img];
        }else if(flag == "1"){
            param = armItemsDict[img];
        }else{
            param = legItemsDict[img];
        }
        
        text = "【パラメータ値】\n" +
            "HP : " + param[0] + "\n" +
            "ATTACK : " + param[1] + "\n" +
            "BULLET : " + param[2] + "\n" +
            "RANGE : " + param[3] + "\n" +
            "SPEED : " + param[4];
    
        popup.innerText = text;
        popup.style.fontSize = "12px";

        // ツールチップの位置を設定
        x = elementPosition.left + 50 + window.scrollX;
        y = elementPosition.top - 150 + window.scrollY;
        popup.style.top = y + "px";
        popup.style.left = x + "px";

        // ツールチップを表示する
        popup.style.display = "block";
    }catch{
        popup.innerText = "";
        return;
    }
}