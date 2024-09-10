// express 모듈 셋팅
const express = require('express');
const router = express.Router();

router.use(express.json());

let db = new Map();
var id = 1;

// 로그인
router.post('/login', function (req, res) {
  console.log(req.body); // userId, pwd

  // userId가 디비에 저장된 회원인지 확인하셔야
  const { userId, password } = req.body;
  var loginUser = {};
  db.forEach(function (user, id) {
    if (user.userId === userId) {
      loginUser = user;
    }
  });

  // userId 값을 못 찾았으면
  if (isExist(loginUser)) {
    // pwd도 맞는지 비교
    if (loginUser.password === password) {
      res.status(200).json({
        message: `${loginUser.name}님 로그인 되었습니다.`,
      });
    } else {
      res.status(400).json({
        message: '비밀번호가 틀렸습니다.',
      });
    }
  } else {
    res.status(404).json({
      message: '회원 정보가 없습니다.',
    });
  }
});

function isExist(obj) {
  if (Object.keys(obj).length === 0) {
    return true;
  } else {
    return false;
  }
}

// 회원가입
router.post('/join', function (req, res) {
  console.log(req.body);

  if (req.body == {}) {
    res.status(400).json({
      message: `입력 값을 다시 확인해주세요`,
    });
  } else {
    const { userId } = req.body;
    db.set(userId, req.body);
    res.status(201).json({
      message: `${db.get(userId).name}님 환영합니다.`,
    });
  }
});
router
  .route('/users')
  .get(function (req, res) {
    let { userId } = req.body;

    const user = db.get(userId);
    if (user) {
      res.status(200).json({
        userId: user.userId,
        name: user.name,
      });
    } else {
      res.status(404).json({
        message: '회원 정보가 없습니다.',
      });
    }
  })
  .delete(function (req, res) {
    let { userId } = req.body;

    const user = db.get(userId);
    if (user) {
      db.delete(id);
      res.status(200).json({
        message: `${user.name}님 다음에 또 뵙겠습니다.`,
      });
    } else {
      res.status(404).json({
        message: '회원 정보가 없습니다.',
      });
    }
  });

module.exports = router;
