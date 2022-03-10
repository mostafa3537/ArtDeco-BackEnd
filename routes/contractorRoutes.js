const express = require('express');
const contractorController = require('../controllers/contractorController');
const authController = require('../controllers/authContractorController');
const jobController = require('../controllers/jobController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, contractorController.getAllContractors);

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/:id', contractorController.getContractor);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
// router.use(authController.protect);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

router.get(
  '/getMe',
  authController.protect,
  contractorController.getMe,
  contractorController.getContractor
);
router.patch(
  '/updateMe',
  authController.protect,
  contractorController.uploadContractorImages,
  contractorController.resizeUserImages,
  contractorController.updateMe
);

//get ongoing jobs for specific contractor
router
  .route('/MyAllJobs')
  .get(authController.protect, jobController.getMyAllJobs);

router.delete(
  '/deleteMe',
  authController.protect,
  contractorController.deleteMe
);

router
  .route('/:id')
  // .get(contractorController.getContractor)
  .patch(authController.protect, contractorController.updateContractor)
  .delete(authController.protect, contractorController.deleteContractor);

module.exports = router;
