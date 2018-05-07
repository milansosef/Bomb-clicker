const express = require('express');
const router = express.Router();

// render site
router.get('/', (req, res, next) => {
	res.sendFile('docs/index.html', { root: '.' });
})

module.exports = router;
