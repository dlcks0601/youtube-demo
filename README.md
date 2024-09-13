### 회원 API 설계

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

### 빈 객체 확인하는 방법 3가지

{}

1. 객체.keys()
2. for in
3. lodash : isEmpty

### 채널 API 설계 (Create)

#### 채널

- 채널 생성
- 채널 수정
- 채널 삭제

1. 채널 "생성" : POST /channel

- req : body (channelTitle, userId) cf. userId는 body x header 숨겨서 ... token
- res20 : '${channelTitle}님 채널을 응원합니다.' 👉 다른 페이지 띄워주고 싶어 .. ex. 채널 관리자 페이지

2. 채널 개별 "수정" : PUT /channel/:id

- req : URL(id), body (channelTitle)
- res 200 : '채널명이 성공적으로 수정되었습니다. 기존 : ${} -> 수정: ${}'

3. 채널 개별 "삭제" : DELETE /channel/:id

- req : URL (id)
- res200 : '삭제 되었습니다' 👉 메인 페이지

4. 채널 전체 "조회" : GET /channels

- req : body(userId)
- res200 : 채널 전체 데이터 list, json array

5. 채널 개별 "조회" : GET /channels/:id

- req : URL (id)
- res200 : 채널 개별 데이터

### ERD 고려

#### 회원

| user_id | password | name    |
| ------- | -------- | ------- |
| testId1 | 1234     | tester1 |
| testId2 | 5678     | tester2 |
|         |          |         |

#### 채널

| id  | channel_title | user_id | sub_num | video_num |
| --- | ------------- | ------- | ------- | --------- |
| 1   | 달려라송아    | testId1 |         |           |
| 2   | 뛰어라송아    | testId1 |         |           |
| 3   | 걸어라        | testId2 |         |           |
|     |               |         |         |           |
|     |               |         |         |           |

### db-demo

mysql2 first query 수정

> timezone 설정

```
timezone: 'Asia/Seoul',
```

```
dateStrings: true,,
```
