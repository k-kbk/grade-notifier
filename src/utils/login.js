export default async function login(page) {
  const LOGIN_PAGE =
    'https://sso1.mju.ac.kr/login.do?redirect_uri=https://myiweb.mju.ac.kr/index_Myiweb.jsp';
  const USER_ID = process.env.USER_ID;
  const USER_PW = process.env.USER_PW;

  await page.goto(LOGIN_PAGE);
  await page.waitForSelector('#id');
  await page.evaluate(
    (id, pw) => {
      document.querySelector('#id').value = id;
      document.querySelector('#passwrd').value = pw;
    },
    USER_ID,
    USER_PW
  );
  await page.click('#loginButton');
}
