# Customization & Extension Guide

This guide provides a step-by-step walkthrough on how to customize and extend this template to build your specific application.

---

## Step 1: Initializing Your Project

After cloning the template repository:

1. **Update Project Metadata**:
   - In `backend/package.json`, modify the `"name"`, `"description"`, and `"repository"` keys.
   - In `frontend/package.json`, update the `"name"` key.
   - In `README.md`, update the titles and description tags to reflect your project name.
2. **Re-initialize Git**:
   ```bash
   rm -rf .git
   git init
   ```
3. **Generate Security Secrets**:
   Open a terminal and run the following command twice (once for Access Token secret, once for Refresh Token secret):
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```
   Paste these secure strings into `JWT_SECRET` and `JWT_REFRESH_SECRET` inside your local `.env` file.

---

## Step 2: Customizing the Database (SQL vs MongoDB)

### Option A: Using the default PostgreSQL
1. Add your new database models directly to `backend/prisma/schema.prisma`. E.g.:
   ```prisma
   model Product {
     id          String   @id @default(uuid())
     name        String
     description String?
     price       Decimal
     stock       Int      @default(0)
     createdAt   DateTime @default(now())
     updatedAt   DateTime @updatedAt

     @@map("products")
   }
   ```
2. Run migrations to update the database schema:
   ```bash
   npx prisma migrate dev --name add-products
   ```

### Option B: Switching to MongoDB
1. Modify `backend/prisma/schema.prisma` to set the datasource provider to `"mongodb"`:
   ```prisma
   datasource db {
     provider = "mongodb"
     url      = env("DATABASE_URL")
   }
   ```
2. Update the model IDs to use MongoDB's ObjectID representation:
   ```prisma
   model User {
     id    String @id @default(auto()) @map("_id") @db.ObjectId
     email String @unique
     // ...
   }
   ```
3. Change `DATABASE_URL` in your `.env` to match a standard Mongo URI:
   ```env
   DATABASE_URL="mongodb://root:example@localhost:27017/enterprise_db?authSource=admin"
   ```
4. Regenerate the Prisma Client schema:
   ```bash
   npx prisma generate
   ```

---

## Step 3: End-to-End Walkthrough: Building a New Feature

This walkthrough demonstrates how to build a new feature (e.g. `Product`) from database queries to UI components.

### 1. Backend Implementation

To add a new "Product" entity, follow the layered folder conventions:

#### A. Define the Domain Model & DTOs
Create `backend/src/models/product.model.ts`:
```typescript
export interface IProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
```
Create `backend/src/dto/product.dto.ts` to type inputs and sanitize API responses:
```typescript
import { IProduct } from '../models/product.model';

export interface CreateProductDto {
  name: string;
  description?: string;
  price: number;
  stock?: number;
}

export class ProductDtoMapper {
  public static toResponse(product: IProduct) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      stock: product.stock,
      createdAt: product.createdAt.toISOString(),
    };
  }
}
```

#### B. Create Request Validation
Create `backend/src/validators/product.validation.ts` using Zod:
```typescript
import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be greater than zero'),
  stock: z.number().int().nonnegative().optional(),
});
```

#### C. Create the Repository Layer
Create `backend/src/repositories/product.repository.ts` to encapsulate database access queries:
```typescript
import prisma from '../database/client';
import { Product } from '@prisma/client';
import { CreateProductDto } from '../dto/product.dto';

export class ProductRepository {
  public async findById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({ where: { id } });
  }

  public async findAll(): Promise<Product[]> {
    return prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  }

  public async create(data: CreateProductDto): Promise<Product> {
    return prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock ?? 0,
      },
    });
  }
}
```

#### D. Create the Service Layer
Create `backend/src/services/product.service.ts` to manage business logic:
```typescript
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDto } from '../dto/product.dto';
import { NotFoundError } from '../errors/app-error';

export class ProductService {
  private repository = new ProductRepository();

  public async listProducts() {
    return this.repository.findAll();
  }

  public async addProduct(dto: CreateProductDto) {
    // Add custom business rules here (e.g. check duplicate SKUs)
    return this.repository.create(dto);
  }
}
```

#### E. Create the Controller
Create `backend/src/controllers/product.controller.ts` to parse incoming HTTP actions:
```typescript
import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { ResponseHelper } from '../errors/response.helper';
import { ProductDtoMapper } from '../dto/product.dto';

export class ProductController {
  private service = new ProductService();

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.service.listProducts();
    const responseData = products.map(ProductDtoMapper.toResponse);
    return ResponseHelper.success({ res, data: responseData });
  };

  public create = async (req: Request, res: Response) => {
    const product = await this.service.addProduct(req.body);
    const responseData = ProductDtoMapper.toResponse(product);
    return ResponseHelper.created(res, responseData);
  };
}
```

#### F. Map Routes and Register
Create `backend/src/routes/product.routes.ts`:
```typescript
import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { validate } from '../validators/validate.middleware';
import { createProductSchema } from '../validators/product.validation';
import { authenticate } from '../auth/auth.middleware';
import { asyncHandler } from '../errors/async.handler';

const router = Router();
const controller = new ProductController();

router.get('/', asyncHandler(controller.getAll));
router.post('/', authenticate, validate({ body: createProductSchema }), asyncHandler(controller.create));

export default router;
```
Register the routes inside the main api router in `backend/src/routes/index.ts`:
```typescript
import productRouter from './product.routes';

// ...
router.use('/products', productRouter);
```

---

### 2. Frontend Implementation

To view or manage products inside the React application, follow the modular feature-based design:

#### A. Set up Types & API Client Calls
Create `frontend/src/features/product/types/product.types.ts`:
```typescript
export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
}
export type CreateProductPayload = Omit<Product, 'id'>;
```
Create `frontend/src/features/product/api/productApi.ts`:
```typescript
import apiClient from '../../../api/client';
import { Product, CreateProductPayload } from '../types/product.types';

export const productApi = {
  async getProducts(): Promise<Product[]> {
    const response = await apiClient.get('/products');
    return response.data.data;
  },
  async createProduct(payload: CreateProductPayload): Promise<Product> {
    const response = await apiClient.post('/products', payload);
    return response.data.data;
  },
};
```

#### B. Create React Query Hooks
Create `frontend/src/features/product/hooks/useProducts.ts`:
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi } from '../api/productApi';
import { CreateProductPayload } from '../types/product.types';

export const useProducts = () => {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: productApi.getProducts,
  });

  const createMutation = useMutation({
    mutationFn: (payload: CreateProductPayload) => productApi.createProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return {
    products: productsQuery.data || [],
    isLoading: productsQuery.isLoading,
    error: productsQuery.error,
    createProduct: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
  };
};
```

#### C. Create UI Components
Create `frontend/src/features/product/components/ProductCard.tsx`:
```tsx
import React from 'react';
import { Product } from '../types/product.types';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="glass-panel rounded-xl p-5 border border-slate-800">
      <h3 className="font-bold text-lg text-slate-100">{product.name}</h3>
      <p className="text-slate-400 text-xs mt-1">{product.description || 'No description provided'}</p>
      <div className="flex items-center justify-between mt-4">
        <span className="text-indigo-400 font-bold font-mono">${product.price.toFixed(2)}</span>
        <span className="text-xs text-slate-500">{product.stock} units remaining</span>
      </div>
    </div>
  );
};
```

#### D. Create the Pages View & Register Route
Create `frontend/src/features/product/pages/ProductListPage.tsx`:
```tsx
import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';

export const ProductListPage: React.FC = () => {
  const { products, isLoading, error } = useProducts();

  if (isLoading) return <div className="text-slate-400 text-sm">Fetching catalog...</div>;
  if (error) return <div className="text-rose-400 text-sm">Error loading catalog.</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-100">Product Catalog</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};
```
Finally, mount the page to client navigation inside `frontend/src/routes/index.tsx`:
```tsx
import { ProductListPage } from '../features/product/pages/ProductListPage';

// ... Inside layout router routes
<Route path="/products" element={<ProductListPage />} />
```
And add links to the sidebar navigation panel.
