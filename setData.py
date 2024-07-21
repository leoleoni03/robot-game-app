from PIL import Image, ImageOps
import cv2
from rembg import remove
import json

json_path = "./static/data/userData.json"
robot_path = "./static/data/robot.png"


def set_money(data):
    f = open(json_path, 'r')
    dict_json = json.load(f)
    dict_json["money"] = data
    f.close()
    new_json = open(json_path, 'w')
    json.dump(dict_json, new_json, indent=3)
    return dict_json["money"]


def set_item(data):
    parts = data["parts"]
    f = open(json_path, 'r')
    dict_json = json.load(f)
    if data["itemImg"] in dict_json[parts]:
        return None
    dict_json[parts].append(data["itemImg"])
    f.close()
    new_json = open(json_path, 'w')
    json.dump(dict_json, new_json, indent=3)
    return dict_json[parts]


def set_robot(data):
    body_img = Image.open("." + data["body_img"])
    # body_img = body_img.convert("RGBA")
    right_arm_img = Image.open("." + data["arm_img"])
    # right_arm_img = right_arm_img.convert("RGBA")
    left_arm_img = ImageOps.mirror(right_arm_img)
    right_leg_img = Image.open("." + data["leg_img"])
    # right_leg_img = right_leg_img.convert("RGBA")
    left_leg_img = ImageOps.mirror(right_leg_img)
    color = (255, 255, 255, 0)
    dst = Image.new(
        'RGBA',
        (right_arm_img.width + body_img.width + right_arm_img.width, body_img.height + right_leg_img.height),
        color
    )
    dst.paste(right_arm_img, (0, right_arm_img.height))
    dst.paste(body_img, (right_arm_img.width - 1, 0))
    dst.paste(left_arm_img, (right_arm_img.width + body_img.width - 1, right_arm_img.height))
    dst.paste(right_leg_img, (right_leg_img.width - 1, body_img.height))
    dst.paste(left_leg_img, (right_leg_img.width * 3 - 1, body_img.height))

    img_resized = dst.resize((dst.width//10, dst.height//10))
    # dst.save(robot_path, 'PNG', quality=100)
    img_resized.save(robot_path, 'PNG', quality=100)

    # input_img = Image.open(robot_path)  # 入力画像を開く
    # output = remove(input_img)  # 背景を除去
    # output.save(robot_path)  # 出力画像を保存

    print(data["robot_param"])
    f = open(json_path, 'r')
    dict_json = json.load(f)
    dict_json["robot_param"] = data["robot_param"]
    f.close()
    new_json = open(json_path, 'w')
    json.dump(dict_json, new_json, indent=3)
