const express = require('express');
const csv = require('csvtojson');
const router = express.Router();

const memberFilePath = __dirname + '/../../public/csv/member.csv'
const groupFilePath = __dirname + '/../../public/csv/group.csv'

router.get('/:groupIdx', async (req, res) => {
    try {
        const member = await csv().fromFile(memberFilePath);
        const group = await csv().fromFile(groupFilePath);

        if (!member || !group) console.log(`file read err : ${err}`);   // debug     

        //파라미터로 들어오는 값 저장
        IDX = req.params.groupIdx;
        //idx에 해당하는 이름 저장
        let groupNum = group[String(Number(IDX - 1))].name;
        //idx와 같은 명단을 filter하고 name을 map으로 저장
        let people = member.filter(it => it.groupIdx === IDX).map(it => it.name);
        //조와 조원 리스트 출력
        res.send(`${groupNum} : ${people}`);
    } catch (err) {
        console.log(`err with csv : ${err}`);
    }
});

router.get('/', async (req, res) => {
    try {
    //비동기로 member리스트를 json형식으로 초기화
     const member = await csv().fromFile(memberFilePath);
        //error처리코드
        if (!member)
            console.log(`file read err : ${err}`);
        else
            //member 출력
            res.send(member);

    } catch (err) {
        console.log(`file read err : ${err}`);
    }
});

module.exports = router;