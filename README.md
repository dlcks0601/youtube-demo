> 회원 API 설계

1. 로그인 : POST/login

- req : body (id,pwd)
- res : '${name}님 환영합니다'

2. 회원가입 : POST/join

- req : body (id,pwd)
- res : '${name}님 환영합니다'

1. 로그인 : GET/user/:id

- req : URL (id)
- res : id, name

1. 회원 개별 "탈퇴" : DELETE/user/:id

- req : URL (id)
- res : '${name}님 다음에 또 뵙겠습니다'
