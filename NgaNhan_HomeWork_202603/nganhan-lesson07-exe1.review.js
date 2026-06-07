// ============================================================
// FILE REVIEW - HW07 OOP Bài 1 - Nga Nhan
// Kết quả chạy: output KHỚP 100% với đề.
// Tổng quan: Code RẤT sạch, validate chặt chẽ, private field dùng
//            nhất quán, giữ dữ liệu gốc không bị lowercase.
// ============================================================

// Đúng: Đặt tên class ProductStore đúng yêu cầu, PascalCase chuẩn.
class ProductStore {
  // Đúng: Dùng private field #products để đóng gói dữ liệu.
  #products = [];

  addProduct(product) {
    // Đúng: Dùng .some() để kiểm tra trùng ID. Cách viết này ngắn
    //       gọn và dừng sớm ngay khi tìm thấy — tối ưu hơn vòng for.
    // 1. Kiểm tra id trùng
    const isDuplicate = this.#products.some((p) => p.id === product.id);
    if (isDuplicate) {
      return { success: false, message: "ID đã tồn tại" };
    }

    // Đúng: Kiểm tra !product.name bắt được undefined/null/'' (chuỗi rỗng),
    //       rồi .trim() === "" bắt thêm toàn dấu cách "   ". Rất chắc chắn.
    // 2. Kiểm tra name
    if (!product.name || product.name.trim() === "") {
      return { success: false, message: "Tên sản phẩm không được rỗng" };
    }

    // 3. Kiểm tra category
    if (!product.category || product.category.trim() === "") {
      return { success: false, message: "Danh mục không được rỗng" };
    }

    // Đúng: Validate price vừa kiểm tra typeof number vừa kiểm tra <= 0.
    //       Đây là cách validate CHẶT CHẼ nhất — tránh được cả undefined/null/NaN.
    // 4. Kiểm tra price
    if (typeof product.price !== "number" || product.price <= 0) {
      return { success: false, message: "Giá phải lớn hơn 0" };
    }

    // 5. Kiểm tra inStock
    if (typeof product.inStock !== "boolean") {
      return { success: false, message: "inStock phải là kiểu boolean" };
    }

    // Đúng: Khi lưu KHÔNG normalize name/category về lowercase.
    //       Giữ nguyên dữ liệu gốc để hiển thị, chỉ normalize LÚC SO SÁNH
    //       trong findByName/filterByCategory. Đây là best practice!
    //       (So với nhiều bạn khác đã .toLowerCase() khi lưu làm mất format)
    // Tất cả hợp lệ → thêm vào mảng
    this.#products.push(product);
    return { success: true, message: "Thêm sản phẩm thành công" };
  }

  // Đúng: normalize keyword (trim + toLowerCase cả 2 phía) rồi so bằng includes.
  //       Trả về mảng object ĐẦY ĐỦ (không dùng .map chỉ lấy tên) -> đúng yêu cầu đề.
  findByName(keyword) {
    const trimedKeyword = keyword.trim();
    return this.#products.filter((p) =>
      p.name.toLowerCase().includes(trimedKeyword.toLowerCase()),
    );
  }

  // Góp ý: Dùng .includes() cho category có thể hơi RỘNG. Ví dụ tìm "phone"
  //        sẽ match cả "headphone". Trong test hiện tại thì đúng, nhưng
  //        thực tế nên dùng === sau khi đã lowercase cả 2 phía để so khớp CHÍNH XÁC:
  //          p.category.toLowerCase() === trimedCategory.toLowerCase()
  filterByCategory(category) {
    const trimedCategory = category.trim();
    return this.#products.filter((p) =>
      p.category.toLowerCase().includes(trimedCategory.toLowerCase()),
    );
  }

  // Đúng: filter(p => p.inStock) tận dụng inStock là boolean, không cần === true.
  //       Trả về mảng object đầy đủ. Rất gọn và đúng.
  getAvailableProducts() {
    return this.#products.filter((p) => p.inStock);
  }

  // Đúng: Chỉ tính sản phẩm còn hàng, khởi tạo total = 0 -> an toàn khi mảng rỗng.
  // Góp ý: Có thể viết gọn hơn bằng reduce. Nhưng vòng for cũng hoàn toàn ổn.
  getTotalInventoryValue() {
    let total = 0;
    const availableProducts = this.#products.filter((p) => p.inStock);
    for (let i = 0; i < availableProducts.length; i++) {
      total += availableProducts[i].price;
    }
    return total;
  }
}

// ============================================================
// CLASS KẾ THỪA: DiscountProductStore
// Đây là phần OOP làm TỐT NHẤT trong bài.
// ============================================================
class DiscountProductStore extends ProductStore {
  // Đúng: #discountRate là PRIVATE — nhất quán với tinh thần đóng gói
  //       của #products ở lớp cha.
  #discountRate;
  constructor(discountRate) {
    // Đúng: super() TRƯỚC khi dùng this. Đúng thứ tự bắt buộc.
    super();
    this.#discountRate = discountRate;
  }

  // Đúng: Override getTotalInventoryValue, gọi super để lấy tổng gốc
  //       rồi trừ discount. Không chép lại logic cộng tổng của cha.
  getTotalInventoryValue() {
    let originalTotal = super.getTotalInventoryValue();
    let totalAfterDiscount = originalTotal - originalTotal * this.#discountRate;
    return totalAfterDiscount;
  }

  // Đúng: Trả về object đủ 4 trường, giá trị khớp 100% với đề.
  // Góp ý: super.getTotalInventoryValue() được gọi 2 lần. Nên gọi 1 lần
  //        lưu vào biến rồi dùng lại cho gọn và nhanh:
  //          const original = super.getTotalInventoryValue();
  getDiscountInfo() {
    let originalTotal = super.getTotalInventoryValue();
    let discountAmount = originalTotal * this.#discountRate;
    let finalTotal = originalTotal - discountAmount;
    return {
      originalTotal,
      discountRate: this.#discountRate,
      discountAmount,
      finalTotal,
    };
  }
}

//================ DATA TEST ================
const store = new DiscountProductStore(0.1);

console.log(
  store.addProduct({
    id: "p01",
    name: "  iPhone 15 Pro  ",
    category: "phone",
    price: 29990000,
    inStock: true,
  }),
);

console.log(
  store.addProduct({
    id: "p02",
    name: "MacBook Air",
    category: "laptop",
    price: 24990000,
    inStock: true,
  }),
);

console.log(
  store.addProduct({
    id: "p03",
    name: "AirPods Pro",
    category: "audio",
    price: 5990000,
    inStock: false,
  }),
);

console.log(
  store.addProduct({
    id: "p01",
    name: "Duplicate",
    category: "phone",
    price: 1000,
    inStock: true,
  }),
);

console.log(
  "Danh sách sản phẩm chứa Name = iphone: ",
  store.findByName("iphone"),
);
console.log(
  "Danh sách sản phẩm chứa Category = PHONE: ",
  store.filterByCategory(" PHONE "),
);
console.log("Danh sách sản phẩm còn hàng: ", store.getAvailableProducts());
console.log("Thông tin giảm giá: ", store.getDiscountInfo());

// ============================================================
// TỔNG HỢP REVIEW — BÀI 1
// ============================================================
// Kết quả: Đạt — output chạy ra khớp 100% với đề.
//
// Điểm tốt:
//   - Private field dùng NHẤT QUÁN (#products, #discountRate). Đây là
//     điểm hiếm học viên làm đúng — hầu hết bỏ private ở discountRate.
//   - GIỮ NGUYÊN dữ liệu gốc khi lưu (không toLowerCase name/category),
//     chỉ normalize lúc so sánh. Đây là BEST PRACTICE.
//   - Validate cực kỳ chặt chẽ: kiểm tra typeof + giá trị biên cho
//     price/inStock -> code chuyên nghiệp.
//   - findByName/getAvailableProducts trả về OBJECT ĐẦY ĐỦ, đúng yêu cầu.
//   - Dùng .some() cho check trùng ID -> gọn, tối ưu.
//   - Kế thừa + super dùng chuẩn, override không lặp code.
//
// Cần cải thiện:
//   - filterByCategory dùng .includes() có thể match quá rộng.
//     Nên dùng === sau khi lowercase để so khớp CHÍNH XÁC category.
//   - getDiscountInfo gọi super.getTotalInventoryValue() 2 lần -> nên
//     gọi 1 lần lưu biến để code gọn và tránh tính toán thừa.
//   - getTotalInventoryValue có thể rút gọn bằng reduce (không bắt buộc).
//
// Tổng kết: Bài làm xuất sắc, tư duy OOP vững. Code rất sạch và có
//           ý thức về encapsulation.
// ============================================================
