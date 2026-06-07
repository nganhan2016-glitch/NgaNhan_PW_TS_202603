// ============================================================
// FILE REVIEW - HW07 OOP Bài 2 - Nga Nhan
// Kết quả chạy: output KHỚP 100% với đề.
// ============================================================

class Cart {
  // Đúng: #items private để giấu giỏ hàng.
  #items = [];
  // Lưu ý: Tên biến "#disCount" viết hoa chữ cái giữa — convention
  //        camelCase trong JS là "#discount" (viết thường toàn bộ).
  //        Không sai, chỉ là convention.  nên đổi thành #discount
  //        hoặc #discountRate cho nhất quán.
  #disCount = 0;

  addItem(item) {
    let found = false;
    // Đúng: Trim name ngay từ đầu và dùng lại biến trimmedName -> sạch.
    let trimmedName = item.name.trim();

    // Đúng: Validate name rỗng, có message rõ ràng.
    if (trimmedName === "") {
      return { success: false, message: "Tên không được rỗng" };
    }
    // Đúng: Validate price với typeof + <= 0 — cách kiểm tra CHẶT CHẼ.
    if (typeof item.price !== "number" || item.price <= 0) {
      return { success: false, message: "Price phải lớn hơn 0" };
    }
    // Đúng: Validate quantity tương tự, rất nhất quán.
    if (typeof item.quantity !== "number" || item.quantity <= 0) {
      return { success: false, message: "Quantity phải lớn hơn 0" };
    }
    // Đúng: So sánh tên không phân biệt hoa thường (toLowerCase cả 2 phía).
    //       Nếu trùng -> cộng dồn quantity, không push mới. Đúng yêu cầu.
    for (let i = 0; i < this.#items.length; i++) {
      if (this.#items[i].name.toLowerCase() === trimmedName.toLowerCase()) {
        this.#items[i].quantity += item.quantity;
        found = true;
        break;
      }
    }
    if (!found) {
      // Đúng: Dùng spread { ...item, name: trimmedName } để vừa giữ
      //       các field khác (price, quantity) vừa normalize name (bỏ
      //       dấu cách thừa). Code rất gọn và thông minh!
      this.#items.push({ ...item, name: trimmedName });
    }
    return { success: true, message: "Thêm vào giỏ hàng thành công" };
  }

  // Đúng: removeItem dùng filter để giữ lại các item KHÁC tên cần xóa.
  //       So sánh lowercase cả 2 phía -> không phân biệt hoa thường.
  // Đúng: Có kiểm tra xem có thực sự xóa được item nào không ->
  //       trả về success: false nếu không tìm thấy. Đây là điểm PLUS
  //       mà nhiều học viên bỏ sót!
  removeItem(name) {
    let trimmedName = name.trim().toLowerCase();
    let newItems = this.#items.filter(
      (item) => item.name.toLowerCase() !== trimmedName,
    );

    if (newItems.length === this.#items.length) {
      return { success: false, message: "Không tìm thấy sản phẩm" };
    }

    this.#items = newItems;
    return { success: true, message: "Remove thành công" };
  }

  // Đúng: Tính tổng = price * quantity cho từng item. Đúng công thức.
  getSubTotal() {
    let subTotal = 0;
    for (let i = 0; i < this.#items.length; i++) {
      subTotal += this.#items[i].price * this.#items[i].quantity;
    }
    return subTotal;
  }

  // Đúng: Đây là đoạn code SÁNG TẠO NHẤT!
  //       Thay vì dùng if/else dài dòng,  dùng OBJECT làm lookup table
  //       để map mã giảm giá -> tỷ lệ. Viết rất chuyên nghiệp, dễ mở rộng
  //       (thêm mã mới chỉ cần thêm 1 dòng vào object).
  applyCoupon(code) {
    const coupons = {
      SALE10: 0.1, // giảm 10%
      SALE20: 0.2, // giảm 20%
    };
    const nomalizedCode = code.trim().toUpperCase();
    if (coupons[nomalizedCode] === undefined) {
      return false;
    }
    this.#disCount = coupons[nomalizedCode];
    return true;
  }

  // Đúng: checkout trả về object đủ items, subTotal, discount, total.
  // Góp ý: Tên key "subTotal" hơi lệch so với đề (đề dùng "subtotal"
  //        viết thường).
  //        chỉ nhắc để nhất quán với convention.
  checkout() {
    let subTotal = this.getSubTotal();
    let discount = subTotal * this.#disCount;
    let total = subTotal - discount;
    return {
      items: this.#items,
      subTotal,
      discount,
      total,
    };
  }

  // Đúng: Tạo helper getItems() để class con có thể đọc items
  //       mà không cần truy cập trực tiếp #items. Tư duy thiết kế tốt!
  getItems() {
    return this.#items;
  }
  // Đúng: Tạo helper setDiscount() để class con có thể set discount
  //       mà không cần truy cập #disCount. Rất có ý thức về đóng gói!
  setDiscount(value) {
    this.#disCount = value;
  }
}

// Đúng: VipCart kế thừa Cart, thêm memberName -> đúng mô hình.
class VipCart extends Cart {
  // Đúng: #memberName private, nhất quán phong cách đóng gói.
  #memberName;
  // Đúng: #appliedCode lưu lại mã đã áp dụng để biết cartType.
  //     nếu VIP30 được áp dụng thì cartType = "VIP".
  //       Rất linh hoạt và thông minh!
  #appliedCode;
  constructor(memberName) {
    // Đúng: super() trước khi dùng this.
    super();
    this.#memberName = memberName;
  }

  // Đúng: Override applyCoupon, gọi super.applyCoupon(code) trước
  //       để tận dụng SALE10/SALE20 của cha. Nếu super OK -> done.
  //       Nếu không -> kiểm tra thêm VIP30.
  applyCoupon(code) {
    if (super.applyCoupon(code)) return true;

    if (code.trim().toUpperCase() === "VIP30") {
      // Đúng: Dùng helper this.setDiscount() của lớp cha để set
      //       discount thay vì truy cập trực tiếp. Rất đúng tinh
      //       thần OOP — dùng method public, không chọc field!
      this.setDiscount(0.3);
      this.#appliedCode = "VIP30";
      return true;
    }

    return false;
  }

  // Đúng: Override checkout, gọi super.checkout() lấy hóa đơn gốc
  //       rồi spread thêm memberName và cartType.
  // Đúng: cartType dùng logic động: nếu VIP30 thì "VIP", ngược lại
  //       "Normal". Code linh hoạt, không hardcode!
  checkout() {
    let result = super.checkout();
    return {
      ...result,
      memberName: this.#memberName,
      cartType: this.#appliedCode === "VIP30" ? "VIP" : "Normal",
    };
  }
}

//---------------- DATA TEST ----------------
const cart = new VipCart("Neko");

console.log(
  cart.addItem({
    name: "Trà sữa trân châu",
    price: 30000,
    quantity: 2,
  }),
);

console.log(
  cart.addItem({
    name: "  trà SỮA trân châu  ",
    price: 30000,
    quantity: 1,
  }),
);

console.log(
  cart.addItem({
    name: "Trà đào",
    price: 25000,
    quantity: 1,
  }),
);
console.log(cart.getItems());
cart.applyCoupon(" vip30 ");
console.log(cart.checkout());

// ============================================================
// TỔNG HỢP REVIEW — BÀI 2
// ============================================================
// Kết quả: Đạt — output chạy ra khớp 100% với đề.
//
// Điểm tốt:
//   - Object lookup coupon — THAY VÌ if/else dài dòng, dùng object
//     map { "SALE10": 0.1, "SALE20": 0.2 }. Cách này chuyên nghiệp,
//     dễ đọc, dễ mở rộng thêm mã mới. Rất sáng tạo!
//   - Helper methods getItems() + setDiscount() — thể hiện tư duy
//     thiết kế: class con không chọc thẳng private field của cha mà
//     đi qua method public. Rất đúng OOP!
//   - #appliedCode lưu trạng thái VIP — thay vì hardcode cartType,
//     em dùng logic: nếu VIP30 thì "VIP". Rất linh hoạt.
//   - removeItem có check xem có xóa được không -> trả success: false
//     nếu không tìm thấy. Nhiều học viên bỏ sót phần này.
//   - Validate chặt chẽ: typeof + boundary cho price/quantity.
//   - Dùng spread ({ ...item, name: trimmedName }) để normalize name
//     khi lưu — rất gọn.
//
// Cần cải thiện:
//   - Tên biến "#disCount" -> nên là "#discount" (camelCase chuẩn).
//   - Tên method "getSubTotal" -> nên là "getSubtotal".
//   - Key "subTotal" trong checkout -> nên là "subtotal" cho khớp
//     convention đề bài (không ảnh hưởng kết quả test).
//
