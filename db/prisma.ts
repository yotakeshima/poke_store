import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Prisma, PrismaClient } from '@prisma/client';
import ws from 'ws';

// Sets up WebSocket connections, which enables Neon to use WebSocket communication.
neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DATABASE_URL}`;

// Creates a new connection pool using the procided connection string, allowing multiple concurrent connections
const pool = new Pool({ connectionString });

// Instantiates the Prisma adapter using the Neon connection pool to handle the connection between Prisma and Neon
const adapter = new PrismaNeon(pool);

// Extends the PrismaClient with a custom result transformer to convert the price s to strings
export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString(); // Convert Decimal to string
        },
      },
    },
  },
  query: {
    product: {
      async findMany({
        args,
        query,
      }: {
        args: Prisma.ProductFindManyArgs;
        query: (args: Prisma.ProductFindManyArgs) => Promise<any>;
      }) {
        // Automatically include related data for all `findMany` calls

        args.include = {
          ...args.include,
          pokemon: {
            include: {
              images: true, // Include images
              set: true, // Include set
            },
          },
        };
        console.log('Query Args:', args);
        return query(args);
      },
      async findUnique({
        args,
        query,
      }: {
        args: Prisma.ProductFindUniqueArgs;
        query: (args: Prisma.ProductFindUniqueArgs) => Promise<any>;
      }) {
        // Automatically include related data for all `findUnique` calls
        args.include = {
          ...args.include,
          pokemon: {
            include: {
              images: true,
              set: true,
            },
          },
        };
        return query(args);
      },
    },
  },
});
