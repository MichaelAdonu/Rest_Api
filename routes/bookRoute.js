const express = require('express');
const {
	getAllBooks,
	getBookById,
	createBook,
	deleteBook,
	updateBook,
} = require('../controller/bookController');

const router = express.Router();

router.route('/books').get(getAllBooks).post(createBook);
router
	.route('/books/:id')
	.get(getBookById)
	.patch(updateBook)
	.delete(deleteBook);

module.exports = router;
