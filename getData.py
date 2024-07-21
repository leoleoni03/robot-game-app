from PIL import Image
import json

json_path = "./static/data/userData.json"
robot_path = "./static/data/robot.png"


def get_data(data_key):
    with open(json_path) as f:
        full_data = json.load(f)
    data = full_data[data_key]
    return data


def get_img():
    dict_data = {"robot_img_path": robot_path}
    return dict_data
