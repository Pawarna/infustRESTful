/*
  Warnings:

  - You are about to drop the column `createAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `createAt`,
    DROP COLUMN `updateAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `refreshTokens` (
    `token` VARCHAR(191) NOT NULL,
    `nim` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiredAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `refreshTokens_token_key`(`token`),
    PRIMARY KEY (`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `refreshTokens` ADD CONSTRAINT `refreshTokens_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `users`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;
