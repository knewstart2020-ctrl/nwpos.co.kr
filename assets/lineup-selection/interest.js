(() => {
  const products = {
  "n250": [
    "N250",
    "포스(POS)"
  ],
  "zed3": [
    "ZED-III",
    "포스(POS)"
  ],
  "kiosk-stand": [
    "T6B 스탠드형",
    "배리어프리 키오스크"
  ],
  "kiosk-desk": [
    "T6B 탁상형",
    "배리어프리 키오스크"
  ],
  "uporder": [
    "업오더 테이블오더",
    "테이블오더"
  ],
  "qr": [
    "토스 QR오더",
    "테이블오더"
  ],
  "uppos": [
    "업포스",
    "포스(POS)"
  ],
  "okpos": [
    "오케이포스",
    "포스(POS)"
  ],
  "toss": [
    "토스프론트",
    "토스·네이버 단말기"
  ],
  "npay": [
    "네이버페이 커넥트",
    "토스·네이버 단말기"
  ],
  "t226": [
    "T226 유선단말기",
    "카드단말기"
  ],
  "m6202nq": [
    "M6202NQ 무선단말기",
    "카드단말기"
  ],
  "offline-pg": [
    "오프라인 매장 PG",
    "업무제휴/기타"
  ],
  "online-pg": [
    "온라인몰 PG",
    "업무제휴/기타"
  ],
  "paper": [
    "프린터 호환 용지",
    "업무제휴/기타"
  ]
};
  const key = new URLSearchParams(location.search).get('product');
  if (!Object.hasOwn(products, key)) return;

  const [model, type] = products[key];
  const box = Array.from(document.querySelectorAll('.mtype input')).find(input => input.value === type);
  const memo = document.querySelector('#memo');
  if (!box || !memo) return;
  box.checked = true;
  if (!memo.value.trim()) {
    memo.value = key === 'paper'
      ? '프린터 호환 용지를 문의합니다. 프린터 모델명: '
      : model + ' 도입을 상담하고 싶습니다.';
  }
})();
