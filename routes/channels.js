// express 모듈 셋팅
const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const { body, param, validationResult } = require('express-validator');

router.use(express.json());

const validate = (req, res, next) => {
    const err = validationResult(req);

    // 밥 안드셨나요? 아니요 => 이중 부정 = 긍정
    // 밥 드셨나요? 네 => 긍정

    if (err.isEmpty()) {
        return next();
    } else {
        return res.status(400).json(err.array());
    }
};

router
    .route('/')
    .get(
        [
            body('userId').notEmpty().isInt().withMessage('숫자 입력 필요'),
            validate,
        ],
        (req, res) => {
            var { userId } = req.body;

            let sql = `SELECT * FROM channels Where user_id = ?`;

            conn.query(sql, userId, function (err, results) {
                if (err) {
                    console.log(err);
                    return res.status(400).end();
                }
                if (results.length) res.status(200).json(results);
                else notFoundChannel(res);
            });
        }
    )
    .post(
        [
            body('userId').notEmpty().isInt().withMessage('숫자 입력 필요'),
            body('name').notEmpty().isString().withMessage('문자 입력 필요'),
            validate,
        ],
        (req, res) => {
            const err = validationResult(req);

            const { name, userId } = req.body;

            let sql = `INSERT INTO channels (name, user_id) VALUES (?,?)`;
            let values = [name, userId];
            conn.query(sql, values, function (err, results) {
                if (err) {
                    console.log(err);
                    return res.status(400).end();
                }
                res.status(201).json(results);
            });
        }
    ); // 채널 개별 생성 = db에 저장

router
    .route('/:id')
    .get(
        [param('id').notEmpty().withMessage('채널id 필요'), validate],
        (req, res) => {
            const err = validationResult(req);

            if (!err.isEmpty()) {
                return res.status(400).json(err.array());
            }

            let { id } = req.params;
            id = parseInt(id);

            let sql = `SELECT * FROM channels Where id = ?`;
            conn.query(sql, id, function (err, results) {
                if (err) {
                    console.log(err);
                    return res.status(400).end();
                }

                if (results.length) {
                    res.status(200).json(results);
                } else {
                    notFoundChannel(res);
                }
            });
        }
    )
    .put(
        [
            param('id').notEmpty().withMessage('채널id 필요'),
            body('name').notEmpty().isString().withMessage('채널명 오류'),
            validate,
        ],
        (req, res) => {
            let { id } = req.params;
            id = parseInt(id);
            let { name } = req.body;

            let sql = `UPDATE channels SET name=? WHERE id = ?`;
            let values = [name, id];
            conn.query(sql, values, function (err, results) {
                if (err) {
                    console.log(err);
                    return res.status(400).end();
                }
                if (results.affectedRows == 0) {
                    return res.status(400).end();
                } else {
                    res.status(200).json(results);
                }
            });

            var channel = db.get(id);
            var oldTitle = channel.channelTitle;
            if (channel) {
                var newTitle = req.body.channelTitle;

                channel.channelTitle = newTitle;
                db.set(id, channel);
                res.json({
                    message: `채널명이 정상적으로 수정되었습니다. 기존 ${oldTitle} -> 수정 ${newTitle}`,
                });
            } else {
                notFoundChannel();
            }
        }
    ) // 채널 개별 수정
    .delete(
        [param('id').notEmpty().withMessage('채널id 필요'), validate],
        (req, res) => {
            const err = validationResult(req);

            if (!err.isEmpty()) {
                return res.status(400).json(err.array());
            }

            let { id } = req.params;
            id = parseInt(id);

            let sql = `DELETE FROM channels WHERE id =?`;

            conn.query(sql, id, function (err, results) {
                if (err) {
                    console.log(err);
                    return res.status(400).end();
                }

                if (results.affectedRows == 0) {
                    return res.status(400).end();
                } else {
                    res.status(200).json(results);
                }
            });
        }
    ); // 채널 개별 삭제

module.exports = router;
