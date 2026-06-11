let myString: string;
myString = "dev";
myString = "prod";

//kiểu literal type (khắt khe)
let myEnv: "dev";
myEnv = "dev";

//redd, yelow, thay vi cho phep string()-> co the go nham
//thi ta dinh nghi chi chap nhan 3 chu cu the nay thoi
type TrafficLight = "red" | "yellow" | "green";

function checkLight(color: TrafficLight) {
  if (color === "red") {
    console.log("dung lai");
  }
}

checkLight('')
