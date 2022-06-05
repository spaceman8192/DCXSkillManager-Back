const express = require("express");
const router = express.Router();
const mysql = require("mysql");
require("dotenv").config();
const DB_PW = process.env.DB_PW;

const conn = mysql.createConnection({
  host: "localhost",
  user: "by524",
  password: DB_PW,
  database: "skilldb",
});

conn.connect(function (err) {
  if (err) throw err;
  console.log("Connected!!");
});

//router는 순서대로 읽음
router.use(logger);
router.get("/", (req, res) => {
  console.log(req.query.name);
  res.send("User List");
});

router.get("/query", (req, res) => {
  console.log("MySQL connect");
  const sql = "select * from ttable";
  conn.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
  // res.json("User List");
});

router.get("/new", (req, res) => {
  console.log("helllooo");
  res.render("users/new");
});

// 사용자를 생성하고 싶다면
router.post("/", (req, res) => {
  const isValid = true;
  if (isValid) {
    users.push({ firsName: req.body.firsName });
    res.redirect(`/users/${users.length - 1}`);
  } else {
    console.log("Error");
    res.render("users/new", { firstName: req.body.firsName });
  }
  console.log(req.body.firstName);
  res.send("hi");
});

// 1. 각자 생성
// 개별사용자에 액세스할 수 있도록 하는 방식
// router.get("/:id", (req, res) => {
//   res.send(`Get User With ID ${req.params.id}`);
// });

// router.put("/:id", (req, res) => {
//   res.send(`Update User With ID ${req.params.id}`);
// });

// router.delete("/:id", (req, res) => {
//   res.send(`Delete User With ID ${req.params.id}`);
// });

// 2. 각자 생성보다 더 쉽게 구현하는 방법
router
  .route("/:id")
  .get((req, res) => {
    console.log(req.user);
    res.send(`Get User With ID ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Update User With ID ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete User With ID ${req.params.id}`);
  });

const users = [{ name: "Kyle" }, { name: "Sally" }];

// 파라미터를 받으면 get,put,route 같은 작업을 하기 전에 실행되는 미들웨어
router.param("id", (req, res, next, id) => {
  console.log(id);
  req.user = users[id];
  next();
});

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

module.exports = router;
