const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // express는 default로 body 태그 접근을 허용하지 않기 때문에 설정을 해야 함
app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // app.get app.post app.delete. app.put이 있음. 파라미터로 ,req,res,next가 있지만 대부분 req,res만 사용
  // console.log("here");
  // res.send("Hi"); // send는 테스트용으로 쓰지만 단순해서 잘 쓰지 않음
  // res.status(500).json({ message: "Error" }); // status:상태코드 전송, json : json 데이터 전송
  //res.json({message:"Error"}) 처럼 해도 됨
  // res.download("server.js"); // 파일 다운로드
  res.render("index", { text: "World" }); //랜더링 할 파일, 다음은 index용 파라미터
  //을 하면 view 엔진이 없어서 에러가 발생
});

const userRouter = require("./routes/users"); // user 라우터 가져오기

app.use("/users", userRouter); // 라우터 경로 ,사용할 라우터 지정

app.listen(3001);
