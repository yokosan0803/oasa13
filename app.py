# splite3をimportする
import sqlite3

# flaskをimportしてflaskを使えるようにする
from flask import Flask , render_template , request , redirect , session

# appにFlaskを定義して使えるようにしています。Flask クラスのインスタンスを作って、 app という変数に代入しています。
app = Flask(__name__)

