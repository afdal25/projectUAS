const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Mendapatkan Semua Pengguna (Hanya untuk Admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    res.json({
      message: 'Users retrieved successfully.',
      data: users,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users.' });
  }
};

// Mendapatkan Detail Pengguna Berdasarkan ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.users.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json({
      message: 'User retrieved successfully.',
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user.' });
  }
};

// Memperbarui Detail Pengguna (admin)
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    // Periksa apakah pengguna ada
    const existingUser = await prisma.users.findUnique({ where: { id: parseInt(id) } });
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Perbarui pengguna
    const updatedUser = await prisma.users.update({
      where: { id: parseInt(id) },
      data: { name, email },
    });

    res.json({
      message: 'User updated successfully.',
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user.' });
  }
};

// Menghapus Pengguna (Hanya untuk Admin)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Periksa apakah pengguna ada
    const existingUser = await prisma.users.findUnique({ where: { id: parseInt(id) } });
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Hapus pengguna
    await prisma.users.delete({ where: { id: parseInt(id) } });

    res.json({
      message: 'User deleted successfully.',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user.' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};