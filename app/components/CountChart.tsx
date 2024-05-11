import React, { useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

interface ProductCategory {
  id: number;
  name: string;
}

interface Props {
  categories: ProductCategory[];
}

const CountChart: React.FC<Props> = ({ categories }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        const products = response.data.products;
        const categoryCounts = countProductsByCategory(products);
        renderChart(categoryCounts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const countProductsByCategory = (products: any[]): Map<string, number> => {
    const categoryCounts = new Map<string, number>();
    products.forEach((product: any) => {
      const category = product.category;
      if (categoryCounts.has(category)) {
        categoryCounts.set(category, categoryCounts.get(category)! + 1);
      } else {
        categoryCounts.set(category, 1);
      }
    });
    return categoryCounts;
  };

  const renderChart = (categoryCounts: Map<string, number>) => {
    const ctx = document.getElementById("countChart") as HTMLCanvasElement;
    const labels = Array.from(categoryCounts.keys());
    const counts = Array.from(categoryCounts.values());

    new Chart(ctx, {
      type: "pie", // Change chart type to pie
      data: {
        labels: labels,
        datasets: [
          {
            label: "Product Counts",
            data: counts,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)",
            ], // You can add more colors as needed
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Product Counts by Category",
          },
        },
      },
    });
  };

  return (
    <div className="w-full p-6 flex flex-col items-center">
      <canvas className="max-w-5xl" id="countChart"></canvas>
    </div>
  );
};

export default CountChart;
