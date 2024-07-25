import os

from flask import Flask, render_template, request, jsonify
import getData
import setData

app = Flask(__name__)


# main画面（合体画面）
@app.route('/main', methods=['GET', 'POST'])
def main():
    get_body_key = "body"
    get_arm_key = "arm"
    get_leg_key = "leg"
    body = getData.get_data(get_body_key)
    arm = getData.get_data(get_arm_key)
    leg = getData.get_data(get_leg_key)
    return render_template(
        'main.html',
        bodyData=body,
        armData=arm,
        legData=leg
    )


# アイテム一覧画面
@app.route('/itemView', methods=['GET', 'POST'])
def item_view():
    get_body_key = "body"
    get_arm_key = "arm"
    get_leg_key = "leg"
    body = getData.get_data(get_body_key)
    arm = getData.get_data(get_arm_key)
    leg = getData.get_data(get_leg_key)
    return render_template(
        'itemView.html',
        bodyData=body,
        armData=arm,
        legData=leg
    )


# ガチャ画面
@app.route('/capsuleToyMachine', methods=['GET', 'POST'])
def ctm_view():
    get_data_key = "money"
    money = getData.get_data(get_data_key)
    return render_template('capsuleToyMachine.html', money=money)


# バトル画面
@app.route('/battle', methods=['GET', 'POST'])
def battle_view():
    robot_img_path = getData.get_img()
    get_data_key = "robot_param"
    robot_param = getData.get_data(get_data_key)
    return_data = [robot_param, robot_img_path]
    return render_template(
        'battle.html',
        robot_data=return_data,
    )


# ロボットイメージを登録するWebAPI
@app.route('/setImg', methods=['POST'])
def set_img():
    # JavaScriptから送られたデータを受け取る
    data_from_js = request.json
    setData.set_robot(data_from_js)
    return jsonify({'result': "OK"})


# JSONにデータを登録するWebAPI
@app.route('/setData', methods=['POST'])
def set_json():
    # JavaScriptから送られたデータを受け取る
    data_from_js = request.json
    # もしmoneyのデータがある場合は
    if data_from_js['money_data'] is not None:
        money_data = data_from_js['money_data']
        result = setData.set_money(money_data)
    elif data_from_js['item_data'] is not None:
        item_data = data_from_js['item_data']
        result = setData.set_item(item_data)
    else:
        result = None
    return jsonify({'result': result})


# JSONにデータを登録するWebAPI
@app.route('/sumMoney', methods=['POST'])
def sum_money():
    # JavaScriptから送られたデータを受け取る
    data_from_js = request.json
    # もしmoneyのデータがある場合は
    if data_from_js['money_data'] is not None:
        get_data_key = "money"
        money = getData.get_data(get_data_key)
        total_money_data = money + data_from_js['money_data']
        result = setData.set_money(total_money_data)
    else:
        result = None
    return jsonify({'result': result})


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

