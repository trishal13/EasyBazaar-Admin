import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as yup from "yup";
import { createBlogCategory, getABlogCategory, resetState, updateABlogCategory } from '../features/bcategory/bcategorySlice';

let schema = yup.object().shape({
  title: yup.string().required("Blog Category is Required"),
});

const AddBlogCat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getBlogCatId = location.pathname.split("/")[3];
  const navigate = useNavigate();

  const newBlogCategory = useSelector((state) => state?.bCategory);
  const { isSuccess, isError, isLoading, createdBlogCategory, updatedBlogCategory, blogCatName } = newBlogCategory;

  useEffect(() => {
    if (getBlogCatId !== undefined){
      dispatch(getABlogCategory(getBlogCatId));
    } else{
      dispatch(resetState());
    }
  }, [getBlogCatId]);

  useEffect(() => {
      if (isSuccess && createdBlogCategory){
          toast.success("Blog Category Added Successfully!");
      }
      if (isSuccess && updatedBlogCategory){
        toast.success("Blog Category Updated Successfully!");
        navigate("/admin/blog-category-list");
      }
      if (isError){
          toast.error("Something went wrong!");
      }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCatName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogCatId !== undefined){
        const data = { id: getBlogCatId, blogCatData: values }
        dispatch(updateABlogCategory(data));
        dispatch(resetState());
      } else{
        dispatch(createBlogCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
        <h3 className="mb-4 title">{getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput 
                  type="text" 
                  label="Enter Blog Category"
                  name="title"
                  val={formik.values.title} 
                  onChng={formik.handleChange("title")} 
                  onBlr={formik.handleBlur("title")}
                  id="blogcat"
                />
                <div className='error'>
                    {formik.touched.title && formik.errors.title}
                </div>
                <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>{getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category</button>
            </form>
        </div>
    </div>
  )
}

export default AddBlogCat