// 敵キャラの画像読み込み
const enemyImage = new Image();
enemyImage.src = "./static/img/enemy.png";

// 敵クラス
class Enemy {
    /**
     * @param {*} x 敵キャラのX位置
     * @param {*} y 敵キャラのY位置
     * @param {*} speed 敵キャラのスピード
     * @param {*} health 敵キャラのHP
     */
    constructor(x, y, speed, health, movePattern) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.health = health;
        this.movePattern = movePattern;
        this.width = 50;
        this.height = 50;
    }

    // キャラの描画
    draw() {
        // キャラの画像表示
        ctx.drawImage(enemyImage, this.x, this.y, this.width, this.height);
    }

    // 標示の移動更新
    update() {
        switch (this.movePattern) {
            case 0:
                // 中央まで直進、上に逃げる
                if (this.x > canvas.width / 2) {
                    this.x -= this.speed;
                } else {
                    this.y += this.speed;
                    this.x -= this.speed;
                }
                break;
            case 1:
                // 中央まで直進、下に逃げる
                if (this.x > canvas.width / 2) {
                    this.x -= this.speed;
                } else {
                    this.y -= this.speed;
                    this.x -= this.speed;
                }
                break;
            case 2:
                // 斜め上に進み、上下に反射する
                if(Math.sign(this.speed) == 1)this.x -= this.speed;
                else this.x += this.speed;
                this.y -= this.speed;

                // 画面端に当たった場合
                if (this.y < 5 || this.y > canvas.height - this.height -10) this.speed *= -1;
                break;
            case 3:
                // 斜め下に進み、上下に反射する
                if(Math.sign(this.speed) == 1) this.x -= this.speed;
                else this.x += this.speed;
                this.y += this.speed;

                // 画面端に当たった場合
                if (this.y < 5 || this.y > canvas.height - this.height -10) this.speed *= -1;
                break;
            case 4:
                // 中央まで直進、上に逃げる
                if (this.x == 200) this.y -= this.speed;
                else this.x -= this.speed;
                break;
            case 5:
                if (this.x == 200) this.y += this.speed;
                else this.x -= this.speed;
                break;
            case 6:
                this.x -= this.speed;
                break;
        }
    }
}

