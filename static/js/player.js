//// キャラクター種類（ステータス込み）
//const characters = {
//    "A": { speed: 30, bulletSpeed: 30, bulletDamage: 2, health: 100 },
//    "B": { speed: 10, bulletSpeed: 2, bulletDamage: 100, health: 120 },
//    "C": { speed: 5, bulletSpeed: 10, bulletDamage: 10, health: 50 }
//};
//
//// キャラクターの選択
//let selectedCharacter = "B";
//let playerStats = characters[selectedCharacter];
let playerStats = robotData[0][0];

// プレイヤーのキャラ画像読み込み
const playerImage = new Image();
playerImage.src = robotData[1].robot_img_path;

// プレイヤークラス
class Player {
    /**
     * @param {*} x キャラのX位置
     * @param {*} y キャラのY位置
     * @param {*} speed キャラのスピード
     * @param {*} health キャラのHP
     */
    constructor(x, y, speed, health) {
        this.x = x;
        this.y = y;
        this.speed = speed/2;
        this.health = health;
        this.width = 50;
        this.height = 50;
    }

    // キャラの描画
    draw() {
//         // 色
//         ctx.fillStyle = "blue";
//         // 位置(x,y),キャラの大きさ(width,height)
//         ctx.fillRect(this.x, this.y, this.width, this.height);

        // キャラ画像表示
        ctx.drawImage(playerImage, this.x, this.y, this.width, this.height);
    }

    // 描画の更新（位置の移動）
    update() {
        if (keys["ArrowUp"] && this.y > 0) this.y -= this.speed;
        if (keys["ArrowDown"] && this.y < canvas.height - this.height) this.y += this.speed;
        if (keys["ArrowLeft"] && this.x > 0) this.x -= this.speed;
        if (keys["ArrowRight"] && this.x < canvas.width - this.width) this.x += this.speed;
    }

    healthbar() {
        let hp = this.health;
        for(let i = 0; i < hp; i++){
            gamebarCtx.fillStyle = "rgb(219, 183, 2)";
            gamebarCtx.fillRect(5+(45*i), 5, 40, 40);
        }
    }
}