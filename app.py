# splite3をimportする
import sqlite3

# flaskをimportしてflaskを使えるようにする
from flask import Flask , render_template , request , redirect , session

# appにFlaskを定義して使えるようにしています。Flask クラスのインスタンスを作って、 app という変数に代入しています。
app = Flask(__name__)


#ここから上に記述する
if __name__ == "__main__":
    #サーバーを起動するよ
    app.run(debug=True , host="0.0.0.0",port=888)
    #デバックモードを有効にするよ
    #192.168.10.62