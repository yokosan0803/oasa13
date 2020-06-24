$(function(){
    var quizArea = $('.quiz_area'); //クイズを管理するDOMを指定
    var quiz_html = quizArea.html(); //もう一度　を押した時に元に戻すため初期HTMLを変数で保管
    var quiz_cnt = 0; //現在の問題数を管理
    var quiz_fin_cnt = 5; //何問で終了か設定（クイズ数以下であること）
    var quiz_success_cnt = 0; //問題の正解数
    
    //クイズの配列を設定
    //answerの選択肢の数はいくつでもOK　ただし先頭を正解とすること(出題時に選択肢はシャッフルされる)
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

    // ----------------------------------------------------------------
    // 車で大麻

    var carChoice = [
        ['<a href="https://sunabaco.com/"><img class="random_img_css" src="../static/img/nopporo_park.jpg" alt=""></a>',
        '道立自然公園野幌森林公園',
        '森林浴でリフレッシュできるよ？'
        ],

        ['<a href="./currypandora.html"><img class="random_img_css" src="../static/img/pandora_carry.jpg" alt=""></a>', 
        'カレーパンドラ江別店',
        'ワンコインで美味しいカレーが食べられる！おごチケって知ってる？'
        ],

        ['<a href="#"><img class="random_img_css" src="../static/img/ebetsu_glass.jpg" alt=""></a>',
        '江別市ガラス工芸館',
        '吹きガラス体験してみる？'
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

        ['<a href="#"><img class="random_img_css" src="../static/img/pandora_carry.jpg" alt=""></a>', 
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

