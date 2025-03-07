// 구분자 추가 유틸 함수
function addDelimiter(value: number | string, delimiter = ',') {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
}

export default addDelimiter;
