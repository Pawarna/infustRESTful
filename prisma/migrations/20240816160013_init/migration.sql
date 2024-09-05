-- CreateTable
CREATE TABLE `users` (
    `nim` VARCHAR(11) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_nim_key`(`nim`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`nim`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refreshTokens` (
    `token` VARCHAR(191) NOT NULL,
    `nim` VARCHAR(191) NOT NULL,
    `deviceName` VARCHAR(30) NOT NULL,
    `deviceType` VARCHAR(30) NOT NULL,
    `ipAddress` VARCHAR(10) NOT NULL,
    `userAgent` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiredAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `refreshTokens_token_key`(`token`),
    PRIMARY KEY (`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nim` VARCHAR(11) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `birthdayPlace` VARCHAR(100) NULL,
    `birthday` DATE NULL,
    `religion` ENUM('islam', 'kristen', 'katholik', 'hindu', 'budha', 'konghuchu') NULL,
    `gender` ENUM('male', 'female') NULL,
    `studyProgram` VARCHAR(191) NOT NULL DEFAULT 'Informatika',
    `class` VARCHAR(1) NULL,
    `classOf` INTEGER NULL,
    `motto` VARCHAR(255) NULL,
    `badges` ENUM('princeOfInformatics', 'princessOfInformatics', 'student', 'admin') NULL DEFAULT 'student',

    UNIQUE INDEX `students_nim_key`(`nim`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `refreshTokens` ADD CONSTRAINT `refreshTokens_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `users`(`nim`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `users`(`nim`) ON DELETE CASCADE ON UPDATE CASCADE;
