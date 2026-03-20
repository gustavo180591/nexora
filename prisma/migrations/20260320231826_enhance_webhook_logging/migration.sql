/*
  Warnings:

  - Added the required column `payload` to the `WebhookEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WebhookEvent" ADD COLUMN     "error" TEXT,
ADD COLUMN     "payload" JSONB NOT NULL DEFAULT '{}';

-- Update existing records to have proper payload
UPDATE "WebhookEvent" SET "payload" = '{}' WHERE "payload" = '{}';

-- Remove the default constraint
ALTER TABLE "WebhookEvent" ALTER COLUMN "payload" DROP DEFAULT;
