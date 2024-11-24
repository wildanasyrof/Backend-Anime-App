-- CreateTable
CREATE TABLE `_AnimeToGenre` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AnimeToGenre_AB_unique`(`A`, `B`),
    INDEX `_AnimeToGenre_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AnimeToGenre` ADD CONSTRAINT `_AnimeToGenre_A_fkey` FOREIGN KEY (`A`) REFERENCES `animes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AnimeToGenre` ADD CONSTRAINT `_AnimeToGenre_B_fkey` FOREIGN KEY (`B`) REFERENCES `genres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
