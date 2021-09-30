-- CreateTable
CREATE TABLE "DockerContainer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "exposedUrl" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "DockerContainer_exposedUrl_key" ON "DockerContainer"("exposedUrl");
