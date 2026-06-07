Triết lý TS

trong TS chúng ta phải mô tả hình dạng cho mọi dữ liệu bằng type hoặc interface.
Nguyên tắc: Mọi object mọi hàm , mọi API respone phải có hợp đồng dữ liệu viết bằng 
interface hoặc type

Hình dạng là  = nó có những field nào, mỗi field thuộc kiểu gì, field nao bắt buộc, field nào tùy chọn

nguoi tạo dữ liệu phải tạo đúng shape (đủ field, đủ kiểu)
người dùng đc TS đảm bảo: field nào tồn tại, có thể thiếu hay ko, kiểu gì

Interface:  mình cứ tưởng tượng nó giống như bản thiết kế nhà
- kiến truc sư vẽ bản thiết kế (interface)trc
- thợ xây phải xây dưunjg ĐÚNG THEO thiết kế (object/class phải tuân theo interface)
- có thể mở rộng thiết kế (thêm phòng, thêm tầng = extends)
- nhiều kiến trúc sư có thể đống góp vào cùng 1 bản thiết kế (declaration merging)

2. TYPE ALIAS
-Mình có thể dán nhãn lên bất kì thứ gì (OBJECT, string, number, function ,tuple)

- nhưng nhãn dán ko thể sửa sau khi viết (declaration merging)
- có thể tổ hợp nhiều thứ (Union)
//============================== 
class trong TS
typescript có 1 quy tắc quan trọng: Mõi thuộc tính trong class PHẢI có giá trị trước khi object đc khởi tạo.

Optional property ?
cho pheps khai bao "Field nay co hay ko deu OK, ko can gan torng constructor"

readonly
readonly = gasn 1 laafn duy nhat(trong khai bao hoac trong constructor) sau do ko cho sua
neu sua TS se bao loi


Dấu ! (Definite assigment assertion) -> TS: Tin tôi di, field này chắc chắn sẽ có giá trị trước khi tôi dung fnos -> dù bây giờ chưa thấy gán ở 