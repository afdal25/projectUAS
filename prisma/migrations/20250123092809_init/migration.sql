/*
  Warnings:

  - Added the required column `author` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `books` ADD COLUMN `author` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(1024) NULL;
