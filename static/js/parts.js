/** 
 * パーツとパラメータの格納
 * 画像パス: ["HP", "ATTACK", "BULLET", RANGE", "SPEED"]
 */
let bodyItemsDict = {
    "/static/img/body0.png": [2, 2, 2, 2, 2 ],
    "/static/img/body1.png": [2, 3, 1, 1, 2 ],
    "/static/img/body2.png": [3, 1, 3, 1, 1 ],
    "/static/img/body3.png": [0, 1, 0, 1, 3 ],
    "/static/img/body4.png": [3, 1, 3, 0, 0 ],
    "/static/img/body5.png": [1, 2, 1, 1, 3 ],
    "/static/img/body6.png": [2, 2, 2, 2, 1 ],
    "/static/img/body99.png": [4, 4, 0, 4, 4 ]
};

let armItemsDict = {
    "/static/img/arm0.png": [1, 1, 1, 1, 1 ],
    "/static/img/arm1.png": [2, 2, 2, 1, 1 ],
    "/static/img/arm2.png": [1, 4, 1, 1, 3 ],
    "/static/img/arm3.png": [1, 2, 1, 4, 1 ],
    "/static/img/arm4.png": [0, 0, 0, 0, 0 ],
    "/static/img/arm5.png": [0, 0, 0, 0, 0 ],
    "/static/img/arm6.png": [0, 0, 0, 0, 0 ],
    "/static/img/arm7.png": [0, 0, 0, 0, 0 ]
};

let legItemsDict = {
    "/static/img/leg0.png": [1, 1, 1, 1, 1 ],
    "/static/img/leg1.png": [1, 1, 0, 2, 4 ],
    "/static/img/leg2.png": [2, 1, 1, 3, 1 ],
    "/static/img/leg3.png": [0, 0, 0, 0, 0 ],
    "/static/img/leg4.png": [0, 0, 0, 0, 0 ],
    "/static/img/leg5.png": [0, 0, 0, 0, 0 ]
};

function getTotalItems(){
    let totalItems = {...bodyItemsDict, ...armItemsDict, ...legItemsDict};
    return totalItems;
}