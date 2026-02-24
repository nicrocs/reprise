-- CreateEnum
CREATE TYPE "Key" AS ENUM ('E_MAJOR', 'A_MAJOR', 'D_MAJOR', 'C_MAJOR', 'G_MAJOR', 'A_MINOR', 'E_MINOR', 'D_MINOR', 'B_MAJOR', 'F_MAJOR', 'Bb_MAJOR', 'Eb_MAJOR', 'Ab_MAJOR', 'Db_MAJOR', 'Gb_MAJOR', 'B_MINOR', 'F_SHARP_MINOR', 'C_SHARP_MINOR', 'G_MINOR', 'C_MINOR', 'F_MINOR', 'Bb_MINOR');

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "intention" TEXT,
ADD COLUMN     "intentionMet" BOOLEAN;

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "capo" INTEGER,
ADD COLUMN     "key" "Key";
