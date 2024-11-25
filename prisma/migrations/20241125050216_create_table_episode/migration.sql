-- CreateTable
CREATE TABLE `episodes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `animeId` INTEGER NOT NULL,
    `episodeNumber` INTEGER NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `videoUrl` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `episodes` ADD CONSTRAINT `episodes_animeId_fkey` FOREIGN KEY (`animeId`) REFERENCES `animes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
