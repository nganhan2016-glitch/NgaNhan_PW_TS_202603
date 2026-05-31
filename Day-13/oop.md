
Tinh chat cua OOP:
1. Ke thua
2. Dong goi
3. Da hinh - cung 1 lenh nhung co nhiu cach lam
Định nghĩa: Đa hình cho phép calss con ghi đè (override) hoặc thay đổi cách thức hoạt động của 1 phương thưics mà nó nhận từ cha

Kế thừa
Trọng tâm: Con nhận lại tài sản của cha
Câu hỏi: Con lấy gì từ cha
Đa hình
Trọng Tâm: cùng 1 lệnh, có nhiều cách chạy
Câu hỏi: Gọi cùng hàm, ai chạy kiểu nnaof?
=> Đa hình bạn ko cần biết đang cầm loại object nào -> cứ gọi hàm là nó tự chạy đúng

4. Trừu tượng (abstraction)
Định nghĩa: Trừu tượng hóa là việc che giấu đi sự phức tạp của hệ thống, chỉ phơi ra 
những giao diện (hàm, tính năng) đơn giản nhất, dễ hiểu nháta cho user
JS thuần ko có từ khóa abstract > tính trừu tượng của JS chủ yếu là 1 tư duy thiết kết hợp với tính đóng gói

class PaymentGate{
//Hàng tá logic phức tạp
doiTheNganHang()
nnhapOTP()

//Tính trưugf tượng của calsss
-> phơi bày duy nhất 1 nút bấm hay tính năng cho user dùng
thanhToanNhanh(soThe, OTP){
this.doiTheNGangHang()
this.nhapOTP()
}
}

Trừu tượng # đóng gói ->

đóng gói = giấu dữ liệu (private, ) -> cấm đụng vào dữ liệu kín

trường tượng = giấu logic phức tạp -> bạn ko cần biết bên trong làm gì -> cứ bấm nút chạy

đóng gói là giáu biến. Còn trừu tượng là giấu cáhc hoạt động
Composition (kết hợp) và Inheritance (kế thừa) -> doi TS hoc lai