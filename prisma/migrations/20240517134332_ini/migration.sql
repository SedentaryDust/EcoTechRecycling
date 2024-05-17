/*
  Warnings:

  - You are about to drop the column `additionalInfoCollector` on the `collector` table. All the data in the column will be lost.
  - Added the required column `dditionalInfoCollector` to the `Collector` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `collector` DROP COLUMN `additionalInfoCollector`,
    ADD COLUMN `dditionalInfoCollector` VARCHAR(191) NOT NULL;
