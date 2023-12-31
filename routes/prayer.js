/*
  Filename: prayer.js
  Author: Timothy Damir Kovacic
 */
const express = require('express');
const router = express.Router();
const utility = require('../util');
router.get('/', function(req, res, next) {
  res.render('viewPrayer', { title: 'View Prayer Requests' });
  return;
});
router.get('/create', function(req, res, next) {
  res.render('createPrayer', { title: 'Create Prayer Requests' });
  return;
});
router.get('/requests', function(req, res, next) {
  utility.getAllPrayerRequests().then((resultSet) => {
    let prayerRequests = '{"data":[';
    if(null != resultSet && resultSet.length > 0) {
      resultSet.forEach((result) => {
        const resultData = '["' + result.request_created_dt + '","' + result.request_category + '","' + result.request_details + '","' + result.request_status + '"],';
        prayerRequests += resultData;
      });
      prayerRequests = prayerRequests.slice(0, prayerRequests.length - 1);
    }
    prayerRequests += ']}';
    res.setHeader('Content-Type', 'application/json');
    res.send(prayerRequests).end();
    return;
  });
});
router.post('/submit', function(req, res, next) {
  utility.createPrayerRequest(req.body.category, req.body.prayerRequest).then((result) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(result).end();
    return;
  });
});
module.exports = router;
