const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Tambahkan Kategori Baru
const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Periksa apakah nama kategori sudah ada
    const existingCategory = await prisma.categories.findUnique({ where: { name } });
    if (existingCategory) {
      return res.status(400).json({ error: 'Nama kategori sudah digunakan.' });
    }

    // Buat kategori baru
    const category = await prisma.categories.create({
      data: { name },
    });

    res.status(201).json({
      message: 'Kategori berhasil ditambahkan.',
      data: category,
    });
  } catch (error) {
    res.status(500).json({ error: 'Gagal menambahkan kategori.' });
  }
};

// Ambil Semua Kategori
const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.categories.findMany();

    res.json({
      message: 'Kategori berhasil diambil.',
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil kategori.' });
  }
};

// Ambil Detail Kategori Berdasarkan ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await prisma.categories.findUnique({ where: { id: parseInt(id) } });
    if (!category) {
      return res.status(404).json({ error: 'Kategori tidak ditemukan.' });
    }

    res.json({
      message: 'Kategori berhasil diambil.',
      data: category,
    });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil kategori.' });
  }
};

// Perbarui Kategori
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Periksa apakah kategori ada
    const category = await prisma.categories.findUnique({ where: { id: parseInt(id) } });
    if (!category) {
      return res.status(404).json({ error: 'Kategori tidak ditemukan.' });
    }

    // Perbarui kategori
    const updatedCategory = await prisma.categories.update({
      where: { id: parseInt(id) },
      data: { name },
    });

    res.json({
      message: 'Kategori berhasil diperbarui.',
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ error: 'Gagal memperbarui kategori.' });
  }
};

// Hapus Kategori
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Periksa apakah kategori ada
    const category = await prisma.categories.findUnique({ where: { id: parseInt(id) } });
    if (!category) {
      return res.status(404).json({ error: 'Kategori tidak ditemukan.' });
    }

    // Hapus kategori
    await prisma.categories.delete({ where: { id: parseInt(id) } });

    res.json({
      message: 'Kategori berhasil dihapus.',
    });
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghapus kategori.' });
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
