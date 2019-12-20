const express = require('express');
const router = express.Router();

const csv = require('csvtojson');
const json2csv = require('json2csv');
const fs = require('fs');
const stringify = require('csv-stringify');

//member 경로 저장
const memberFilePath = __dirname + '/../../public/csv/member.csv'

//랜덤 알고리즘
const shuffle = (arr) => {
    let delta;
    for (let i = arr.length; i; i -= 1) {
        delta = Math.floor(Math.random() * i);
        [arr[delta], arr[i-1]] = [arr[i-1], arr[delta]];
    }
    return arr;
}

router.get('/', async (req, res) => {
    try {
        const member =  await csv().fromFile(memberFilePath);

        if (!member) {
            //에러 출력 코드
            console.log(`member scv file is empty`);
            res.send(`member scv file is empty`);
        } else {
            //조 리스트 arr에 저장
            let arr = member.map(n => n.groupIdx);
            //조 섞기
            arr = shuffle(arr);

            //섞인 조 입력
            for (let i in member) {
                member[i].groupIdx = arr[i];
            }  
            
            try {
                const resultCsv = json2csv.parse(member);
                //csv로 변환
                stringify(member, {header: true, columns: ['name','groupIdx']}, (err, output) => {
                    if (err) throw err;
                    else {
                        //섞인 조 저장
                        fs.writeFile(memberFilePath, output, (err) => {
                            if (err) throw err;
                        });
                    }
                })   
            } catch {
                console.log(`fs.writeFile err : ${err}`);
                res.send(`fs.writeFile err : ${err}`);
            }
            //전체 출력
            res.send(member);
        }
    } catch {
        console.log(`err with csv : ${err}`);
        res.send(`err with csv : ${err}`);      
    }
});

module.exports = router;