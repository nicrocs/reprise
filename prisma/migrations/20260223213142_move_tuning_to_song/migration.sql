/*
  Warnings:

  - You are about to drop the column `tuning` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "tuning";

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "tuning" "Tuning" NOT NULL DEFAULT 'STANDARD';
