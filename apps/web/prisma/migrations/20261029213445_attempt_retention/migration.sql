-- AlterTable
ALTER TABLE "Attempt" ADD COLUMN     "detailsPrunedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Attempt_createdAt_idx" ON "Attempt"("createdAt");
