function backtotop(){
    ret = confirm("トップページに戻ります。よろしいですか？");
    if (ret == true){
        location.pathname = "/";
    }
}