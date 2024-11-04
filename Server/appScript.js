function doPost(e) {
    // const data = {username: "20201543", action: "Play", detail: {state: 'gameover',playerLevel: "1",computerLevel: "3",playerResources: "100"}}    // 디버깅용
    const data = JSON.parse(e.postData.contents);
    const username = data.username;
    const action = data.action;
    let response = {};
  
  
    // 들어온 action이 무엇인지 판단
    switch(action){
      case "Login":
        const password = data.password;
        const sheet = SpreadsheetApp.openById('1M4DPWRFjx4b1vcnsuy0h-VMp-US_SacrGX5fw49_9TI').getSheetByName('userAuth');
        const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues();
  
        response = { success: false, message: 'Invalid credentials' };

        // for 문으로 데이터 탐색
        for (let i = 0; i < values.length; i++) {
          if (values[i][0].toString() === username && values[i][1].toString() === password) {
            response = { success: true, message: 'Login successful'};
            logging(username, action,"loginLog");
            break;
          }
        }
        break;
      case "Play":
        const detail = data.detail;
        logging(username, action,"playLog", detail);
        break;
      case "Exit":
        logging(username, action, "loginLog");
        break;
  
      default:
        response = {message: "Error"}
        
    }
  
    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // 로그 남기기
  function logging(username="",action,sheetname,detail={})
    {
  
      const logSheet = SpreadsheetApp.openById('1M4DPWRFjx4b1vcnsuy0h-VMp-US_SacrGX5fw49_9TI').getSheetByName(sheetname);
      const timestamp = new Date();   // 현재 시간정보
      const eventDate = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), "yyyy-MM-dd");   // 날짜
      const eventTime = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), "HH:mm:ss");     // 시간
  
      // 마지막 eventId 가져오기
      const lastRow = logSheet.getLastRow();
      let eventId = 0;
      if (lastRow > 1) {
        eventId = logSheet.getRange(lastRow, 1).getValue() + 1;
      }
      const logData = [eventId, eventDate, eventTime, username, action];
  
      // detail 객체의 키-값 쌍을 배열에 추가
      for (const [key, value] of Object.entries(detail)) {
          logData.push(value); // detail의 각 값을 추가
      }
  
      // 로그 추가
      logSheet.appendRow(logData);
  }
  