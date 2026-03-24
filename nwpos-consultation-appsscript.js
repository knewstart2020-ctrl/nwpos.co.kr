/**
 * 누리네트웍스포스 — 상담신청 자동화
 * 
 * 1. 구글시트에 상담접수 데이터 저장
 * 2. 네이버웍스 원격/설치의뢰 메세지방에 알림 전송
 * 
 * ─── 설정 방법 ───
 * 1. Google Sheets에서 새 스프레드시트 생성 → 시트명: "상담접수"
 *    헤더행(1행): 접수일시 | 고객명 | 연락처 | 상담유형 | 상담가능시간 | 요청사항 | 처리상태
 * 2. 확장 프로그램 → Apps Script 열기
 * 3. 이 코드를 붙여넣기
 * 4. NAVER_WORKS_WEBHOOK_URL에 네이버웍스 Incoming Webhook URL 입력
 * 5. 배포 → 새 배포 → 웹 앱 → 액세스: "모든 사용자" → 배포
 * 6. 생성된 URL을 support.html의 SCRIPT_URL에 붙여넣기
 */

// ═══ 설정 ═══
var SHEET_NAME = '상담접수';
var NAVER_WORKS_WEBHOOK_URL = 'YOUR_NAVER_WORKS_WEBHOOK_URL_HERE';
// 네이버웍스 > 원격/설치의뢰 메세지방 > 봇 > Incoming Webhook > URL 복사

// ═══ POST 요청 처리 ═══
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    // 1. 구글시트에 저장
    saveToSheet(data);
    
    // 2. 네이버웍스에 전송
    sendToNaverWorks(data);
    
    return ContentService.createTextOutput(
      JSON.stringify({result: 'success'})
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({result: 'error', message: error.toString()})
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// ═══ GET 요청 처리 (테스트용) ═══
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({status: 'ok', message: '누리네트웍스 상담접수 API 정상 작동'})
  ).setMimeType(ContentService.MimeType.JSON);
}

// ═══ 구글시트 저장 ═══
function saveToSheet(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['접수일시', '고객명', '연락처', '상담유형', '상담가능시간', '요청사항', '처리상태']);
    // 헤더 스타일
    var header = sheet.getRange(1, 1, 1, 7);
    header.setFontWeight('bold');
    header.setBackground('#1B3A8C');
    header.setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
  }
  
  sheet.appendRow([
    data.date || new Date().toLocaleString('ko-KR'),
    data.name || '',
    data.phone || '',
    data.consultType || '',
    data.time || '',
    data.memo || '',
    '접수완료'  // 초기 상태
  ]);
  
  // 열 너비 자동 조정
  sheet.autoResizeColumns(1, 7);
}

// ═══ 네이버웍스 전송 ═══
function sendToNaverWorks(data) {
  if (NAVER_WORKS_WEBHOOK_URL === 'YOUR_NAVER_WORKS_WEBHOOK_URL_HERE') {
    Logger.log('네이버웍스 Webhook URL 미설정 — 전송 건너뜀');
    return;
  }
  
  var message = '📋 [홈페이지 상담접수]\n\n'
    + '👤 고객명: ' + (data.name || '-') + '\n'
    + '📞 연락처: ' + (data.phone || '-') + '\n'
    + '📌 상담유형: ' + (data.consultType || '-') + '\n'
    + '⏰ 상담가능시간: ' + (data.time || '-') + '\n'
    + '💬 요청사항: ' + (data.memo || '없음') + '\n'
    + '📅 접수일시: ' + (data.date || new Date().toLocaleString('ko-KR'));
  
  var payload = {
    'content': {
      'type': 'text',
      'text': message
    }
  };
  
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload),
    'muteHttpExceptions': true
  };
  
  var response = UrlFetchApp.fetch(NAVER_WORKS_WEBHOOK_URL, options);
  Logger.log('NaverWorks response: ' + response.getResponseCode());
}

// ═══ 테스트 함수 ═══
function testSubmit() {
  var testData = {
    name: '테스트고객',
    phone: '01012345678',
    consultType: '신규상담',
    time: '10시~11시',
    memo: '포스 설치 문의',
    date: '2026.3.24 10:30'
  };
  
  saveToSheet(testData);
  sendToNaverWorks(testData);
  Logger.log('테스트 완료');
}
