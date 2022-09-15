const express = require('express')
const router = express.Router()
const Context = require('./classes/context')

// Form handler
router.get(['/handle-form'], function (req, res) {
  var context = new Context(req, res)
  context.get_phase()
  context.handle_form_data()
})

// Choose the list of countries for the import origin
router.get(['/ximport/origin-country'], function (req, res) {
  var context = new Context(req, res)
  context.get_location_graph()
})

// Choose the list of countries for the export destination
router.get(['/export/destination-country'], function (req, res) {
  var context = new Context(req, res)
  context.get_location_graph()
  res.render('export/destination-country', { context: context })
})

// 
router.get(['/import/destination-country'], function (req, res) {
  var context = new Context(req, res)
  context.check_import_origin();
  res.render('import/destination-country', { context: context })
})

module.exports = router
