const express = require('express');
const router = express.Router();
const relative_relation = require('../controllers/relative_relation.controller');

router.post('/api/relative_relation',relative_relation.createRelativeRelation)
router.get('/api/relative_relation',relative_relation.findRelativeRelation)
router.put('/api/relative_relation',relative_relation.editRelativeRelation)
router.get('/api/relative_relation/customer/:id',relative_relation.findRelativeRelationByIdCustomer)

module.exports=router
