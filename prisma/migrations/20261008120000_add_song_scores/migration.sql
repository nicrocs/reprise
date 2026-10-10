-- CreateTable
CREATE TABLE "SongScore" (
    "id" TEXT NOT NULL,
    "songId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "alphaTex" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SongScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SongScore_songId_sortOrder_idx" ON "SongScore"("songId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "SongScore_songId_label_key" ON "SongScore"("songId", "label");

-- AddForeignKey
ALTER TABLE "SongScore" ADD CONSTRAINT "SongScore_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;
