const express = require('express');
const router = express.Router();
const relationship = require('../controllers/relationship.controller');

router.post('/api/relationship',relationship.createRelationship)
router.put('/api/relationship',relationship.editRelationship)
router.get('/api/relationship',relationship.listRelationship)
module.exports=router
