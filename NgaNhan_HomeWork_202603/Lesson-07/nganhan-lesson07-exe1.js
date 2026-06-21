class ProductStore {
    #products = [];

    addProduct(product) {
        // 1. Kiểm tra id trùng
        const isDuplicate = this.#products.some(p => p.id === product.id);
        if (isDuplicate) {
            return { success: false, message: "ID đã tồn tại" };
        }

        // 2. Kiểm tra name
        if (!product.name || product.name.trim() === "") {
            return { success: false, message: "Tên sản phẩm không được rỗng" };
        }

        // 3. Kiểm tra category
        if (!product.category || product.category.trim() === "") {
            return { success: false, message: "Danh mục không được rỗng" };
        }

        // 4. Kiểm tra price
        if (typeof product.price !== "number" || product.price <= 0) {
            return { success: false, message: "Giá phải lớn hơn 0" };
        }

        // 5. Kiểm tra inStock
        if (typeof product.inStock !== "boolean") {
            return { success: false, message: "inStock phải là kiểu boolean" };
        }

        // Tất cả hợp lệ → thêm vào mảng
        this.#products.push(product);
        return { success: true, message: "Thêm sản phẩm thành công" };
    }

    findByName(keyword) {
        const trimedKeyword = keyword.trim();
        return this.#products.filter(p =>
            p.name.toLowerCase().includes(trimedKeyword.toLowerCase())
        );
    }

    filterByCategory(category) {
        const trimedCategory = category.trim();
        return this.#products.filter(p =>
            p.category.toLowerCase().includes(trimedCategory.toLowerCase())
        );
    }

    getAvailableProducts() {
        return this.#products.filter(p => p.inStock);
    }

    getTotalInventoryValue() {
        let total = 0;
        const availableProducts = this.#products.filter(p => p.inStock);
        for (let i = 0; i < availableProducts.length; i++) {
            total += availableProducts[i].price;
        }
        return total;
    }

}

class DiscountProductStore extends ProductStore {
    #discountRate;
    constructor(discountRate) {
        super();
        this.#discountRate = discountRate;
    }

    getTotalInventoryValue() {
        let originalTotal = super.getTotalInventoryValue();
        let totalAfterDiscount = originalTotal - (originalTotal * this.#discountRate);
        return totalAfterDiscount;
    }

    getDiscountInfo() {
        let originalTotal = super.getTotalInventoryValue();
        let discountAmount = originalTotal * this.#discountRate;
        let finalTotal = originalTotal - discountAmount;
        return {
            originalTotal,
            discountRate: this.#discountRate,
            discountAmount,
            finalTotal
        };
    }
}

//================
const store = new DiscountProductStore(0.1);

console.log(store.addProduct({
    id: "p01",
    name: "  iPhone 15 Pro  ",
    category: "phone",
    price: 29990000,
    inStock: true,
}));

console.log(store.addProduct({
    id: "p02",
    name: "MacBook Air",
    category: "laptop",
    price: 24990000,
    inStock: true,
}));

console.log(store.addProduct({
    id: "p03",
    name: "AirPods Pro",
    category: "audio",
    price: 5990000,
    inStock: false,
}));

console.log(store.addProduct({
    id: "p01",
    name: "Duplicate",
    category: "phone",
    price: 1000,
    inStock: true,
}));

console.log("Danh sách sản phẩm chứa Name = iphone: ", store.findByName("iphone"));
console.log("Danh sách sản phẩm chứa Category = PHONE: ", store.filterByCategory(" PHONE "));
console.log("Danh sách sản phẩm còn hàng: ", store.getAvailableProducts());
console.log("Thông tin giảm giá: ",store.getDiscountInfo());

