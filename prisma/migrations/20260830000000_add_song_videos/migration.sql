-- CreateTable
CREATE TABLE "SongVideo" (
    "id" TEXT NOT NULL,
    "songId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SongVideo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SongVideo" ADD CONSTRAINT "SongVideo_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;
