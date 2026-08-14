-- CreateEnum
CREATE TYPE "ThumbStyle" AS ENUM ('STEADY', 'ALTERNATING');

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "thumbStyle" "ThumbStyle";
