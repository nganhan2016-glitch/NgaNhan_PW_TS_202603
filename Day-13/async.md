1. Bản chất đơn luồng (single-thread) của JS

Nhân viên duy nhất vừa làm thu ngân, vừa làm pha chế Main Thread(luồng chính) của JS.
Multi- threading -> tung ra nhiều nhân viên 1 lúc, để xử lý nhiều việc
nhưgn JS chỉ có thể làm tnwgf việc 1 , dòng này xong mới tới dòng khác

Lập trình đồng bộ (Synchronus)

-> thảm họa: nếu như thằng khách đầu tiên mà order 1 cái món cực kfi phức tạp .
-> nhân viên phải cắm mặt vào pha chế -> toàn bộ khách hàng (và cả cái quán)-> bị khóa chăt (blocked) -> ko ai đc phụ vụ ko ai đc trả loi

Trong automation, thao tác nặng nhất khiến máy tính phải tốn hàng giây đồng hồ xử lý ko phải tính toán
mà là các tác vụ I/O (Input/output - giao tiếp với thế giới bên ngoài)

Tại sao gọi LÀ I/O: bởi vì khi làm việc với các tác vụ này CPU ko tự làm -< > mà nó chỉ gửi yêu cầu (output) -> ra bên ogafi rồi ngồi đợi kết quả (input) -> thời gian chờ nằm ngôafi hoàn toàn kiêm soát của CPU - nó phụ thuộc vào tốc độ mạng, tốc độ phản hồi server, .....

Những tác vụ như nào với AT
I/O với file hệ thống
Đoc/ghj file dung lợng lớn ->để lấy data
lưu anh chup man hinh vao report sau khi chay test

I/O voi trinh duyet
click vao 1 nut (page.click())-> CPU sẽ gửi lệnh click cho trình duyệt, rồi chờ trình duyệt 
xử lý sưk kiện, render lại DOM, và phản hồi xong ...

I/O với server (network)
gọi API để tạo dữ liệu (-> phụ thuộc vào server xxwr lý)

kết nối db -> chờ server trả vêf kết quả query

Nó mới đẻ ra mô hình bất đồng bộ (asynchronus) 

Thay vì thằng cu main thread() phải đứng chờ . JS làm như này
1. Nhân viên nhận order load 1 trang web (tác vụ nặng)
2. Nó ném tác vụ đó ra phía sau cho hệ thống mạng xử lý, đồng thờ phát cho user 1 tờ biên lai (promise)
3. luồng chính lập tức rảnh tay, quay sang phục vụ khách B (chạy tiếp các dòng code bên dưới như đém thời gian, ...etc)

4. Khi web load xong, hệ thống ngầm sẽ "réo tên" cái biên lai (promiuse) -> để ử lý tiếp

Trong js, thì promise -> lời hứa, chính là tờ biên lai thứ tự. 
Tờ biên lai sẽ đại diện cho 1 cái kết quả SẼ CÓ TRONG TƯƠNG LAI

-. có 3 trạng thái
pending() : mìnhvuawf cầm tờ biên lai. hệ thống mang đi chạy ngầm để tải trang web -> lúc này chưa có dữ liẹu
fulfilled/Resolved (thành công) -> trang web tải xong 100%
rejected . rớt mạng (timeout) -> lúc này tờ biên lai bị huyển kèm theo lỗi

để có thể lấy được thông tin từ promise chúng ta dùng 2 phương thức ghép nối 
.then(callback): sẽ tgwk động kích hoạt nếu promise thành công (resolved) (dùng để lấy dữ liệu làm bc típ)
.catch(callback) sẽ tự động kích hoạt nếu promiuse thât bại (rejected)

syntax

const tenPromise = new Promise((resolve, reject) =>{

      //làm việc bấtg đồng bộ ở đây
      nếu thành công
      resolved(giaTriThanhCong)

      nếu thất bại
      reject(lyDoLoi)

})

- Đầu ra của `new Promise(...)` là một Promise.
- Chúng ta sẽ dùng `.then()` hoặc `.catch()` để đón kết quả từ Promise.

Giá trị truyền vào resolve(), reject() sẽ tự động chảy ra thành tham số đầu vào cho .then() hoăck catch()

.Đâ chính là cầu nối dữ liệu giúp luôn chuyển xuyên suốt promise
resolve() và reject chi nhan dung 1 gia tri, gia tri do co the la: 

Chaining (xâu chuỗi) - Khi then() truyền dữ liệu cho nhau

nếu bên trong then() return 1 giá trị -> giá trị đó sẽ tự động trở thành đầu vào cho .then() khác tiếp theo trong chuỗi
Dữ liệu cứ thế chảy từ bước này sang bước khác


các cách bắt lỗi (catch reject)
Khi 1 promise bị reject() -> Js sẽ tìm chỗ xử lý lỗi gần nhất
có 3 cách
c1: catch() ở cuối chuỗi (hay dùng nhât)
bắt lỗi từ bất kfi trhen() nào phía trên văn lỗi
c2: Mình có thể dùng catch() khi dùng then() 2 tham số (ít dùng)
c3: catch() xen giữa chuối (NÂNG CAO) -> bắt lỗi từng bước , xử lý xong rồi chạy tiếp 

setTimeout()
cú pháp setTimeout(callBack, delay)

//thực tế gặp promise trong JS
//wrap (nghĩa là dưới cái lớp vỏ của hàm người ta đã sử dụng promise bên dưới) -> đưunsg vai trò người dùng ta sẽ dùng then() và catch() để lấy
// dữ liệu

//fetch() gọi api - promise có sẵn dùng rât nhiều
// fetch() la 1 vd ham goi xong la nhan duoc promise -> ta ko can dinh nghia new promise

ASYNC / AWAIT -> là 1 lớp vỏ bọc của promise và then -> tac dung viet code de nhin hon thoi

async -> biến 1 hàm thuong thanh 1 ham bat dong bo
-> làm cho hàm đó ochacs chắn 100% là sẽ trả về 1 promise -> dù mình có return 1 giá trị bình tường.
JS sẽ tự động bọc nó trong PROMISE.resolve()
-> bên trong hàm ta có quyền sử dụng từ await

await -
đặt await trước lệnh trả về promise -> nó sẽ

tạm dừng dòng code bên trong hàm async -> chờ promise hoàn tất
trả về giá tị mà promise resolve() -> có thể gán thẳng vào biến
ko làm đóng băng hệ thống

//BẢN CHÂT: AWAIT CÓ CHỜ ĐỢI, NHƯNG NÓ CHỈ ĐÓNG BĂNG TRONG PHẠM VI CÁI HÀM ĐÓ> còn thế giới bên ngoài vẫn tiếp tuc
//Chờ đợi (pausing) nội bộ khác hoàn toàn với việc ĐÓNG BĂNG HÊK THỐNG

Promise.all - Chạy song song và gop kết quả

let ketqua = await PRomise.all([promise1, promise2.....])
Cách hoạt động của promise.all

1. nhận vào 1 mảnh chứa nhiều promise
2. kiicshj hoạt tất cả promise chạy cùng 1 lúc (//)
3. đợi cho đến khi tất cả đều resolve song
4. Trả về 1 mảng kêt squar theo đúng thứ tự ban đầu


THỜI GIAN = thời gian tác vụ lâu nhât (ko cộng đồn)

nếu bất kì promise nào trong mảng bị reject() . PRomise.all sẽ dưungf ngay va nhay vao catch() - cac promise kahc du da thanh cong
cung bi bo qua
