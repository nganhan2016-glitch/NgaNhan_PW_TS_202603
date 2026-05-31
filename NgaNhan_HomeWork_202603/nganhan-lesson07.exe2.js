class Cart {
    #items = [];
    #disCount = 0;

    addItem(item) {
        let found = false;
        let trimmedName = item.name.trim();

        if (trimmedName === "") {
            return { success: false, message: "Tên không được rỗng" };
        }
        if (typeof (item.price) !== "number" || item.price <= 0) {
            return { success: false, message: "Price phải lớn hơn 0" };
        }
        if (typeof (item.quantity) !== "number" || item.quantity <= 0) {
            return { success: false, message: "Quantity phải lớn hơn 0" };
        }
        for (let i = 0; i < this.#items.length; i++) {
            if (this.#items[i].name.toLowerCase() === trimmedName.toLowerCase()) {
                this.#items[i].quantity += item.quantity;
                found = true;
                break;
            }
        }
        if (!found) {
            this.#items.push({ ...item, name: trimmedName });
        }
        return { success: true, message: "Thêm vào giỏ hàng thành công" };
    }

    removeItem(name) {
        let trimmedName = name.trim().toLowerCase();
        let newItems = this.#items.filter(item =>
            item.name.toLowerCase() !== trimmedName
        );

        if (newItems.length === this.#items.length) {
            return { success: false, message: "Không tìm thấy sản phẩm" };
        }

        this.#items = newItems;
        return { success: true, message: "Remove thành công" };
    }

    getSubTotal() {
        let subTotal = 0;
        for (let i = 0; i < this.#items.length; i++) {
            subTotal += this.#items[i].price * this.#items[i].quantity;
        }
        return subTotal;
    }

    applyCoupon(code) {
        const coupons = {
            "SALE10": 0.10,  // giảm 10%
            "SALE20": 0.20,  // giảm 20%
        };
        const nomalizedCode = code.trim().toUpperCase();
        if (coupons[nomalizedCode] === undefined) {
            return false;
        }
        this.#disCount = coupons[nomalizedCode];
        return true;
    }

    checkout() {
        let subTotal = this.getSubTotal();
        let discount = subTotal * this.#disCount;
        let total = subTotal - discount;
        return {
            items: this.#items,
            subTotal,
            discount,
            total
        }
    }

    getItems() {
        return this.#items;
    }
    setDiscount(value) {
        this.#disCount = value;
    }
}

class VipCart extends Cart {
    #memberName
    #appliedCode
    constructor(memberName) {
        super();
        this.#memberName = memberName;
    }

    applyCoupon(code) {
        if (super.applyCoupon(code)) return true;

        if (code.trim().toUpperCase() === "VIP30") {
            this.setDiscount(0.30);
            this.#appliedCode = "VIP30";
            return true;
        }

        return false;
    }

    checkout() {
        let result = super.checkout();
        return {
            ...result,
            memberName: this.#memberName,
            cartType: this.#appliedCode === "VIP30" ? "VIP" : "Normal",
        };
    }
}

//----------------
const cart = new VipCart("Neko");

console.log(cart.addItem({
    name: "Trà sữa trân châu",
    price: 30000,
    quantity: 2,
}));

console.log(cart.addItem({
    name: "  trà SỮA trân châu  ",
    price: 30000,
    quantity: 1,
}));

console.log(cart.addItem({
    name: "Trà đào",
    price: 25000,
    quantity: 1,
}));
console.log(cart.getItems());
cart.applyCoupon(" vip30 ");
console.log(cart.checkout());
