"use strict";

// ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded",
function(){

    //1.localStorageが使えるか確認
    if (typeof localStorage === "undefined"){
        window.alert("このプラザはLocal Storage機能が実装されていません");
        return;
    } else{
        viewStorage(); //localStorageからのデータ取得とテーブルへ表示
        saveLocalStorage();//2.localStorageへ保存
        delLocalStorage();////3.
        selectTable();    ///5.
        allClearLocalStorage();///4.   
        }
    }
);
//2.localStorageへ保存
function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
    function(e){
        e.preventDefault();
        const key =document.getElementById("textKey").value;
        const value = document.getElementById("textMemo").value;
//値の入力チェック
        if(key =="" || value==""){
          Swal.fire({
             title: "Memo app" //タイトルをここに設定
            , html : "Key, Memoはいずれも必須です。" //メッセージ内容をここに設定
            , type : "error" //　ダイアログにアイコンを表示したい場合に設定する引数
            , allowOutsideClick : false // 
          });
          return;
}else{
    let w_msg = " LocalStrorageに\n 「" + key + " " + value + " 」\nを保存(save)しますか？";
    Swal.fire({
            title: "Memo app" //タイトルをここに設定
            , html : w_msg //メッセージ内容をここに設定
            , type : "question" //ダイアログにアイコンを表示したい場合に設定する引数
            , showCancelButton : true // キャンセルボタンの表示   
}).then(function(result) {
    //確認ダイアログで「OK」を押されたとき、保存する
    if (result.value === true) {
        localStorage.setItem(key, value);
        viewStorage();//LocalStorageからのデータの取得とテ－ブルへ表示
        let w_msg = "LocalStorageに" + key + " " + value + " を保存しました。";
        Swal.fire({
              title: "Memo app" //タイトルをここに設定
            , html : w_msg //メッセージ内容をここに設定
            , type : "success" //　ダイアログにアイコンを表示したい場合に設定する引数
            , allowOutsideClick : false // 枠外クリックは許可しない
        });
        document.getElementById("textKey").value = "";
        document.getElementById("textMemo").value = "";
    }
 });
}
    },false
    );
};
///3.削除
function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
    function(e) {
        e.preventDefault();
        const chkbox1 = document.getElementsByName("chkbox1");
        const table1 = document.getElementById("table1");
        let w_cnt ="0";    //選択されているチェックボックスの数が返却される
        w_cnt = selectCheckBox("del");//テーブルからデータ選択version-up2 chg : selectRadioBtn==> selectCheckBox
        
        if(w_cnt >= 1) {
           // const key = document.getElementById("textKey").value;
           //const value = document.getElementById("textMemo").value;
            let w_confirm = window.confirm("LocalStorageから選択されている"+    w_cnt + "件を削除(delete)しますか？");
            if(w_confirm === true) {//version-up1 add
                for(let i=0;  i< chkbox1.length; i++) {
                  if(chkbox1[i].checked) {
                    localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data);
                }
            }     
                viewStorage();
                let w_msg = "LocalStorageから" + w_cnt + "件を削除しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
         }
        }
        },false
    );
};
///4.全て削除
function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
    function(e) {
        e.preventDefault();
        let w_confirm = window.confirm("LocalStorageのデータを全て削除します。よろしいですか？");

        if(w_confirm === true) {
            localStorage.clear();
            viewStorage();
            let w_msg = "LocalStorageのデータを全て削除しました。";
            window.alert(w_msg);
            document.getElementById("textKey").value = "";
            document.getElementById("textMemo").value = "";
         }
        },false
    );
};

//5選択
function selectTable(){
    const select = document.getElementById("select");
    select.addEventListener("click",
    function(e){
        e.preventDefault;
        selectCheckBox("select");//テーブルからデータ選択
    },false
    );
}
 
//
function selectCheckBox(mode) {
   // let w_sel ="0";
    let w_cnt =0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey ="";
    let w_textMemo ="";

    for(let i=0;  i< chkbox1.length; i++) {
        if(chkbox1[i].checked) {
            if (w_cnt === 0){
            w_textKey = table1.rows[i+1].cells[1].firstChild.data;
            w_textMemo = table1.rows[i+1].cells[2].firstChild.data;
           // return w_sel ="1";//
            }
            w_cnt++; //
        }
    }
    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;
     //選択ボタンを押されたときのチェック
    if(mode ===  "select"){
       if(w_cnt === 1){
        return w_cnt;
       } 
    else{
      window.alert("1つ選択 (select) してください。");   
     }
     }
  //削除ボタンを押されたときのチェック
  if(mode ===  "del"){
    if(w_cnt >= 1) {
     return w_cnt;
    } 
 else {
   window.alert("1つ以上選択 (select) してください。");   
  }
  }
};
//localStorageからのデータ取得とテーブルへ以上
function viewStorage() {
    const list = document.getElementById("list");
    // htmlのテーブル初期化
    while(list.rows[0]) list.deleteRow(0);

    /// localStorageすべての情報の取得
    for(let i=0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);
         
        ///localStorageのキーと値を表示
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);   

        td1.innerHTML ="<input name='chkbox1' type='checkbox'>";
        td2.innerHTML =w_key;
        td3.innerHTML= localStorage.getItem(w_key);
    } 
    //JQ
    //sorList
    $("#table1").tablesorter({
        sortList: [[1,0]]
    });
    $("#table1").trigger("update");
};

