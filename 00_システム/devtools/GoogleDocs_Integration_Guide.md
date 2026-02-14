# Googleドキュメント自動保存システム 導入ガイド

私があなたのGoogleドキュメントに直接記事を保存できるようにするための「架け橋（API）」を作ります。
一度設定してしまえば、今後は私が「保存しておきました！」と言えるようになります。

## 手順 1: Googleドキュメント側の準備

1.  保存先にしたい **Googleドキュメント** を開きます（新規作成でも既存でもOK）。
2.  メニューの **[拡張機能]** > **[Apps Script]** をクリックします。
3.  開いた画面のコードをすべて消し、以下のコードを貼り付けてください。

```javascript
// エディタに貼り付けるコード
function doPost(e) {
  // 1. 送られてきたデータを受け取る
  var params = JSON.parse(e.postData.contents);
  var title = params.title;
  var body = params.body;
  var date = params.date;
  
  // 2. 現在のドキュメントを取得
  var doc = DocumentApp.getActiveDocument();
  var bodyElem = doc.getBody();
  
  // 3. 区切り線と日付を入れる
  bodyElem.appendHorizontalRule();
  var datePara = bodyElem.appendParagraph("📅 " + date);
  datePara.setHeading(DocumentApp.ParagraphHeading.HEADING3);
  
  // 4. タイトルを入れる
  var titlePara = bodyElem.appendParagraph(title);
  titlePara.setHeading(DocumentApp.ParagraphHeading.HEADING1);
  
  // 5. 本文を入れる
  bodyElem.appendParagraph(body);
  
  // 6. 成功メッセージを返す
  return ContentService.createTextOutput("Success");
}
```

4.  **[保存]** アイコン（フロッピーマーク）をクリックし、プロジェクト名を「AI保存用」などにして保存します。

## 手順 2: ウェブアプリとして公開する

これが「私（AI）」がアクセスするための窓口になります。

1.  右上の **[デプロイ]** ボタン > **[新しいデプロイ]** をクリック。
2.  左上の歯車アイコン > **[ウェブアプリ]** を選択。
3.  設定を以下のようにします（**重要！**）：
    *   **説明**: AI保存用API
    *   **次のユーザーとして実行**: **自分** (Me)
    *   **アクセスできるユーザー**: **全員** (Anyone)
        *   ※「全員」にしないと、私が外からアクセスできません。URLを知っている人だけが投稿できる状態になります。
4.  **[デプロイ]** をクリック。
5.  「アクセスを承認」などの画面が出たら、自分のアカウントを選択し、[詳細] > [（安全ではないページ）に移動] > [許可] と進んでください。
6.  **「ウェブアプリのURL」** が表示されます。これをコピーしてください。

## 手順 3: URLを教えてください

コピーしたURLを、このチャットで私に教えてください。
（`https://script.google.com/macros/s/.../exec` という長いURLです）

URLを教えていただければ、**「先ほどのNote記事を、今すぐそこに保存」** するテストを実行します！
