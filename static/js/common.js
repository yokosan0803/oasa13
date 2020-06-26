$(function(){
    var quizArea = $('.quiz_area'); //クイズを管理するDOMを指定
    var quiz_html = quizArea.html(); //もう一度を押した時に元に戻すため初期HTMLを変数で保管
    var quiz_cnt = 0; //現在の問題数を管理
    var quiz_fin_cnt = 5; //何問で終了か設定（クイズ数以下であること）
    var quiz_success_cnt = 0; //問題の正解数
    
    //クイズの配列を設定
    //answerの選択肢の数はいくつでもOK!!ただし先頭を正解とすること(出題時に選択肢はシャッフルされる)
    var aryQuiz = [];
    aryQuiz.push(
        {
            quizImg : '<img class="img_css" src="../static/img/pandora_carry.jpg" alt="">',
            question : 'このカレーが食べられるのは？',
            answer : ['カレー パンドラ', 'セイコーマート', 'ウポポイ', 'はせがわストア']
        }
        ,{
            quizImg : '<img class="img_css" src="../static/img/ebetsustreet.jpg" alt="">',
            question : 'この商店街の名前は？',
            answer : ['大麻銀座商店街', '本町商店街', '狸小路商店街', '一番街商店街']
        }
        ,{
            quizImg : '<img class="img_css" src="../static/img/nopporo_park.jpg" alt="">',
            question : 'この公園の名前は？',
            answer : ['野幌森林公園', '大通公園', 'すなばこパーク', '大麻中央公園']
        }
        ,{
            quizImg : '<img class="img_css" src="../static/img/ogatosan.jpg" alt="">',
            question : 'このお方は？',
            answer : ['おがと先生', 'まっちま先生', 'にんじゃわんこ', 'ひつじ仙人']
        }
        ,{
            quizImg : '<img class="img_css" src="../static/img/ebetsu_glass.jpg" alt="">',
            question : 'この建物の名前は？',
            answer : ['江別市ガラス工芸館', 'つぼ八大麻店', '旧町村農場', 'セイコーマート']
        }
        ,{
            quizImg : '<img class="img_css" src="../static/img/sunabako.jpg" alt="">',
            question : '北海道の冬に欠かせないこれは？',
            answer : ['砂箱', 'こたつ', '郵便ポスト', 'セイコーマート']
        }
        ,{
            quizImg : '<img class="img_css" src="../static/img/hyakunenkinentou.jpg" alt="">',
            question : '野幌森林公園内にあるこの塔（百年記念塔）の高さは？',
            answer : ['25階(100m)', '1m', '8階(23.5m)', '634m']
        }
        ,{
            quizImg : '<img class="img_css" src="../static/img/.jpg" alt="">',
            question : '大麻中央公園にあるのは？',
            answer : ['大きな池', '大きな川', '大きな海', '大きな滝']
        }
        ,{
            quizImg : '<img class="img_css" src="../static/img/senro.jpg" alt="">',
            question : '札幌から大麻までJRで約何分？',
            answer : ['17分', '60分', '180分', '3分']
        }
        ,{
            quizImg : '<img class="img_css" src="../static/img/nohanasyoubu.jpg" alt="">',
            question : '江別市東野幌に群生地があるこの花の名は？',
            answer : ['ノハナショウブ', 'スミレ', '', '']
        }
        ,{
            quizImg : '<img class="img_css" src="../static/img/ushi.jpg" alt="">',
            question : '江別市篠津にある町村農場ミルクガーデンで食べられるのは？',
            answer : ['新鮮な牛乳で作られたソフトクリーム', '新鮮獲れたて海鮮丼', '世にも珍しいキノコ', 'バターコーン味噌ラーメン']
        }
        ,{
            quizImg : '<img class="img_css" src="../static/img/ainu_people.png" alt="">',
            question : '「江別」の地名の由来は？',
            answer : ['アイヌ語のユベオツ (チョウザメのいる川の意) ', 'アイヌ語のウポポイ（大勢で歌うことの意）', 'アイヌ語のピイェ（脂ぎっている）', 'アイヌ語のカムイ（神の意）']
        }
        // ,{
        //     quizImg : '<img class="img_css" src="../static/img/.jpg" alt="">',
        //     question : '？',
        //     answer : ['', '', '', '']
        // }
        // ,{
        //     quizImg : '<img class="img_css" src="../static/img/.jpg" alt="">',
        //     question : '？',
        //     answer : ['', '', '', '']
        // }
        // ,{
        //     quizImg : '<img class="img_css" src="../static/img/.jpg" alt="">',
        //     question : '？',
        //     answer : ['', '', '', '']
        // }
        // ,{
        //     quizImg : '<img class="img_css" src="../static/img/.jpg" alt="">',
        //     question : '？',
        //     answer : ['', '', '', '']
        // }
    );
    
    quizReset();
    
    //回答を選択した後の処理
    quizArea.on('click', '.quiz_ans_area ul li', function(){
        //画面を暗くするボックスを表示（上から重ねて、結果表示中は選択肢のクリックやタップを封じる
        quizArea.find('.quiz_area_bg').show();
        //選択した回答に色を付ける
        $(this).addClass('selected');
        if($(this).data('true')){
            //正解の処理 〇を表示
            quizArea.find('.quiz_area_icon').addClass('true');
            //正解数をカウント
            quiz_success_cnt++;
        }else{
            //不正解の処理
            quizArea.find('.quiz_area_icon').addClass('false');
        }
        setTimeout(function(){
            //表示を元に戻す
            quizArea.find('.quiz_ans_area ul li').removeClass('selected');
            quizArea.find('.quiz_area_icon').removeClass('true false');
            quizArea.find('.quiz_area_bg').hide();
            //問題のカウントを進める
            quiz_cnt++;
            if(quiz_fin_cnt > quiz_cnt){
                //次の問題を設定する
                quizShow();
            }else{
                //結果表示画面を表示
                quizResult();
            }
        }, 1500);
    });
    
    //もう一度挑戦するを押した時の処理
    quizArea.on('click', '.quiz_restart', function(){
        quizReset();
    });
    
    //リセットを行う関数
    function quizReset(){
        quizArea.html(quiz_html); //表示を元に戻す
        quiz_cnt = 0;
        quiz_success_cnt = 0;
        aryQuiz = arrShuffle(aryQuiz);//シャッフルする
        quizShow();
    }
    
    //問題を表示する関数
    function quizShow(){
        //何問目かを表示
        quizArea.find('.quiz_no').text((quiz_cnt + 1));
        //問題文を表示
        quizArea.find('.quiz_question').text(aryQuiz[quiz_cnt]['question']);
        quizArea.find('.img_area').html(aryQuiz[quiz_cnt]['quizImg']);
        //正解の回答を取得する
        var success = aryQuiz[quiz_cnt]['answer'][0];
        //現在の選択肢表示を削除する
        quizArea.find('.quiz_ans_area ul').empty();
        //問題文の選択肢をシャッフルさせる(自作関数) .concat()は参照渡し対策
        var aryHoge = arrShuffle(aryQuiz[quiz_cnt]['answer'].concat());
        //問題文の配列を繰り返し表示する
        $.each(aryHoge, function(key, value){
            var fuga = '<li>' + value + '</li>';
            //正解の場合はdata属性を付与する
            if(success === value){
                fuga = '<li data-true="1">' + value + '</li>';
            }
            quizArea.find('.quiz_ans_area ul').append(fuga);
        });
    }
    
    //結果を表示する関数
    function quizResult(){
        quizArea.find('.quiz_set').hide();
        var text = quiz_fin_cnt + '問中' + quiz_success_cnt + '問正解！';
        if(quiz_fin_cnt === quiz_success_cnt){
            text += '<br>素晴らしい全問正解！江別マスターだね！';
        }
        text += '<br><input type="button" value="もう一度挑戦する" class="quiz_restart p-10">';
        quizArea.find('#quiz_result').html(text);
        quizArea.find('#quiz_result').show();
        
    }


    
    //配列をシャッフルする関数
    function arrShuffle(arr){
        for(i = arr.length - 1; i > 0; i--){
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
        return arr;
    }

    // 四択クイズの結果をツイッターでシェア--------------------------------------------
    $('#twitter_button').click(function() {
        //出目をHTMLから取得する
        var result = document.getElementById("quiz_result").innerText;
        //ツイート内容をセット
        var tw_contents = ("ぶらり♪えべつくいず " + result + "みんなも挑戦しよう(*ﾟ▽ﾟ)ﾉ！!");
        var url = "https://sunabaco.com/";
        //#twitter_buttonのhrefにパラメーターを渡す
        window.open().location.href = ("https://twitter.com/share?url=" + url + "&text=" + tw_contents + "&count=none&lang=ja");
    });


    // ----------------------------------------------------------------
    // 車で大麻

    var carChoice = [
        ['<a href="https://sunabaco.com/"><img class="random_img_css" src="../static/img_spot/sinrinkouen.jpg" alt=""></a>',
        '道立自然公園野幌森林公園',
        '森林浴でリフレッシュできるよ？'
        ],

        ['<a href="/currypandora"><img class="random_img_css" src="../static/img/pandora_carry.jpg" alt=""></a>', 
        'カレーパンドラ江別店',
        'ワンコインで美味しいカレーが食べられる！おごチケって知ってる？'
        ],

        ['<a href="/garasu_kougeikan"><img class="random_img_css" src="../static/img/ebetsu_glass.jpg" alt=""></a>',
        '江別市ガラス工芸館',
        '吹きガラス体験してみる？'
        ]
        ['<a herf="#"><img class="ramdom_img_css" src="../static/img_spot/centennial_monument.jpg"></a>',
        '百年記念塔',
        '塔に立ち入ることはできないけど、札幌市街地を一望できるよ！'
        ]
        ['<a herf="#"><img class="ramdom_img_css" src="../static/img_spot/ceramicartcenter.jpg"></a>',
        'セラミックアートセンター',
        '江別市の特産品「レンガ」にまつわる展示がたくさん！'
        ]
        ['<a herf="#"><img class="ramdom_img_css" src="../static/img_spot/earthdream.jpg"></a>',
        '角山アースドリーム',
        'いろんな動物と触れ合える体験型牧場！'
        ]
        ['<a herf="#"><img class="ramdom_img_css" src="../static/img_spot/ebetsu_tutaya.jpg"></a>',
        '江別 蔦屋書店',
        '北海道に２つしかない蔦屋書店に一つ！江別に唯一のスタバもあるよ！'
        ]
        ['<a herf="#"><img class="ramdom_img_css" src="../static/img_spot/sunabacoebetsu.jpg"></a>',
        'sunabaco ebetsu',
        '無料で使えるコアワーキングスペース！土日にはいろんなイベントも開催！'
        ]
        ['<a herf="#"><img class="ramdom_img_css" src="../static/img_spot/houraiken.jpg"></a>',
        '宝来軒菓子舗',
        '苺大福などの餅菓子がおすすめ！'
        ]
        ['<a herf="#"><img class="ramdom_img_css" src="../static/img_spot/ruelle.jpg"></a>',
        'パティスリー リュエル (Pâtisserie Ruelle)',
        '本格的なケーキを低価格で提供！'
        ]
        ['<a herf="#"><img class="ramdom_img_css" src="../static/img_spot/ginza_shoppingstreet.jpg"></a>',
        '大麻銀座商店街',
        '月1でブックストリートを開催！'
        ]
        ['<a herf="#"><img class="ramdom_img_css" src="../static/img_spot/ebri.jpg"></a>',
        'EBRI (エブリ)',
        '江別のお店がたくさん！新鮮な野菜、アンテナショップも！'
        ]
    ];

    var randCar = carChoice[Math.floor(Math.random() * carChoice.length)];
    $('.car').find('#car_img1').html(randCar[0]);
    $('.car').find('#place_name1').text(randCar[1]);
    $('.car').find('#words1').text(randCar[2]);
    


    var randCar = carChoice[Math.floor(Math.random() * carChoice.length)];
    $('.car').find('#car_img2').html(randCar[0]);
    $('.car').find('#place_name2').text(randCar[1]);
    $('.car').find('#words2').text(randCar[2]);


    var randCar = carChoice[Math.floor(Math.random() * carChoice.length)];
    $('.car').find('#car_img3').html(randCar[0]);
    $('.car').find('#place_name3').text(randCar[1]);
    $('.car').find('#words3').text(randCar[2]);


    // ----------------------------------------------------------------
    // 徒歩で大麻

    var warkingChoice = [
        ['<a href="https://sunabaco.com/"><img class="random_img_css" src="../static/img/nopporo_park.jpg" alt=""></a>',
        '道立自然公園野幌森林公園',
        '森林浴でリフレッシュできるよ？'
        ],

        ['<a href="/currypandora" target="_blank" rel="noopener"><img class="random_img_css" src="../static/img/pandora_carry.jpg" alt=""></a>',
        'カレーパンドラ江別店',
        'ワンコインで美味しいカレーが食べられる！おごチケって知ってる？'
        ],

        ['<a href="#"><img class="random_img_css" src="../static/img/ebetsu_glass.jpg" alt=""></a>',
        '江別市ガラス工芸館',
        '吹きガラス体験してみる？'
        ]


    ];

    var randWark = warkingChoice[Math.floor(Math.random() * warkingChoice.length)];
    $('.wark').find('#wark_img1').html(randWark[0]);
    $('.wark').find('#wark_place_name1').text(randWark[1]);
    $('.wark').find('#wark_words1').text(randWark[2]);
    


    var randWark = warkingChoice[Math.floor(Math.random() * warkingChoice.length)];
    $('.wark').find('#wark_img2').html(randWark[0]);
    $('.wark').find('#wark_place_name2').text(randWark[1]);
    $('.wark').find('#wark_words2').text(randWark[2]);


    var randWark = warkingChoice[Math.floor(Math.random() * warkingChoice.length)];
    $('.wark').find('#wark_img3').html(randWark[0]);
    $('.wark').find('#wark_place_name3').text(randWark[1]);
    $('.wark').find('#wark_words3').text(randWark[2]);











});

