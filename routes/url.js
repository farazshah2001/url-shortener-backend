var express = require('express');
var router = express.Router();

const URL = require("../models/Url")

router.get('/', function(req, res, next) {
  URL.find()
  .then(gets=>res.json(gets))
  .catch(err => res.status(400).json('Erros : ' + err));
});
router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    URL.find({_id:id})
      .then(gets=>res.json(gets))
      .catch(err => res.status(400).json('Erros : ' + err));
});
router.post('/check',function(){
  const url = req.body.url;
  URL.find({url:url})
  .then(gets=>res.json(gets))
  .catch(err => res.status(400).json('Erros : ' + err));
  URL.find({slug:url})
  .then(gets=>res.json(gets))
  .catch(err => res.status(400).json('Erros : ' + err));

})


router.delete('/:id/delete',function(req,res,next){
  const id = req.params.id;
  URL.findByIdAndDelete(id)
    .then(()=>res.send({"message":"URL deleted"}))
    .catch(err => res.status(400).json('Erros : ' + err))
});

module.exports = router;
