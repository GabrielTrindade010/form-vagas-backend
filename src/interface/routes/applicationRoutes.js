const express = require('express');
const router = express.Router();
const ApplicationController = require('../controllers/ApplicationController');
const { body, validationResult } = require('express-validator');

// Validation middleware
const validateApplication = [
  body('fullName').isString().isLength({ min: 3 }).withMessage('Full name must be at least 3 characters'),
  body('nomeVaga').notEmpty().withMessage('Nome da vaga is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

router.post('/', validateApplication, (req, res) => ApplicationController.create(req, res));
router.get('/:id/pdf', (req, res) => ApplicationController.getPdf(req, res));

module.exports = router;
