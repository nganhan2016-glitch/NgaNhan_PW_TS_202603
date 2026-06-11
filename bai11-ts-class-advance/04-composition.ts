//extends - is - a
//DOg is animal - > ke thua dac tinh va hanh vi
class Animal {
  eat() {
    console.log("eating");
  }
}

class Dog extends Animal {}

//has - a co 1 dung nhu nao
class Engine {
  start() {
    console.log("no may");
  }

  stop() {
    console.log("duing may");
  }
}

class Car {
  //car chứa động cơ - > dùng như công cụ bên trong class
  private engine = new Engine();

  drive() {
    this.engine.start();
    console.log("driving");
  }
}
const car = new Car();
car.drive();

//vấn đề 1: Đa kết thừa - Con vừa muốn gióngc ha A, vuiawf muốn giống B
class FlyingAnimal extends Animal {
  fly() {
    console.log("flying");
  }
}
class SwinmmingAnimal extends Animal {
  swimming() {
    console.log("swimming");
  }
}

//Tôi muốn dùng vịt vừa biết bay vừa biết bơi
// class Duck extends FlyingAnimal, S
//Vấn đề 2: Tight coupling - Bị lệ thuộc chặt vào cha < sửa cha , con chết theo

class BaseTest2 {
  setup() {
    console.log("opening browser...");
    //ngay b
    ///team muon thang setup nhan them 1 tham so vi du la env. de setup theo moi truong
    //setup(env:string) -> TAT CA CLASS CON OVERRIDE DEU PHAI SUA THEO ->
  }
}

class LoginTest2 extends BaseTest2 {
  setup() {
    super.setup();
    console.log("abc");
  }
}

//Vấn dề 3: Override lỡ tay, -. cha gẫy
//class cha có 1 method gọi nhiều method con -> class con override 1 mthod nhưng quên gọi super, làm dứgt chuôi logic cua cha 
//ma compile vẫn ok _> 



//Dependency injection
//tiêm phụ thuộc  - thay vì class tự tạo thứ nó cần (dependency), nó nhận từ bên ngoài đưa vào
//3 yếu DI
//Dependency; Thứ class cần đeer hoạt động
//injector: Người/tạo ra dependency để dưau cho class ()
//consumer: class NHận dependency và sử dụng
//Nhược điểm composition
//1 ko test độc lập được. vì loginpage8 tự new dependency bên trong
//2. ko swap đc -muối đổi implementation phải sửa code -> mỗi lần đổi env/ loại navigation -> sửa code
// -> mỗi lần sửa phải test lại toàn bộ
//3. tight coupling - moij su thay doi cua helper lan vao page -> dan toi moi page phai sua theo

//cách nhận chúng ta sẽ thường nhận qua thằng interface (abstraction), ko phải class cụ thể

//Viết lại ví dụ trên  = DI

// B1. Định nghĩa interface - đây là dependency
interface INavigation {
  goTo(path: string): void;
}

interface IScreenshot {
  capture(name: string): void;
}

//B2: implement interface - day la nhung thu se dc inject -> injector

class RealNavigation implements INavigation {
  constructor(private baseUrl: string) {}

  goTo(path: string) {
    console.log(`Dieu huong ${this.baseUrl}${path}`);
  }
}

class RealScreenshot implements IScreenshot {
  capture(name: string) {
    console.log(`Chup man hinh ${name}.png`);
  }
}

//Testing: unittest - mocktesting (FE BE)
//ko cần browser, ko cần DOM, ko cần lệ thuộc
class MockNavigation implements INavigation {
  goTo(path: string): void {
    console.log("mock");
  }
}

//B3: class nhận interface - Đây là consumer
class LoginPage10 {
  //Nhận interface - ko phải class cụ thể
  // LoginPage10 ko biết và ko cần biết nav, src là REAL hay MOCK
  constructor(
    private nav: INavigation,
    private scr: IScreenshot,
  ) {}

  async login(username: string, password: string): Promise<void> {
    this.nav.goTo("/login");
    console.log(`Nhap username: ${username}`);
    console.log(`Nhap password: ${password}`);
    this.scr.capture("after-login");
  }
}


//sử dụng

const realLogin = new LoginPage10(
  new RealNavigation("http/..."),
  new RealScreenshot(),
);

const mockLogin = new LoginPage10(new MockNavigation(), new MockScreenShot());

///Tại sao DI giải quyết cả 3 vấn dề:

// Vấn dề 1: ko test độc lập đc -> inject mock
//Vấn dề 2: ko swap đc ->  

