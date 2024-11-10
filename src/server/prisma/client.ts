import { PrismaClient } from "@prisma/client";

// Import this single instance of prisma and re-use across the application
// The prisma object is cached the first time it is created
const prisma = new PrismaClient();

export default prisma;
