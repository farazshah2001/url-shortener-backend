var express = require('express');
var router = express.Router();
var randomstring = require("randomstring");
const {URL} = require("../models/Url")

router.get('/', function(req, res, next) {/**getting all objects in the urls database */
  URL.find()
  .then(gets=>res.json(gets))
  .catch(err => res.status(400).json('Erros : ' + err));
});
router.get('/redirect',async function(req, res, next) {/**getting all objects in the urls database */
  const slug = req.query.slug;
  const slugobject = await URL.find({slug:slug});
  if(slugobject[0]){
    res.redirect(slugobject.url);
  }
});
router.get('/:id', function(req, res, next) {/** getting an object using id from the urls database */
    const id = req.params.id;
    URL.find({_id:id})
      .then(gets=>res.json(gets))
      .catch(err => res.status(400).json('Erros : ' + err));
});
router.post('/check',async function(req,res,next){/**check route , gets the value from the form input , return the corresponding slug or url */
  const url = req.body.url;
  if(!url){/**cheching for empty url */
    res.send({message:"invalid url"})/**error message sent */
  }else{
    const urlobject= await URL.find({url:url});/**searching an object in the db with the url equal to the one in the request body */

    if(urlobject[0]){
      console.log("sending slug");
      res.send({slug:urlobject[0].slug});/**sending the corresponding slug */
    }else{
      const slugobject = await URL.find({slug:url});/**searching an object in the db with the url equal to the one in the request body */
      if(slugobject[0]){
        console.log("slug");
        res.send({url:slugobject[0].url})/**sending the corresponding url */
      }else{
        console.log("new");
        const newurl = new URL({url,slug:"https://url-slug-node.herokuapp.com/url/redirect?slug="+randomstring.generate(10)});/**if the url or slug  does not exist in the database, an object is generated */
        newurl.save();
        res.send({slug:newurl.slug});/**the created slug is returned  */
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
