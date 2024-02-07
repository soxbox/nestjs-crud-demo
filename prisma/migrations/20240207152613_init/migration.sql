-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friend" (
    "userById" INTEGER NOT NULL,
    "friendById" INTEGER NOT NULL,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("userById","friendById")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userById_fkey" FOREIGN KEY ("userById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_friendById_fkey" FOREIGN KEY ("friendById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
