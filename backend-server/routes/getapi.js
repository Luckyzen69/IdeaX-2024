const axios = require("axios");
const qs = require("qs");
let data = qs.stringify({});
const express = require("express");
const router = express.Router();


router.get("/getdata/:long/:lat",async  (req,res) => {
 
    const {long,lat}=req.params;
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://soil.narc.gov.np/soil/soildata/?lon=${long}&lat=${lat}`,
        headers: {
          Authorization:
            `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3NTIzMzI3LCJpYXQiOjE3Mjc1MjMwMjcsImp0aSI6IjllODJkM2FmMWQxZTQ4YTRhZDUwZGYxOWY2OTY2MjJhIiwidXNlcl9pZCI6MTQwfQ.uan1YS9lRL7BLcVO8ee3xEHw31vTKmsgY5MVikXRml8`,
        },
        data: data,
      };
    
      const dataaxios = axios
        .request(config).then((response) => {
          return res.json(response.data).catch((error) => {
            return res.json(error);
          });
        })
    
    });
    
    module.exports = router;
    