-- CreateTable
CREATE TABLE "Cart" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "items" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "totalPrice" DECIMAL(65,30) NOT NULL,
    "shippingPrice" DECIMAL(65,30) NOT NULL,
    "taxPrice" DECIMAL(65,30) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
