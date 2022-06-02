const express = require('express');
const router = express.Router();

const Document = require('../controllers/indentity.controller');
const uploadManyFiles = require('../middlewares/multipleUploadMiddleware');

router.post('/api/document_type', Document.createDocumentType)
router.get('/api/document_type',Document.findAllDocumentType)
router.get('/api/document_type/find_one',Document.findOneDocumentType)
router.put('/api/document_type', Document.editDocumentType)
router.delete('/api/document_type', Document.deleteDocumentType)
//router.post('/api/document', Document.createDocument)
router.get('/api/document',Document.findAllDocument)
router.get('/api/document/find_one',Document.findOneDocument)
router.put('/api/document',uploadManyFiles, Document.editDocument)
router.put('/api/admin/document', Document.AdminEditDocument)
router.delete('/api/document', Document.deleteDocument)

router.get('/api/document/images/:id',Document.ViewImages)
router.put('/api/document/images',Document.AdminConfirmImages)


module.exports = router;
