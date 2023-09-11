const express= require('express');
const router= express.Router();
const ProductController= require('../controllers/ProductController');
const { authMiddleWare, authUserMiddleWare } = require('../middlewares/authMiddleWare');

router.post('/create', ProductController.createProduct);
router.put('/update/:id', ProductController.updateProduct);
router.get('/get-details/:id', ProductController.getDetailsProduct);
router.delete('/delete/:id', ProductController.deleteProduct);
router.get('/getAll', ProductController.getAllProduct);



module.exports = router;