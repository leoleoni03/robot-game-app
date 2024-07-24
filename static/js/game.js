const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gamebar = document.getElementById("gamebarCanvas");
const gamebarCtx = gamebar.getContext("2d");

// ゲーム画面サイズ指定
canvas.width = 1000;
canvas.height = 450;
gamebar.width = canvas.width;
gamebar.height = 50;

// キーボード入力を格納する行列
let keys = {};

// 撃破数をカウントする変数
let defeated = 0;

// キーボードの入力を追跡
window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});
window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

// スペースを押下すると弾が出る（キャラによって弾のスピード、威力が変わる）
window.addEventListener("keydown", (e) => {
    if (e.key === " ") {
        if(bullets.length >= playerStats.RANGE) return;
        bullets.push(
            new Bullet(
                player.x + player.width,
                player.y + player.height / 2,
                playerStats.BULLET,
                playerStats.ATTACK
            )
        );
    }
});

// ゲームの初期化
// キャラの作成
let player = new Player(100, 100, playerStats.SPEED, playerStats.HP);
// 敵の作成
let enemies = [
    new Enemy(canvas.width - 100, canvas.height-150, 5, 10, 1),
    new Enemy(canvas.width - 100, canvas.height/3-50, 5, 10, 0),
    new Enemy(canvas.width - 100, canvas.height/2-25, 5, 10, 6)
];

// ゲームのループ
function gameLoop() {

    // 描画が残らないように削除
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gamebarCtx.clearRect(0, 0, canvas.width, canvas.height);

    // 文字のサイズ、フォント
    ctx.font = "bold 12pt sans-serif";
    ctx.fillStyle = "rgb(219, 183, 2)";
    // 文章
    ctx.fillText("Defeated Count : " + defeated, 5, 20);

    // キャラの表示
    player.update();
    player.draw();

    // 弾の表示
    bullets.forEach((bullet, index) => {
        bullet.update();
        bullet.draw();

        // 画面外に出た弾を削除
        if (bullet.x > canvas.width) {
            bullets.splice(index, 1);
        }

        // 敵に当たったかどうかのチェック
        enemies.forEach((enemy, eIndex) => {
            if (bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y) {
                // 敵の体力を減らす
                enemy.health -= bullet.damage;
                bullets.splice(index, 1);

                // 敵の体力がゼロになったら敵を消す
                if (enemy.health <= 0) {
                    enemies.splice(eIndex, 1);
                    defeated += 1;
                }
            }
        });
    });

    // 敵の表示
    enemies.forEach((enemy, index) => {
        enemy.update();
        enemy.draw();

        // 画面外に出た敵を削除
        if (enemy.x < - enemy.width ||
            enemy.y > canvas.height ||
            enemy.y < 0) {
            enemies.splice(index, 1);
        }

        // プレイヤーの当たり判定
        if (player.x + player.width > enemy.x &&
            player.x < enemy.x + enemy.width &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y) {
            // プレイヤーに敵が当たったらHPを削る
            player.health -= 1;
            enemies.splice(index, 1);
        }
    });

    // 画面上の敵がいなくなったら次の敵Waveを表示する
    if(enemies.length === 0){
        let enemyWaves = [
            createEnemy(canvas.height/5*1-75),
            createEnemy(canvas.height/5*2-75),
            createEnemy(canvas.height/5*3-75),
            createEnemy(canvas.height/5*4-75),
            createEnemy(canvas.height/5*5-75)
        ];
        enemies = enemyWaves
    }

    // HPバーの更新
    player.healthbar();

    var id = requestAnimationFrame(gameLoop);
    // プレイヤーのHPが0になった場合、ゲーム終了
    if (player.health <= 0) {
        cancelAnimationFrame(id);
        // 文字のサイズ、フォント
        ctx.font = "bold 48pt sans-serif";
        // 文字の色
        ctx.fillStyle = "gray";
        // 文章
        ctx.fillText("GAME OVER...!!", 250, canvas.height / 2 -50);
        ctx.fillText("￥" + defeated*100 + " Get!!", 270, canvas.height / 2 +50);

        // pythonにデータを渡す
        fetch('/sumMoney', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({money_data: defeated*100})
        })
        .then(response => response.json())
        .then(data => {
            // Pythonからのレスポンスを処理する
            var resultData = data.result;
            console.log(resultData);
        })
        .catch(error => console.error('エラー:', error));
    }
}

function createEnemy(positionY) {
    var positionX = canvas.width - 100;
    // 敵の動きをランダム(0~6)
    var movePattern = Math.floor(Math.random() * 7) + 0;
    // スピードをランダムにする(3~9)
    var speed = Math.floor(Math.random() * 7) + 3;
    // 出現位置のランダム
    var appearancePositions = [
        canvas.height/5*1-75,
        canvas.height/5*2-75,
        canvas.height/5*3-75,
        canvas.height/5*4-75,
        canvas.height/5*5-75
    ];
    var random = Math.floor(Math.random() * appearancePositions.length);
    var appearancePosition = appearancePositions[random];
    // Enemyを作成する
    var createdEnemy = new Enemy(positionX, appearancePosition, speed, 10, movePattern);
    return createdEnemy;
}

// 初期画面の作成
function gameInitialize() {
    // 文字のサイズ、フォント
    ctx.font = "48pt sans-serif";
    // 文字の色
    ctx.fillStyle = "gray";
    // 文章
    ctx.fillText("Press the Enter key!!", 150, canvas.height / 2);

    // Enterキーを押したらゲーム開始
    window.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            gameLoop();
        }
    }, {
        once: true
    });
}

gameInitialize();



