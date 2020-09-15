# deleteCategories

# DependenciesUsed

1.mongoose for data modeling.


# Project Run Instructions

1. Run `npm install` to install the node modules or dependencies for the project.

2. Run `ng start` for a dev server. Navigate to `http://localhost:3000/` to confirm whether the node project is running or not.

3. Open any one of the REST API Client like postman and make an post API to delete products associated with category name.
   URL : `http://localhost:3000/category/deleteCategory`
   Body : {"categoryName": "Beauty"} 
   (Other category names can be used to delete respective products like, 
   1. "Beauty"
   2. "Clothing"
   3. "Footwear"
   4. "Electronics"
   5. "Furniture")


