const express = require('express');
const router = express.Router();
const chalk = require('chalk')
const pt = require('periodic-table');

const allElements = pt.all()

const Alloy = require('../models/Alloy.model')

router.post('/alloy/new', (req, res, next) => {
  const {alloyName, components} = req.body
  const alloy = {alloyName: '', mixture: []}
  if (alloyName && components){
    alloy.alloyName = alloyName
    if (components instanceof Array){
      components.forEach(component => {
        if (component){
          let comp
          if (component.length > 2){
            comp = allElements.filter((elem, index) => {
              return (elem.name === component)
            })
          } else {
            comp = allElements.filter((elem, index) => {
              return (elem.symbol === component)
            })
          }
          alloy.mixture.push(component)
        }
      })
    }
    if (alloy.mixture.length > 0){
      Alloy.create(alloy)
      .then((result) => {
        res.redirect('/admin-page')
      })
      .catch((err) => {
        console.log(err)
      })
    } else {res.redirect('/admin-page')}
  } else {res.redirect('/admin-page')}
})

router.post('/alloy/edit/:_id', (req, res, next) => {
  console.log(req.params._id)
  console.log(req.body)
  const {alloyName, components} = req.body
  console.log(alloyName, components)
  const alloy = {alloyName: '', mixture: []}
  console.log(chalk.red.inverse('adf'))
  if (alloyName && components){
    alloy.alloyName = alloyName
    if (components instanceof Array){
      components.forEach(component => {
        if (component){
          let comp
          if (component.length > 2){
            comp = allElements.filter((elem, index) => {
              return (elem.name === component)
            })
          } else {
            comp = allElements.filter((elem, index) => {
              return (elem.symbol === component)
            })
          }
          alloy.mixture.push(component)
        } else {next()}
      })
    }
    if (alloy.mixture.length > 0){
      Alloy.findByIdAndUpdate(req.params._id, alloy)
      .then((result) => {
        res.redirect('/admin-page')
      })
      .catch((err) => {
        console.log(err)
      })
    } else {res.redirect('/admin-page')}
  } else {res.redirect('/admin-page')}
})

router.post('/alloy/delete/:_id', (req, res) => {
  Alloy.findByIdAndDelete(req.params._id)
  .then((result) => {
    res.redirect('/admin-page')
  })
  .catch((err) => {
    console.log(err)
  })
})

module.exports = router;
