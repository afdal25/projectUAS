const express = require('express');
const {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  getBooksByCategory,
  getBooksByUser,
  searchBooks,
} = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Tambahkan buku baru (hanya untuk admin)
router.post('/add', authMiddleware, roleMiddleware('ADMIN'), addBook);

// Ambil semua buku (terbuka untuk semua)
router.get('/getAllBooks', getAllBooks);

// Ambil detail buku berdasarkan ID
router.get('/get/:id', getBookById);

// Perbarui data buku (hanya untuk admin)
router.put('/update/:id', authMiddleware, roleMiddleware('ADMIN'), updateBook);

// Hapus buku (hanya untuk admin)
router.delete('/delete/:id', authMiddleware, roleMiddleware('ADMIN'), deleteBook);

// Ambil buku berdasarkan kategori
router.get('/category/:id', getBooksByCategory);

// Ambil buku berdasarkan pengguna
router.get('/user/:id', getBooksByUser);

// Cari buku berdasarkan judul
router.get('/search', searchBooks);

module.exports = router;