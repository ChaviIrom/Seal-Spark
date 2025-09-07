import React, { useState , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from '../../redux/actions/categoriesAction.js';
import { fetchCategories } from '../../redux/actions/categoriesAction.js';
import { useNavigate } from "react-router-dom";
import '../../styles/category.css'

export default function AddCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.categories);

    useEffect(() => {
      dispatch(fetchCategories());
    }, [dispatch]);
  
  const [categoryData, setCategoryData] = useState({
    id: "",
    name: "",
    title: "",  
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { id, name, title } = categoryData;

    if (!id || !name || !title) {
      setError("יש למלא את כל השדות!");
      return;
    }

    const existingCategory = categories.find(
      (category) => category.id === Number(id)
    );
    if (existingCategory) {
      setError("מזהה הקטגוריה כבר קיים במערכת. אנא בחרי מזהה אחר.");
      return;
    }

    const newCategory = {
      id: Number(id),
      name: name.trim(),
      title: title.trim(),
    };

    try {
      await dispatch(addCategory(newCategory));
      setSuccess("הקטגוריה נוספה בהצלחה!");
      setSubmitted(true);
    } catch (err) {
      setError("שגיאה בהוספת הקטגוריה: " + err.message);
    }
  };

  const addAnotherCategory = () => {
    setCategoryData({ id: "", name: "", title: "" });
    setError("");
    setSuccess("");
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="addCategorySuccess">
        <h2>{success}</h2>
        <div className="addCategoryButtons">
          <button onClick={addAnotherCategory}>הוספת קטגוריה נוספת +</button>
          <button onClick={() => navigate("/")}>חזרה לדף הבית</button>
        </div>
      </div>
    );
  }

  return (
    <div className="categoryPageWrapper">
      <form className="addCategoryForm" onSubmit={handleSubmit}>
        <h2>הוסף קטגוריה חדשה:</h2>

        {error && <div className="errorMessage">{error}</div>}
        {success && <div className="successMessage">{success}</div>}

        <input
          type="text"
          name="id"
          placeholder="מזהה קטגוריה"
          onChange={handleChange}
          value={categoryData.id}
        />
        <input
          type="text"
          name="name"
          placeholder="שם קטגוריה"
          onChange={handleChange}
          value={categoryData.name}
        />
        <input
          type="text"
          name="title"
          placeholder="כותרת קטגוריה"
          onChange={handleChange}
          value={categoryData.title}
        />
        <button type="submit">שמור קטגוריה</button>
      </form>
    </div>
  );
}
