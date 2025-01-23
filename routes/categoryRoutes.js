const express = require('express');
const {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Tambahkan kategori baru (Hanya untuk admin)
router.post('/add', authMiddleware, roleMiddleware('ADMIN'), addCategory);

// Ambil semua kategori (Terbuka untuk semua pengguna)
router.get('/getAll', authMiddleware, getAllCategories);

// Ambil detail kategori berdasarkan ID (Terbuka untuk semua pengguna)
router.get('/get/:id', authMiddleware, getCategoryById);

// Perbarui kategori (Hanya untuk admin)
router.put('/update/:id', authMiddleware, roleMiddleware('ADMIN'), updateCategory);

// Hapus kategori (Hanya untuk admin)
router.delete('/delete/:id', authMiddleware, roleMiddleware('ADMIN'), deleteCategory);

module.exports = router;