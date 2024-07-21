// 弾の格納変数
// スペースで打つと格納される
let bullets = [];

// 弾の表示
class Bullet {
    /**
     * @param {*} x 弾のX位置
     * @param {*} y 弾のY位置
     * @param {*} speed 弾のスピード
     * @param {*} damage 弾のダメージ値
     */
    constructor(x, y, speed, damage) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.damage = damage;
        this.width = 5;
        this.height = 10;
    }

    // 描画
    draw() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    // 弾の移動更新
    update() {
        this.x += this.speed;
    }
}

