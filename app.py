# flaskをimportしてflaskを使えるようにする
from flask import Flask , render_template , request , redirect 

# appにFlaskを定義して使えるようにしています。Flask クラスのインスタンスを作って、 app という変数に代入しています。
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/car_ebetsu')
def car_ebetsu():
    return render_template('car_ebetsu.html')

@app.route('/wark_ebetsu')
def wark_ebetsu():
    return render_template('wark_ebetsu.html')

@app.route('/centennial_monument')
def centennial_monument():
    return render_template('centennial_monument.html')

@app.route('/ceramicartcenter')
def ceramicartcenter():
    return render_template('ceramicartcenter.html')

@app.route('/currypandora')
def currypandora():
    return render_template('currypandora.html')

@app.route('/donguri')
def donguri():
    return render_template('donguri.html')

@app.route('/douritu_library')
def douritu_library():
    return render_template('douritu_library.html')

@app.route('/earthdream')
def earthdream():
    return render_template('earthdream.html')

@app.route('/ebetsu_tutaya')
def ebetsu_tutaya():
    return render_template('ebetsu_tutaya.html')

@app.route('/ebri')
def ebri():
    return render_template('ebri.html')

@app.route('/epoa')
def epoa():
    return render_template('epoa.html')

@app.route('/fureai')
def fureai():
    return render_template('fureai.html')

@app.route('/garasu_kougeikan')
def garasu_kougeikan():
    return render_template('garasu_kougeikan.html')

@app.route('/ginza_shoppingstreet')
def ginza_shoppingstreet():
    return render_template('ginza_shoppingstreet.html')

@app.route('/hokkaido_museum')
def hokkaido_museum():
    return render_template('hokkaido_museum.html')

@app.route('/houraiken')
def houraiken():
    return render_template('houraiken.html')

@app.route('/kaitakunomura')
def kaitakunomura():
    return render_template('kaitakunomura.html')

@app.route('/list')
def list():
    return render_template('list.html')

@app.route('/maizou')
def maizou():
    return render_template('maizou.html')

@app.route('/matimura_farm')
def matimura_farm():
    return render_template('matimura_farm.html')

@app.route('/motiya')
def motiya():
    return render_template('motiya.html')

@app.route('/nisikiyama')
def nisikiyama():
    return render_template('nisikiyama.html')

@app.route('/oasa_shrine')
def oasa_shrine():
    return render_template('oasa_shrine.html')

@app.route('/oldmatimura_farm')
def oldmatimura_farm():
    return render_template('oldmatimura_farm.html')

@app.route('/quiz_page')
def quiz_page():
    return render_template('quiz_page.html')

@app.route('/rakunou')
def rakunou():
    return render_template('rakunou.html')

@app.route('/ruelle')
def ruelle():
    return render_template('ruelle.html')

@app.route('/santa')
def santa():
    return render_template('santa.html')

@app.route('/senkoen')
def senkoen():
    return render_template('senkoen.html')

@app.route('/sinrinkouen')
def sinrinkouen():
    return render_template('sinrinkouen.html')

@app.route('/sizentamago')
def sizentamago():
    return render_template('sizentamago.html')

@app.route('/sunabacoebetsu')
def sunabacoebetsu():
    return render_template('sunabacoebetsu.html')

@app.route('/tondenfarm')
def tondenfarm():
    return render_template('tondenfarm.html')

@app.route('/yukawa_park')
def yukawa_park():
    return render_template('yukawa_park.html')

@app.route('/yumetikara')
def yumetikara():
    return render_template('yumetikara.html')









@app.errorhandler(403)
def mistake403(code):
    return 'There is a mistake in your url!'


@app.errorhandler(404)
def notfound404(code):
    return render_template('thanks.html')




# 一番下に書くよ
# __name__ というのは、自動的に定義される変数で、現在のファイル(モジュール)名が入ります。 ファイルをスクリプトとして直接実行した場合、 __name__ は __main__ になります。
if __name__ == "__main__":
    # Flask が持っている開発用サーバーを、実行します。
    app.run()
