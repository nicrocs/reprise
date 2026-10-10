-- CreateTable
CREATE TABLE "Instrument" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Instrument_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "SessionTemplate" ADD COLUMN "defaultInstrumentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Instrument_userId_name_key" ON "Instrument"("userId", "name");

-- AddForeignKey
ALTER TABLE "SessionTemplate" ADD CONSTRAINT "SessionTemplate_defaultInstrumentId_fkey" FOREIGN KEY ("defaultInstrumentId") REFERENCES "Instrument"("id") ON DELETE SET NULL ON UPDATE CASCADE;
