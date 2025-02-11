// product.controller.ts

import { Request, Response } from 'express';
import {
  CreateProductInput,
  UpdateProductInput,
} from '../schema/product.schema';
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
} from '../service/product.service';

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput['body']>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;

    const body = req.body;

    const product = await createProduct({ ...body, user: userId });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function updateProductHandler(
  req: Request<UpdateProductInput['params'], {}, UpdateProductInput['body']>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;

    const productId = req.params.productId;
    const update = req.body;

    const product = await findProduct({ productId });

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    } else if (product.user?.toString() !== userId) {
      res.status(403).json({ message: 'Unauthorized to update this product' });
      return;
    }

    const updatedProduct = await findAndUpdateProduct({ productId }, update, {
      new: true,
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getProductHandler(
  req: Request<UpdateProductInput['params']>,
  res: Response
) {
  try {
    const productId = req.params.productId;

    const product = await findProduct({ productId });

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.send(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function deleteProductHandler(
  req: Request<UpdateProductInput['params']>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const productId = req.params.productId;

    const product = await findProduct({ productId });

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else if (product.user?.toString() !== userId) {
      res.status(403).json({ message: 'Unauthorized to delete this product' });
    }

    await deleteProduct({ productId });

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
