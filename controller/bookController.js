const fs = require('fs');
const bookLists = require('../public/bookLists');

// Middleware to validate incoming JSON request body

exports.getAllBooks = (req, res) => {
	console.log(req.RequestTime);

	res.json({
		status: 'success',
		requestedAt: req.RequestTime,
		results: bookLists.length,
		data: bookLists,
		message: 'All books retrieved successfully',
	});
};

exports.getBookById = (req, res) => {
	console.log(req.params);
	const bookId = req.params.id * 1;
	const book = bookLists.find((item) => item.id === bookId);
	if (!book) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid book id',
		});
	}

	// if (req.params.id * 1> bookLists.length) {
	// 	return res.status(404).json({
	// 		status: 'fail',
	// 		message: 'Invalid book id',
	// 	});
	// }

	res.json({
		status: 'success',
		data: book,
		message: 'Book retrieved successfully',
	});
};

exports.createBook = (req, res) => {
	const newId = bookLists[bookLists.length - 1].id + 1;
	const newBook = Object.assign({ id: newId }, req.body);

	bookLists.push(newBook);
	fs.writeFile(
		`/Users/mac/Desktop/BUILD/Codetrain Works/Class Examples/Rest_Api/public/bookLists.json`,
		JSON.stringify(bookLists),
		(error) => {
			res.status(201).json({
				status: 'success',
				data: {
					book: newBook,
				},
				message: 'Book created successfully',
			});
		}
	);

	//console.log(req.body);

	// res.json({
	// 	status: 'success',
	// 	data: req.body,
	// 	message: 'Book created successfully',
	// });
};

exports.updateBook = (req, res) => {
	const { title, author, description } = req.body;
	const updatedBookList = bookLists.map((bookItem) => {
		if (bookItem.id == req.params.id * 1) {
			return {
				...bookItem,
				title,
				author,
				description,
			};
		}
		return bookItem;
	});

	res.json({
		status: 'success',
		data: updatedBookList,
		message: 'Book updated successfully',
	});

	// fs.writeFile(
	// 	`/Users/mac/Desktop/BUILD/Codetrain Works/Class Examples/Rest_Api/public/bookLists.json`,
	// 	JSON.stringify(bookLists),
	// 	(error) => {
	// 		res.status(200).json({
	// 			status: 'success',
	// 			data: {
	// 				book: updatedBookList,
	// 			},
	// 			message: 'Book updated successfully',
	// 		});
	// 	}
	// );

	// const book = bookLists.find((bookItem) => bookItem.id == req.params.id * 1);
	// if (req.params.id * 1 > bookLists.length) {
	// 	return res.status(404).json({
	// 		status: 'fail',
	// 		message: 'Invalid book id',
	// 	});
	// }
};

exports.deleteBook = (req, res) => {
	const remainingBooks = bookLists.filter(
		(bookItem) => bookItem.id != req.params.id * 1
	);

	res.json({
		status: 'success',
		data: remainingBooks,
		message: 'Book deleted successfully',
	});
};

// exports.getAllBooks = (req, res) => {
// 	res.send('Get all todos');
// };

// exports.getBookById = (req, res) => {
// 	res.send('Get a todo');
// };

// exports.createBook = (req, res) => {
// 	res.send('Create a todo');
// 	console.log(req.body);
// };

// exports.updateBook = (req, res) => {
// 	res.send('Update a todo');
// };

// exports.deleteBook = (req, res) => {
// 	res.send('Delete a todo');
// };
