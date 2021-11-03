/*************************************************
 *
 * api routes for question opeartions
 *
 *************************************************/

// imports
const router = require("express").Router();

// importing controller
const {
  saveQuestion,
  updateQuestion,
  saveQuestoionResponse,
} = require("../controllers/survey");

// question operational routes
router.post("/saveQuestion", saveQuestion);
router.post("/updateQuestion", updateQuestion);
router.post("/saveQuestoionResponse", saveQuestoionResponse);

// exporting router
module.exports = router;