let bodyItems;
let armsItems;
let legsItems;
let currentParts = [];
let chart;
let totalParam;

// window読み込み時動作
window.onload = function () {
    // データ取得
    getData();
    // 画面の作成（部品の生成）
    setItems();
    // アイテムのパラメータを計算する
    totalParam = CalculationParam();
    // レーダーチャートの作成
    setChart(totalParam);

    // アイテム設定動作
    // Body
    let bodyPrev = document.getElementById('carousel_body_prev');
    let bodyNext = document.getElementById('carousel_body_next');
    bodyPrev.addEventListener('click', {element: bodyPrev, direction: "prev", parts: "body", partsList: bodyItems, handleEvent: setCanvas}, false);
    bodyNext.addEventListener('click', {element: bodyNext, direction: "next", parts: "body", partsList: bodyItems, handleEvent: setCanvas}, false);
    // Arms
    let armPrev = document.getElementById('carousel_arms_prev');
    let armsNext = document.getElementById('carousel_arms_next');
    armPrev.addEventListener('click', {element: armPrev, direction: "prev", parts: "arms", partsList: armsItems, handleEvent: setCanvas}, false);
    armsNext.addEventListener('click', {element: armsNext, direction: "next", parts: "arms", partsList: armsItems, handleEvent: setCanvas}, false);
    // Legs
    let legsPrev = document.getElementById('carousel_legs_prev');
    let legsNext = document.getElementById('carousel_legs_next');
    legsPrev.addEventListener('click', {element: legsPrev, direction: "prev", parts: "legs", partsList: legsItems, handleEvent: setCanvas}, false);
    legsNext.addEventListener('click', {element: legsNext, direction: "next", parts: "legs", partsList: legsItems, handleEvent: setCanvas}, false);
}

function getData() {
    // JSONからデータをとるようにする
    bodyItems = jsonBodyData;
    armsItems = jsonArmData;
    legsItems = jsonLegData;
}

function setItems() {
    // bodyアイテムの設定
    setCarousel(bodyItems, "body");
    // armsアイテムの設定
    setCarousel(armsItems, "arms");
    // legsアイテムの設定
    setCarousel(legsItems, "legs");
}

function setCarousel(items, content) {
    // Itemの数だけ実行
    for (let i = 0; i < items.length; ++i) {
        var newCarouselContent = document.createElement("div"); // div要素作成
        var newItem = document.createElement("img"); // img要素作成
        newItem.setAttribute("src", items[i]); // img要素にsrcを設定
        newItem.setAttribute("id", "parts"); // img要素にidを設定
        newCarouselContent.appendChild(newItem); // div要素にimg要素を追加
        if(i == 0){
            newCarouselContent.setAttribute("class", "carousel-item active"); // div要素にclassを設定
            currentParts.push(items[i]); // 現在のアイテムを格納
        }else{
            newCarouselContent.setAttribute("class", "carousel-item"); // div要素にclassを設定
        }
        // 親要素（div）への参照を取得
        var parentDiv = document.getElementById("carousel-" + content);
        // 子要素への参照を取得
        var defaultItem = document.getElementById("default-" + content);
        // 追加
        parentDiv.insertBefore(newCarouselContent, parentDiv.firstChild);
    }
}

function setChart(paramData) {
    totalParam = paramData;
    var ctx = document.getElementById("paramChart");
    if(chart){
        chart.destroy();
    }
    chart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ["HP", "ATTACK", "BULLET", "RANGE", "SPEED"],
            datasets: [{
                data: paramData,
                //グラフ背景色
                backgroundColor: "rgba(219, 183, 2, 0.3)",
                //グラフボーダー色
                borderColor: "rgba(219, 183, 2, 0.5)",
            }]
        },
        options: {
            // Canvasのサイズに合わせる
            responsive: false,
            plugins: {
                legend: {
                    // グラフラベルの削除
                    display: false
                }
            },
            scales: {
                r: {
                    // ラベル
                    pointLabels:{
                        color: "White"
                    },
                    // 波紋状の線
                    grid:{
                        color: "white"
                    },
                    // 放射状の線
                    angleLines: {
                        color: "white"
                    },
                    // グラフの最大値
                    max: 10,
                    // グラフの最小値
                    min: 0,
                    // メモリ設定
                    ticks: {
                        // 目盛間隔
                        stepSize: 2,
                        // メモリ数
                        display: false
                    }
                }
            },
        }
    });
}

// ダブルクリック防止用
function changeEnable(element){
    element.disabled = false;
}

function setCanvas(){
    // ダブルクリック防止策
    element = this.element;
    // ボタンを非活性にする
    element.disabled = true;
    // 0.5秒後ボタンが活性にする
    setTimeout(changeEnable, 600, element);

    if(this.parts == "body"){
        src = currentParts[0]
    }else if(this.parts == "arms"){
        src = currentParts[1]
    }else if(this.parts == "legs"){
        src = currentParts[2]
    }
    // Listから要素番号を取得する
    currentIndex = this.partsList.indexOf(src)
    if (this.direction == "prev"){
        // 左
        // Listを進む（最後の要素の場合、最初に戻る）
        if(currentIndex == this.partsList.length-1){
            image = this.partsList[0]
        }else{
            image = this.partsList[currentIndex + 1]
        }
    }else if(this.direction == "next"){
        // 右
        // Listを戻る（最初の要素の場合、最後に戻る）
        if(currentIndex == 0){
            image = this.partsList[this.partsList.length - 1]
        }else{
            image = this.partsList[currentIndex - 1]
        }
    }

    if(this.parts == "body"){
        // 画像のセット
        let changeImage = document.getElementById(this.parts + "-img")
        changeImage.src = image;
        currentParts[0] = image;
    }else{
        // 画像のセット
        let changeLeftImage = document.getElementById("left-" + this.parts + "-img")
        let changeRightImage = document.getElementById("right-" + this.parts + "-img")
        changeLeftImage.src = image;
        changeRightImage.src = image;
        if(this.parts == "arms"){
            currentParts[1] = image;
        }else{
            currentParts[2] = image;
        }
    }

    var param = CalculationParam();

    // チャートの更新
    setChart(param);
}

/**
 * 全てのアイテムのパラメータの合算
 */
function CalculationParam(){
    var bodyParam = bodyItemsDict[currentParts[0]];
    var armParam = armItemsDict[currentParts[1]];
    var legParam = legItemsDict[currentParts[2]];
    var totalParam = [];

    for (let i = 0; i < 5; ++i) {
        result = bodyParam[i] + armParam[i] + legParam[i];
        if(result < 0){
            result = 0
        }else if(result > 10){
            result = 10
        }
        totalParam.push(result);
    }
    return totalParam;
}

function saveRobot(){
    var targetElement = document.getElementById("canvas");
    var options = {
        type: "png",
        quality: 1
    };

    // pythonにデータを渡す
    fetch('/setImg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                body_img: currentParts[0],
                arm_img: currentParts[1],
                leg_img: currentParts[2],
                robot_param: [
                    {
                        HP:totalParam[0],
                        ATTACK:totalParam[1],
                        BULLET:totalParam[2],
                        RANGE:totalParam[3],
                        SPEED:totalParam[4]
                    }
                ]
            }
        )
    })
    .then(response => response.json())
    .then(data => {
        // Pythonからのレスポンスを処理する
        var resultData = data.result;
        console.log(resultData);
    })
    .catch(error => console.error('エラー:', error));
    window.alert("保存しました！")
}