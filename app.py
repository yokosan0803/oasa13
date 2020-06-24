# flaskをimportしてflaskを使えるようにする
from flask import Flask , render_template , request , redirect 

# appにFlaskを定義して使えるようにしています。Flask クラスのインスタンスを作って、 app という変数に代入しています。
app = Flask(__name__)

# sessionを使うときに書く 鍵
app.secret_key ="usakuma"

@app.route('/')
def index():
    return render_template('car_ebetsu.html')







@app.errorhandler(403)
def mistake403(code):
    return 'There is a mistake in your url!'


@app.errorhandler(404)
def notfound404(code):
    return "404だよ！！見つからないよ！！！"




# 一番下に書くよ
# __name__ というのは、自動的に定義される変数で、現在のファイル(モジュール)名が入ります。 ファイルをスクリプトとして直接実行した場合、 __name__ は __main__ になります。
if __name__ == "__main__":
    # Flask が持っている開発用サーバーを、実行します。
    app.run()

