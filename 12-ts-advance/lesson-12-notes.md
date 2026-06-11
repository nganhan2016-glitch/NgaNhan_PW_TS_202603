Typescript type system: typeof, keyof, as & Generic
// Literal Type
kiểu giá trị cụ thể ,
//trong ts: string alf tập hợp rất nhiều chuỗi kí tjw khác nhua
// "dev" (literal type): là 1 tập hợp chỉ chứa duy nhất 1 chuỗi là chữ dev

//Biến mà chỉ lưu đc 1 giá trị thì khác gì hằng số const()

... sức mạnh nằm ở union types
-> code cực kì an toàn, KO BH sợ gõ si chính tả (dev hay devvv)
hay truyền nhầm giá tị lạ vào hệ thóng

//Type asserion (as)

trng ts as gọi là type assertion
LƯU Ý: as chỉ thay đổi cách nhìn của TS ko thay đổi dữ liệu thật khi chạy
Value Space(thực tế): dữ liêuk y nguyên, sô 5 vẫn là số 5

type space(bản vẽ): bạn dùng as đẻ gán 1 cái nhãn mới cho biến đó . vó dụ
bảo TS là dừng coi nó là số mà coi là chuỗi đi
