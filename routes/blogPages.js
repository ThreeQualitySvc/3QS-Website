const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Post = require('../models/post.js');
const path = require("path");

const format = s => s.toLowerCase()
    .split(/\s|%20/)
    .filter(Boolean)
    .join('-');

router.get('/blog/:topic', async(req,res)=>{
    const itemsPerPage = 5;
    const totalCount = await Post.countDocuments();
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const currentPage = req.query.page || 1;
    const skipItems = (currentPage - 1) * itemsPerPage;

    switch(req.params.topic){
        case 'Project-Management':
            try{
                let big5 = await Post.find().sort({day: 1}).limit(5)
                let gov = await Post.find({tags: {$in: "Governance"}})
                let training = await Post.find({tags: {$in: "Training"}})
                let datasci = await Post.find({tags: {$in: "Data Science"}})
                let bcom = await Post.find({tags: {$in: "Business & Finance"}})
                let proj = await Post.find({tags: {$in: "Project Management"}}).skip(skipItems).limit(itemsPerPage).exec()
                let cyberSec = await Post.find({tags: {$in: "Cyber Security"}})
                return res.render('website/blogTypes/proj', {
                    topics:proj, currentPage:currentPage, totalPages:totalPages,
                    big5:big5, gov:gov.length, training:training.length, datasci:datasci.length,
                    bcom:bcom.length, proj:proj.length, cyberSec:cyberSec.length
                })
            } catch(err){
                console.log(err)
            }
            break;
        case 'Governance':
            try{
                let big5 = await Post.find().sort({day: 1}).limit(5)
                let gov = await Post.find({tags: {$in: "Governance"}}).skip(skipItems).limit(itemsPerPage).exec()
                let training = await Post.find({tags: {$in: "Training"}})
                let datasci = await Post.find({tags: {$in: "Data Science"}})
                let bcom = await Post.find({tags: {$in: "Business & Finance"}})
                let proj = await Post.find({tags: {$in: "Project Management"}})
                let cyberSec = await Post.find({tags: {$in: "Cyber Security"}})
                return res.render('website/blogTypes/gov', {
                    topics:gov, currentPage:currentPage, totalPages:totalPages,
                    big5:big5, gov:gov.length, training:training.length, datasci:datasci.length,
                    bcom:bcom.length, proj:proj.length, cyberSec:cyberSec.length
                })
            } catch(err){
                console.log(err)
            }
            break;
        case 'Training':
            try{
                let big5 = await Post.find().sort({day: 1}).limit(5)
                let gov = await Post.find({tags: {$in: "Governance"}})
                let training = await Post.find({tags: {$in: "Training"}}).skip(skipItems).limit(itemsPerPage).exec()
                let datasci = await Post.find({tags: {$in: "Data Science"}})
                let bcom = await Post.find({tags: {$in: "Business & Finance"}})
                let proj = await Post.find({tags: {$in: "Project Management"}})
                let cyberSec = await Post.find({tags: {$in: "Cyber Security"}})
                return res.render('website/blogTypes/gov', {
                    topics:training, currentPage:currentPage, totalPages:totalPages,
                    big5:big5, gov:gov.length, training:training.length, datasci:datasci.length,
                    bcom:bcom.length, proj:proj.length, cyberSec:cyberSec.length
                })
            } catch(err){
                console.log(err)
            }
            break;
        case 'Data-Science':
            try{
                let big5 = await Post.find().sort({day: 1}).limit(5)
                let gov = await Post.find({tags: {$in: "Governance"}})
                let training = await Post.find({tags: {$in: "Training"}})
                let datasci = await Post.find({tags: {$in: "Data Science"}}).skip(skipItems).limit(itemsPerPage).exec()
                let bcom = await Post.find({tags: {$in: "Business & Finance"}})
                let proj = await Post.find({tags: {$in: "Project Management"}})
                let cyberSec = await Post.find({tags: {$in: "Cyber Security"}})
                return res.render('website/blogTypes/gov', {
                    topics:datasci, currentPage:currentPage, totalPages:totalPages,
                    big5:big5, gov:gov.length, training:training.length, datasci:datasci.length,
                    bcom:bcom.length, proj:proj.length, cyberSec:cyberSec.length
                })
            } catch(err){
                console.log(err)
            }
            break;
        case 'Business-&-Finance':
            try{
                let big5 = await Post.find().sort({day: 1}).limit(5)
                let gov = await Post.find({tags: {$in: "Governance"}})
                let training = await Post.find({tags: {$in: "Training"}})
                let datasci = await Post.find({tags: {$in: "Data Science"}})
                let bcom = await Post.find({tags: {$in: "Business & Finance"}}).skip(skipItems).limit(itemsPerPage).exec()
                let proj = await Post.find({tags: {$in: "Project Management"}})
                let cyberSec = await Post.find({tags: {$in: "Cyber Security"}})
                return res.render('website/blogTypes/gov', {
                    topics:bcom, currentPage:currentPage, totalPages:totalPages,
                    big5:big5, gov:gov.length, training:training.length, datasci:datasci.length,
                    bcom:bcom.length, proj:proj.length, cyberSec:cyberSec.length
                })
            } catch(err){
                console.log(err)
            }
            break;
        case 'Cyber-Security':
            try{
                let big5 = await Post.find().sort({day: 1}).limit(5)
                let gov = await Post.find({tags: {$in: "Governance"}})
                let training = await Post.find({tags: {$in: "Training"}})
                let datasci = await Post.find({tags: {$in: "Data Science"}})
                let bcom = await Post.find({tags: {$in: "Business & Finance"}})
                let proj = await Post.find({tags: {$in: "Project Management"}})
                let cyberSec = await Post.find({tags: {$in: "Cyber Security"}}).skip(skipItems).limit(itemsPerPage).exec()
                return res.render('website/blogTypes/gov', {
                    topics:cyberSec, currentPage:currentPage, totalPages:totalPages,
                    big5:big5, gov:gov.length, training:training.length, datasci:datasci.length,
                    bcom:bcom.length, proj:proj.length, cyberSec:cyberSec.length
                })
            } catch(err){
                console.log(err)
            }
            break;
        case 'search':
            let big5 = await Post.find().sort({day: 1}).limit(5)
            let gov = await Post.find({tags: {$in: "Governance"}})
            let training = await Post.find({tags: {$in: "Training"}})
            let datasci = await Post.find({tags: {$in: "Data Science"}})
            let bcom = await Post.find({tags: {$in: "Business & Finance"}})
            let proj = await Post.find({tags: {$in: "Project Management"}})
            let cyberSec = await Post.find({tags: {$in: "Cyber Security"}})
            let results = await Post.find({title: {$regex: new RegExp(req.query.search), $options: 'mixs'}}).skip(skipItems).limit(itemsPerPage).exec()
            return res.render('website/blogTypes/results', {
                topics:results,currentPage:currentPage, totalPages:totalPages, query: req.query.search,
                big5:big5, gov:gov.length, training:training.length, datasci:datasci.length,
                bcom:bcom.length, proj:proj.length, cyberSec:cyberSec.length,
            })
    }
})

router.get('/blog-single/:route', async(req,res)=>{
    try{
        let postItem = await Post.findOne({title: format(req.params.route)})
        if(postItem){
            let big5 = await Post.find().sort({_id: -1}).limit(5)
            let gov = await Post.find({tags: {$in: "Governance"}})
            let training = await Post.find({tags: {$in: "Training"}})
            let datasci = await Post.find({tags: {$in: "Data Science"}})
            let bcom = await Post.find({tags: {$in: "Business & Finance"}})
            let proj = await Post.find({tags: {$in: "Project Management"}})
            let cyberSec = await Post.find({tags: {$in: "Cyber Security"}})
            return res.render('website/blog-single', {
                postItem:postItem,
                big5:big5, gov:gov.length, training:training.length, datasci:datasci.length,
                bcom:bcom.length, proj:proj.length, cyberSec:cyberSec.length
            })
                //console.log(format(postItem.title))
        }
    } catch(err){
        console.log(err)
    }
})

module.exports = router;;