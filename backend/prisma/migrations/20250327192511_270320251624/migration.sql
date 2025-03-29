-- CreateTable
CREATE TABLE `UserSync` (
    `userId` INTEGER NOT NULL,
    `lastSyncedAt` DATETIME(3) NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserSync` ADD CONSTRAINT `UserSync_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
