const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Mendapatkan semua pengguna (Hanya untuk admin)
router.get('/get', authMiddleware, roleMiddleware('ADMIN'), getAllUsers);

// Mendapatkan detail pengguna berdasarkan ID (Admin)
router.get('/detail/:id', authMiddleware, roleMiddleware('ADMIN'), getUserById);

// Memperbarui pengguna (Admin atau pengguna itu sendiri)
router.put('/update/:id', authMiddleware, roleMiddleware('ADMIN'), updateUser);

// Menghapus pengguna (Hanya untuk admin)
router.delete('/delete/:id', authMiddleware, roleMiddleware('ADMIN'), deleteUser);

module.exports = router;