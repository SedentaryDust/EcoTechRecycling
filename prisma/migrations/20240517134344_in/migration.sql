/*
  Warnings:

  - You are about to drop the column `dditionalInfoCollector` on the `collector` table. All the data in the column will be lost.
  - Added the required column `additionalInfoCollector` to the `Collector` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `collector` DROP COLUMN `dditionalInfoCollector`,
    ADD COLUMN `additionalInfoCollector` VARCHAR(191) NOT NULL;
