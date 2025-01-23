const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Tambahkan Buku Baru
const addBook = async (req, res) => {
  try {
    const { title, description, author, published_year, category_id } = req.body;
    const user_id = req.user.id; // Dari JWT Middleware

    const newBook = await prisma.books.create({
      data: {
        title,
        description,
        author,
        published_year,
        category_id,
        user_id,
      },
    });

    res.status(201).json({
      message: 'Buku berhasil ditambahkan',
      data: newBook,
    });
  } catch (error) {
    res.status(400).json({ error: 'Gagal menambahkan buku' });
  }
};

// Ambil Semua Buku
const getAllBooks = async (req, res) => {
  try {
    const books = await prisma.books.findMany({
      include: { categories: true, users: true }, // Sertakan data relasi
    });

    res.json({ message: 'Buku berhasil diambil.', data: books });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil buku.' });
  }
};

// Ambil Detail Buku Berdasarkan ID
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const books = await prisma.books.findUnique({
      where: { id: parseInt(id) },
      include: { categories: true, users: true }, // Sertakan data relasi
    });

    if (!books) return res.status(404).json({ error: 'Buku tidak ditemukan' });

    res.json({ message: 'Buku berhasil ditemukan.', data: books });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil buku.' });
  }
};

// Perbarui Buku
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, author, published_year, category_id, user_id } = req.body;
    // console.log({ id });
    // console.log({ title });
    // console.log({ author: typeof author });
    // console.log({ description });
    // console.log({ published_year });
    // console.log({ category_id });
    // console.log({ user_id });

    // console.log('tes');
    const updatedBook = await prisma.books.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        author,
        published_year: parseInt(published_year),
        category_id: parseInt(category_id),
        user_id: parseInt(user_id),
      },
    });
    // console.log({ updatedBook: updateBook.name });
    res.status(200).json({ message: 'Buku berhasil diperbarui.', data: updatedBook });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Hapus Buku
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.books.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Buku berhasil dihapus.' });
  } catch (error) {
    res.status(400).json({ error: 'Gagal menghapus buku.' });
  }
};

// Ambil Buku Berdasarkan Kategori
const getBooksByCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const books = await prisma.books.findMany({
      where: { category_id: parseInt(id) },
      include: { categories: true },
    });

    res.json({ message: 'Buku berhasil diambil.', data: books });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil buku berdasarkan kategori.' });
  }
};

// Ambil Buku Berdasarkan Pengguna
const getBooksByUser = async (req, res) => {
  try {
    const { id } = req.params;

    const books = await prisma.books.findMany({
      where: { user_id: parseInt(id) },
      include: { users: true },
    });

    res.json({ message: 'Buku berhasil diambil.', data: books });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil buku berdasarkan pengguna.' });
  }
};

// Cari Buku Berdasarkan Judul
const searchBooks = async (req, res) => {
  try {
    const { title } = req.body;

    const books = await prisma.books.findMany({
      where: {
        title,
      },
    });

    res.json({ message: 'Buku berhasil diambil.', data: books });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mencari buku.' });
  }
};

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  getBooksByCategory,
  getBooksByUser,
  searchBooks,
};
