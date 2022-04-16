const AssistantV1 = require("ibm-watson/assistant/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

var express = require("express");
const { type } = require("express/lib/response");
var router = express.Router();

var arregloGlobal;

var assistant = new AssistantV1({
  version: "2022-03-17",
  authenticator: new IamAuthenticator({
    apikey: "shNi9U2EX8tZ_1Yjc65uBJMKcfpJy7ZwpZ-oPJjvUsEf",
  }),
  serviceUrl: "https://api.us-south.assistant.watson.cloud.ibm.com",
});

/* GET home page. */
//router.get("/", function (req, res, next) {
//  res.render("form", { title: "Express" });
//});

router.get("/", function (req, res, next) {
  //res.send("Esta aqui");
  //res.render("form", { workSpaceID: "Codigo del ws", fecha: "fecha" });
  res.render("form", {});
}); //get form

router.post("/form", function (req, res, next) {
  console.log(req.body);
  //res.render("form", req.body);
  var fecha = req.body.fecha;
  const params = {
    workspaceId: req.body.workSpaceID,
    //req.body.workSpaceID,'7f2b213c-dc87-431d-84a1-9b678d18d610'
    filter: "response_timestamp>=" + fecha,
  };

  console.log(req.body.workSpaceID);

  var resultado;
  var resultado2;

  var displayData = {};
  var variable1;
  var variable2;
  var arrayValue = [];

  assistant.listLogs(params)
    .then((resWa) => {
      resultado = resWa.result.logs;
      resultado2 = resultado.map((result) => result.response.user_id);

      var result = resultado2.filter((item, index) => {
        return resultado2.indexOf(item) === index;
      });
      variable1 = resultado2.length;
      variable2 = result.length;
      console.log(resultado2);
      console.log("////////////////////////////");
      console.log(result);
      console.log(resultado2.length);
      console.log("////////////////////////////");
      console.log(result.length);

      displayData.resultado1 = JSON.stringify(variable1);
      displayData.resultado2 = JSON.stringify(variable2);
      console.log("----corte----");
      console.log(displayData, typeof displayData);
      console.log("------");
      console.log(displayData.resultado1);
      var arrayValue = Object.values(displayData);
      console.log(arrayValue);
      res.render('form',{
      print1:arrayValue[0],
      print2:arrayValue[1]
    });
    })
    .catch((err) => {
      console.log(err);
    });
    console.log(arrayValue);
    
});

module.exports = router;
