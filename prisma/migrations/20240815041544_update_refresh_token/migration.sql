-- DropForeignKey
ALTER TABLE `refreshtokens` DROP FOREIGN KEY `refreshTokens_nim_fkey`;

-- AddForeignKey
ALTER TABLE `refreshTokens` ADD CONSTRAINT `refreshTokens_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `users`(`nim`) ON DELETE CASCADE ON UPDATE RESTRICT;
