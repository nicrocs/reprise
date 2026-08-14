-- CreateEnum
CREATE TYPE "SongStatus" AS ENUM ('LEARNING', 'MAINTENANCE', 'WRITING', 'RECORDING', 'MIXING', 'STALLED', 'RELEASED');

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "status" "SongStatus" NOT NULL DEFAULT 'LEARNING',
ADD COLUMN     "currentBlocker" TEXT;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "templateId" TEXT,
ADD COLUMN     "checklistAnswers" JSONB;

-- CreateTable
CREATE TABLE "SessionTemplate" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "showMetronome" BOOLEAN NOT NULL DEFAULT false,
    "showSongPicker" BOOLEAN NOT NULL DEFAULT true,
    "showGoalPicker" BOOLEAN NOT NULL DEFAULT false,
    "checklistItems" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SessionTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SessionTemplate_userId_name_key" ON "SessionTemplate"("userId", "name");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "SessionTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
