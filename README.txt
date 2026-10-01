다낭 가족여행 공동 체크리스트 - Render 배포용

GitHub 저장소 루트에 아래 3개 파일을 올리세요.
- index.html
- server.js
- package.json

Render 설정:
- Web Service / Node
- Build Command: npm install
- Start Command: npm start
- 환경변수 DATABASE_URL: Render Postgres의 Internal Database URL

같은 웹 주소를 열면 모든 기기가 같은 체크 상태를 공유합니다.
2초마다 다른 기기의 변경사항을 확인하고, 체크 즉시 서버 DB에 저장합니다.
