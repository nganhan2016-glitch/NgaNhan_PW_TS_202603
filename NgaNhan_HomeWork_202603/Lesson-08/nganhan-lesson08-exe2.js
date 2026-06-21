// ----- DANH SÁCH CHI NHÁNH cần lấy báo cáo -----
// thanhCong = false để giả lập chi nhánh mất kết nối.
const CHI_NHANH = [
    { ten: "Hà Nội", doanhThu: 120000000, thoiGian: 1500, thanhCong: true },
    { ten: "Đà Nẵng", doanhThu: 0, thoiGian: 2000, thanhCong: false },
    { ten: "TP.HCM", doanhThu: 250000000, thoiGian: 2500, thanhCong: true },
];

// ----- Hàm giả lập tải doanh thu 1 chi nhánh -----
function taiDoanhThuChiNhanh(ten, doanhThu, thoiGian, thanhCong = true) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (thanhCong) {
                resolve({ chiNhanh: ten, doanhThu });
            } else {
                reject(`Chi nhánh ${ten} mất kết nối!`);
            }
        }, thoiGian);
    });
}

function xepLoai(doanhThu) {
    if (doanhThu >= 200000000)
        return ("Xuất sắc");
    else if (doanhThu >= 100000000) {
        return ("Đạt chỉ tiêu");
    } else if (doanhThu > 0) {
        return ("Cần cải thiện");
    } else {
        return ("Không có doanh thu");
    }
}
async function tongHopBaoCao() {
    try {
        console.log("Đang tổng hợp báo cáo từ các chi nhánh...");
        // Tạo mảng Promise từ CHI_NHANH, gọi cùng lúc
        const ketQua = await Promise.allSettled(
            CHI_NHANH.map(cn => taiDoanhThuChiNhanh(cn.ten, cn.doanhThu, cn.thoiGian, cn.thanhCong))
        );
        // `filter` tách chi nhánh thành công / thất bại
        const thanhCong = ketQua.filter(kq => kq.status === "fulfilled");
        const thatBai = ketQua.filter(kq => kq.status === "rejected");
        // `map` lấy dữ liệu doanh thu (`value`) và lý do lỗi (`reason`).
        const danhSachDoanhThu = thanhCong.map(kq => kq.value);
        const danhSachLoi = thatBai.map(kq => kq.reason);
        // In lỗi
        for (const loi of danhSachLoi) {
            console.log(`  [LỖI] ${loi}`);
        }

        // Dùng vòng lặp `for...of` để tính tổng doanh thu và tìm chi nhánh dẫn đầu.
        let tongDoanhThu = 0;
        let chiNhanhDanDau = null;

        for (const cn of danhSachDoanhThu) {
            tongDoanhThu += cn.doanhThu;
            if (chiNhanhDanDau === null || cn.doanhThu > chiNhanhDanDau.doanhThu) {
                chiNhanhDanDau = cn;
            }
            console.log(`  ${cn.chiNhanh}: ${cn.doanhThu.toLocaleString('vi-VN')}đ - ${xepLoai(cn.doanhThu)}`);
        }

        console.log(`Tổng doanh thu: ${tongDoanhThu.toLocaleString('vi-VN')}đ`);
        console.log(`Chi nhánh dẫn đầu: ${chiNhanhDanDau.chiNhanh} (${chiNhanhDanDau.doanhThu.toLocaleString('vi-VN')}đ)`);

        // Xử lý chuỗi: dùng `map` + `join(", ")` để dựng một dòng "Xếp loại" tổng hợp.
        const xepLoaiTongHop = danhSachDoanhThu
            .map(cn => `${cn.chiNhanh} (${xepLoai(cn.doanhThu)})`)
            .join(", ");
        console.log(`Xếp loại: ${xepLoaiTongHop}`);

        // Rẽ nhánh `if/else`: đánh giá tổng thể theo tỉ lệ thành công.
        const tiLeThanhCong = thanhCong.length / ketQua.length;
        console.log(`${thanhCong.length}/${ketQua.length} chi nhánh thành công (${thatBai.length} gặp sự cố).`);

        if (tiLeThanhCong === 1) {
            console.log("Tất cả chi nhánh kết nối thành công");
        } else if (tiLeThanhCong >= 0.5) {
            console.log("Một số chi nhánh gặp sự cố");
        } else {
            console.log("Hệ thống gặp sự cố nghiêm trọng");
        }
    } catch (loi) {
        console.log("Lỗi:", loi);
    } finally {
        console.log("Hoàn tất tổng hợp báo cáo.");
    }
}

tongHopBaoCao();
