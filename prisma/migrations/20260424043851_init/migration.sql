-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('HOOK', 'TWEET', 'REEL', 'CAPTION');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HookGeneration" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "niche" TEXT NOT NULL,
    "input" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HookGeneration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HookItem" (
    "id" TEXT NOT NULL,
    "generationId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" "ContentType" NOT NULL,
    "score" INTEGER,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HookItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE INDEX "HookGeneration_userId_idx" ON "HookGeneration"("userId");

-- CreateIndex
CREATE INDEX "HookGeneration_niche_idx" ON "HookGeneration"("niche");

-- CreateIndex
CREATE INDEX "HookItem_generationId_idx" ON "HookItem"("generationId");

-- CreateIndex
CREATE INDEX "HookItem_type_idx" ON "HookItem"("type");

-- AddForeignKey
ALTER TABLE "HookGeneration" ADD CONSTRAINT "HookGeneration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HookItem" ADD CONSTRAINT "HookItem_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "HookGeneration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
