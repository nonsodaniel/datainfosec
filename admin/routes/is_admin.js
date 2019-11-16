const express = require('express');
const router = express.Router();
const adminController = require('../app/api/controllers/is_admin')



router.post('/register', adminController.create);
router.post('/authenticate', adminController.authenticate)

router.put('/:adminId', adminController.updateById);
// router.delete('/:adminId', adminController.deleteById);
router.get('/', adminController.getAll)
router.get('/:adminId', adminController.getById)

module.exports = router;