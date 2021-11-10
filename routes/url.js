var express = require('express');
var router = express.Router();
var randomstring = require("randomstring");
const {URL} = require("../models/Url")

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
router.post('/check',async function(req,res,next){
  const url = req.body.url;
  
  if(!url){
    res.send({message:"invalid url"})
  }else{
    const urlobject= await URL.find({url:url});

    if(urlobject[0]){
      res.send({slug:urlobject[0].slug});
    }else{
      const slugobject = await URL.find({slug:url});
      if(slugobject[0]){
        res.send({url:slugobject[0].url})
      }else{
        const newurl = new URL({url,slug:randomstring.generate(10)});
        newurl.save();
        res.send({slug:newurl.slug});
      }
    }
  }
  
  
  
})


router.delete('/:id/delete',function(req,res,next){
  const id = req.params.id;
  URL.findByIdAndDelete(id)
    .then(()=>res.send({"message":"URL deleted"}))
    .catch(err => res.status(400).json('Erros : ' + err))
});

module.exports = router;
