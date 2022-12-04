function onFormSubmit(e) {
  // フォームの回答を取得
  var name = e.namedValues['お名前'][0];
  var email = e.namedValues['メールアドレス'][0];
  var message = e.namedValues['お問い合わせ内容'][0];
  
  // 自動返信メール件名
  var subject = 'お問い合わせいただきありがとうございました。';
      
  // 自動返信メール本文
  var body = name + '様\n' +
    '\n' +
    'この度はお問い合わせいただき、誠にありがとうございました。' +
    '\n' +
    '後日、改めてご連絡させていただきますので\n' +
    'よろしくお願い申し上げます。\n' + 
    '\n' +
    '─────────────────────────\n' +
    'ご送信内容の確認\n' +
    '─────────────────────────\n' +
    '\n' +
    '【氏名】\n' +
    name + '\n' + 
    '\n' +
    '【メールアドレス】\n' +
    email + '\n' + 
    '\n' +
    '【お問い合わせ内容】\n' +
    message;
  
  // メール送信
  MailApp.sendEmail({
    to: email,
    subject: subject,
    body: body
  });

  keys = Object.keys(e.namedValues).sort()
  qa_list = keys.map( key => "### " + key + "\n" + e.namedValues[key] + "\n")
  
  url = ""
  token = ""
  options = {
    "method": "post",
    "headers" : {
      "Authorization": "token " + token, 
      "Accept": "application/vnd.github.v3+json"
    },
    "payload" : JSON.stringify({
      "title": "[お問い合せ] " + name + "様",
      "body": qa_list.join("\n")
    })
  }
  UrlFetchApp.fetch(url, options)