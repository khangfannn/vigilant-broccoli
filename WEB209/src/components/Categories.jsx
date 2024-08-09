import { useState , useEffect } from "react"

import { getCategories } from '../services/Header';
import { Link} from "react-router-dom";
import '../assets/css/style.css';
// import DetailedProducts from "./DetailedProducts";
const Categories = () => {

    const [Categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const fetchedCategories = await getCategories();
            // console.log("Fetched categories:", fetchedCategories);
            if (Array.isArray(fetchedCategories)) {
                setCategories(fetchedCategories);
            } else {
                console.error("Fetched categories is not an array:", fetchedCategories);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
    fetchCategories();
    }, []);
    
  return (
    <ul>
            {Categories.map((category) => (
                <li key={category._id}>
                    <Link key={category._id} to={`/products/${category.categoryName}`} > {category.categoryName} </Link>
                </li>
          ))}
            </ul>
  )
}

export default Categories