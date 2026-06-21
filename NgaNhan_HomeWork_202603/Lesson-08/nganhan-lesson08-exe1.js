function chuanHoaTen(ten) {
    let tenDaChuanHoa;
    tenDaChuanHoa = ten
        .trim()
        .split(' ')
        .filter(tu => tu !== '')
        .map(tu => tu.charAt(0).toUpperCase() + tu.slice(1).toLowerCase())
        .join(' ');

    return tenDaChuanHoa;
}
function phanTichDon(dong) {
    // Tách tại " x" cuối cùng: "  áo thun x2 " -> ["  áo thun ", "2 "]
    const viTriX = dong.trim().lastIndexOf(' x');
    const tenGoc = dong.trim().slice(0, viTriX);
    const soLuong = Number(dong.trim().slice(viTriX + 2).trim());

    return { ten: chuanHoaTen(tenGoc), soLuong };
}

async function tinhTienGioHang(donHang) {
    try {
        console.log("Bắt đầu tính tiền giỏ hàng...");
        // B1: Phân tích chuỗi:`map` mảng chuỗi đầu vào qua `phanTichDon`.
        console.log(`Phân tích ${donHang.length} dòng đơn hàng...`);

        const danhSachDon = donHang.map(dong => phanTichDon(dong));
        //B2: Song song: lấy thông tin tất cả sản phẩm cùng lúc bằng`Promise.all`.
        // Một sản phẩm không tồn tại → toàn bộ dừng, nhảy vào`catch`.
        console.log(`Tải thông tin ${danhSachDon.length} sản phẩm...`);
        const danhSachThongTin = await Promise.all(
            danhSachDon.map(don => layThongTinSanPham(don.ten))
        );
        //B3: Xử lý mảng: `map` ghép số lượng + tính`thanhTien`; 
        // `filter` lọc sản phẩm còn đủ hàng(`tonKho >= soLuong`); 
        // dùng vòng lặp `for...of` cộng dồn để tính tạm tính.
        const danhSachSanPham = danhSachThongTin.map((tt, index) => {
            const soLuong = danhSachDon[index].soLuong;
            return {
                ten: tt.ten,
                gia: tt.gia,
                tonKho: tt.tonKho,
                soLuong: soLuong,
                thanhTien: tt.gia * soLuong,
            };
        });
       
        const duHang = danhSachSanPham.filter(sp => {
            if (sp.tonKho >= sp.soLuong) {
                return true;
            } else {
                console.log(`  Bỏ "${sp.ten}" - chỉ còn ${sp.tonKho}, cần ${sp.soLuong}`);
                return false;
            }
        });
        let tamTinh = 0;
        for (const sp of duHang) {
            console.log(`  ${sp.ten} x${sp.soLuong} = ${sp.thanhTien.toLocaleString('vi-VN')}đ`);
            tamTinh += sp.thanhTien;
        }
        console.log(`Tạm tính: ${tamTinh.toLocaleString('vi-VN')}đ`);
        //B4: Rẽ nhánh `if/else` nhiều cấp:** tính ưu đãi theo tạm tính:
        //`>= 1.000.000đ` → giảm 15 %
        //`>= 500.000đ` → giảm 10 %
        //`>= 200.000đ` → giảm 5 %
        //- còn lại → không giảm
        let phanTramGiam = 0;
        let moTaUuDai = "";

        if (tamTinh >= 1000000) {
            phanTramGiam = 15;
            moTaUuDai = "giảm 15% (đơn từ 1.000.000đ)";
        } else if (tamTinh >= 500000) {
            phanTramGiam = 10;
            moTaUuDai = "giảm 10% (đơn từ 500.000đ)";
        } else if (tamTinh >= 200000) {
            phanTramGiam = 5;
            moTaUuDai = "giảm 5% (đơn từ 200.000đ)";
        } else {
            phanTramGiam = 0;
            moTaUuDai = "không giảm";
        }
        const soTienGiam = tamTinh * phanTramGiam / 100;
        console.log(`Ưu đãi: ${moTaUuDai} -${soTienGiam.toLocaleString('vi-VN')}đ`);
        console.log(`Thành tiền: ${(tamTinh - soTienGiam).toLocaleString('vi-VN')}đ`);

    } catch (loi) {
        console.log("Lỗi:", loi);
    } finally {
        console.log("Kết thúc tính tiền.");
    }
}

function layThongTinSanPham(ten) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const tt = KHO_HANG[ten];
      if (!tt) {
        reject(`Sản phẩm "${ten}" không tồn tại trong hệ thống!`);
      } else {
        resolve({ ten, ...tt });
      }
    }, 800);
  });
}

// ----- KHO HÀNG: nguồn dữ liệu "API" sẽ tra cứu -----
const KHO_HANG = {
  "Áo Thun": { gia: 150000, tonKho: 10 },
  "Quần Jean": { gia: 350000, tonKho: 5 },
  "Giày Sneaker": { gia: 800000, tonKho: 3 },
  "Mũ": { gia: 90000, tonKho: 0 },
};

// ----- ĐƠN HÀNG khách nhập dạng CHUỖI: "tên sản phẩm xSỐLƯỢNG" -----
// Lưu ý: chữ hoa/thường lộn xộn và có khoảng trắng thừa -> phải xử lý chuỗi.
const donHang1 = ["  áo thun x2 ", "Quần Jean x1", "MŨ x1"]; // hợp lệ, "Mũ" hết hàng
const donHang2 = ["Áo thun x1", "Điện thoại x1"]; // có sản phẩm không tồn tại

tinhTienGioHang(donHang1);
//console.log("==================")
//tinhTienGioHang(donHang2);