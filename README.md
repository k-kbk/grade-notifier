# MJU grade-notifier
5분 마다 작업 실행

## 환경 설정 및 실행

1. 패키지 설치  
``npm install``

3. .env 생성  
``touch .env``

4. 환경변수 추가  
``echo "USER_ID=학번" >> .env``  
``echo "USER_PW=비밀번호" >> .env``  
``echo "PORT=포트" >> .env``  
``echo "NAVER_MAIL=발신용_네이버_이메일" >> .env``  
``echo "NAVER_PW=발신용_네이버_비밀번호" >> .env``  
``echo "TO_EMAIL=수신용_이메일" >> .env``

5. 실행  
``npm start``
