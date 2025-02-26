-- CreateTable
CREATE TABLE `tasks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `description` TEXT NULL,
    `course` VARCHAR(191) NOT NULL,
    `dueDate` DATETIME(3) NOT NULL,
    `classOf` INTEGER NOT NULL,
    `submittedTo` VARCHAR(191) NULL,
    `linkSubmition` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentTask` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nim` VARCHAR(11) NOT NULL,
    `taskId` INTEGER NOT NULL,
    `completed` BOOLEAN NOT NULL DEFAULT false,
    `assignedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StudentTask` ADD CONSTRAINT `StudentTask_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `students`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentTask` ADD CONSTRAINT `StudentTask_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `tasks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
