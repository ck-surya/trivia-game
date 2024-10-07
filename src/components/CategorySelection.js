import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../App.css";

const CategorySelection = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://the-trivia-api.com/api/categories"
        );
        const categoryList = Object.keys(res.data);
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  const selectCategory = () => {
    if (selectedCategory) {
      onCategorySelect(selectedCategory);
    }
  };

  return (
    <div className="category-selection">
      <h2>Select Category</h2>
      <div className="category">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">--Choose Category--</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button onClick={selectCategory}>Start Quiz</button>
      </div>
    </div>
  );
};

export default CategorySelection;
