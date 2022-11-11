function Categories({ setCategoryFunction }) {
  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];
  return (
    <div>
      <ul>
        {categories.map((category) => (
          <li key={category} onClick={() => setCategoryFunction(category)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
