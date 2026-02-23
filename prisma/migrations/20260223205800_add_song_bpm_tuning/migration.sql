-- CreateEnum
CREATE TYPE "Tuning" AS ENUM ('STANDARD', 'DROP_D', 'DROP_C', 'OPEN_G', 'OPEN_D', 'DADGAD');

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "bpm" INTEGER,
ADD COLUMN     "songId" TEXT,
ADD COLUMN     "tuning" "Tuning";

-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Song_userId_title_key" ON "Song"("userId", "title");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE SET NULL ON UPDATE CASCADE;
