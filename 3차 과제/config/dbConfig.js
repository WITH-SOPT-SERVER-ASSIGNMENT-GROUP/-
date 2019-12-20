/* 
config 파일은 git Repository에 올라가면 안되는 파일입니다.
아래 내용을 추가한 이후에는 꼭 git ignore파일에서 config 폴더를 추가해주세요.
또한 .gitignore파일을 수정하고 다른 커밋보다 먼저 커밋해주셔야 합니다!
그래야 ignore가 적용됩니다.
이를 적용 안하면 비밀번호와 RDS주소가 공개되며 이는 과금으로 이어지게 됩니다.
*/
const mysql = require('promise-mysql')

const dbConfig = {
    host: 'rds 엔드포인트 주소',
    port: 3306,
    user: 'admin',
    password: '비밀번호',
    database: 'db이름',
    dateStrings: 'date',
}

module.exports = mysql.createPool(dbConfig)