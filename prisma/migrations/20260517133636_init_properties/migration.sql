-- CreateTable
CREATE TABLE `Property` (
    `id` VARCHAR(191) NOT NULL,
    `source` ENUM('OTODOM', 'MANUAL') NOT NULL DEFAULT 'OTODOM',
    `sourceUrl` VARCHAR(768) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `price` INTEGER NULL,
    `currency` VARCHAR(10) NOT NULL DEFAULT 'PLN',
    `location` VARCHAR(255) NULL,
    `district` VARCHAR(120) NULL,
    `areaM2` DECIMAL(8, 2) NULL,
    `rooms` INTEGER NULL,
    `floor` INTEGER NULL,
    `imageUrl` VARCHAR(2048) NULL,
    `transactionType` ENUM('SALE', 'RENT') NOT NULL,
    `status` ENUM('ACTIVE', 'HIDDEN', 'SOLD', 'RENTED') NOT NULL DEFAULT 'ACTIVE',
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Property_sourceUrl_key`(`sourceUrl`),
    INDEX `Property_status_idx`(`status`),
    INDEX `Property_isFeatured_idx`(`isFeatured`),
    INDEX `Property_transactionType_idx`(`transactionType`),
    INDEX `Property_district_idx`(`district`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
