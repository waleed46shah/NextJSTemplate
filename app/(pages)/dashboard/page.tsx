"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiStar } from "react-icons/fi";
import CountChart from "@/app/components/CountChart";
import ProductTable from "@/app/components/ProductTable";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
}

interface ProductCategory {
  id: number;
  name: string;
}

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        const fetchedProducts: Product[] = response.data.products;
        setProducts(fetchedProducts);

        // Calculate average rating
        const totalRating = fetchedProducts.reduce(
          (acc, product) => acc + product.rating,
          0
        );
        const avgRating = totalRating / fetchedProducts.length;
        setAverageRating(avgRating);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const categories: ProductCategory[] = Array.from(
    new Set(products.map((product) => product.category))
  ).map((name, id) => ({ id, name }));

  return (
    <main className="h-screen w-full lg:px-16 md:px-12 sm:px-6">
      <div className="w-full flex flex-wrap">
        <div className="flex-1 p-6 flex items-center">
          <FiStar />
          {averageRating !== null ? (
            <h1 className="text-2xl font-semibold">
              Average Rating: {averageRating.toFixed(2)}
            </h1>
          ) : (
            <p>Loading average rating...</p>
          )}
        </div>
        <div className="flex-1 p-6 flex items-center">
          {products !== null ? (
            <CountChart categories={categories} />
          ) : (
            <h1>Loading Chart....</h1>
          )}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Product Table</h2>
        {products !== null ? (
          <ProductTable products={products} />
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </main>
  );
};

export default Page;
