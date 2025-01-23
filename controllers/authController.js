const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Register Admin
const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Pengecekan apakah email sudah terdaftar
      const existingUser = await prisma.users.findUnique({
        where: { email },
      });
      if (existingUser) {
        return res.status(400).json({ error: 'Email is already registered.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Mendaftarkan admin
      const user = await prisma.users.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: 'ADMIN', // Secara otomatis set role admin
        },
      });
  
      // Membuat token JWT
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
  
      return res.status(201).json({
        message: 'Admin registered successfully.',
        token,
        data: { id: user.id, name: user.name, email: user.email, role: user.role },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Something went wrong.' });
    }
  };
  
  // Register User
  const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Pengecekan apakah email sudah terdaftar
      const existingUser = await prisma.users.findUnique({
        where: { email },
      });
      if (existingUser) {
        return res.status(400).json({ error: 'Email is already registered.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Mendaftarkan user biasa
      const user = await prisma.users.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: 'USER', // Secara otomatis set role user
        },
      });
  
      // Membuat token JWT
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
  
      return res.status(201).json({
        message: 'User registered successfully.',
        token,
        data: { id: user.id, name: user.name, email: user.email, role: user.role },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Something went wrong.' });
    }
  };
  
  // Login untuk semua user (admin dan user)
  const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Mencari pengguna berdasarkan email
      const user = await prisma.users.findUnique({ where: { email } });
      if (!user) return res.status(404).json({ error: 'User not found.' });
  
      // Verifikasi password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials.' });
  
      // Membuat token JWT
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
  
      return res.json({
        message: 'Login successful.',
        token,
        data: { id: user.id, name: user.name, email: user.email, role: user.role },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Something went wrong.' });
    }
  };
  
  module.exports = { registerAdmin, registerUser, login };