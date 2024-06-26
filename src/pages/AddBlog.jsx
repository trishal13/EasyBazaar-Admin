import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCategories } from '../features/bcategory/bcategorySlice';
import { createBlog, getABlog, resetState, updateABlog } from '../features/blogs/blogSlice';

let schema = yup.object().shape({
    title: yup.string().required("Title is Required"),
    description: yup.string().required("Description is Required"),
    category: yup.string().required("Category is Required"),
});

const AddBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const getBlogId = location.pathname.split("/")[3];

    const imgState = useSelector((state) => state?.upload?.images);
    const bCatState = useSelector((state) => state?.bCategory?.bCategories)
    const blogState = useSelector((state) => state?.blogs);

    // console.log(blogState?.blogImages, imgState);

    // blogState?.blogImages?.forEach((i) => {
    //     imgState.push(i);
    // });    

    
    const { isSuccess, isError, isLoading, createdBlog, updatedBlog, blogName, blogDesc, blogCategory, blogImages } = blogState;

    // console.log(blogImages);

    useEffect(() => {
        if (getBlogId !== undefined){
            dispatch(resetState());
            dispatch(getABlog(getBlogId));
        //   img.push(blogImages);
        } else{
          dispatch(resetState());
        }
    }, [getBlogId]);

    useEffect(() => {
        dispatch(resetState());
        dispatch(getCategories());
    }, [])

    useEffect(() => {
        if (isSuccess && createdBlog){
            toast.success("Blog Added Successfully!");
        }
        if (isSuccess && updatedBlog){
            toast.success("Blog Updated Successfully!");
            navigate("/admin/blog-list");
        }
        if (isError){
            toast.error("Something went wrong!");
        }
    }, [isSuccess, isError, isLoading]);

    const [img, setImg] = useState([]);

    useEffect(() => {
        const data = [];
        if (imgState?.length>0){
            imgState?.forEach((i) => {
                data.push({
                    public_id: i?.public_id,
                    url: i?.url,
                });
            })
        } else if (blogState?.blogImages){
            // console.log("inside useeffect");
            blogState?.blogImages?.forEach((i) => {
                console.log(i);
                data.push({url: i?.url, public_id: i?.public_id});
            });
        }
        setImg(data);
    }, [blogState, imgState]);

    console.log(img,imgState);
    useEffect(() => {
        formik.values.images = img;
    }, [blogImages, imgState]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: blogName || "",
            description: blogDesc || "",
            category: blogCategory || "",
            images: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (getBlogId){
                const data = { id: getBlogId, blogData: values }
                dispatch(updateABlog(data));
                dispatch(resetState());        
            } else{
                dispatch(createBlog(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                }, 300);
            }
        },
    });

    // console.log(img);

  return (
    <div>
        <h3 className="mb-4 title">{getBlogId !== undefined ? "Edit" : "Add"} Blog</h3>
        <div>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className='bg-white border-1 p-5 text-center'>
                        <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag n drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                        <div className="showimages d-flex flex-wrap mt-3 gap-3">
                            {imgState?.length===0 ?
                                (img?.map((i,j) => {
                                    return (
                                        <div className='position-relative' key={j}>
                                            <div 
                                                onClick={() => {
                                                    dispatch(deleteImg(i?.url))
                                                    // blogState?.blogImages?.splice(j,1);
                                                }}
                                                className="btn-close position-absolute" 
                                                style={{ top: "10px", right: "10px" }}
                                            ></div>
                                            <img src={i?.url} alt="" width={200} height={200} />
                                        </div>      
                                    )
                                })) :
                                img.map((i,j) => {
                                    return (
                                        <div className='position-relative' key={j}>
                                            <div 
                                                onClick={() => dispatch(deleteImg(i?.url))}
                                                className="btn-close position-absolute" 
                                                style={{ top: "10px", right: "10px" }}
                                            ></div>
                                            <img src={i.url} alt="" width={200} height={200} />
                                        </div>      
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="mt-4">
                        <CustomInput 
                            type="text" 
                            label="Enter Blog Title" 
                            name="title" 
                            val={formik.values.title}
                            onChng={formik.handleChange("title")} 
                            onBlr={formik.handleBlur("title")}        
                        />
                        <div className='error'>
                            {formik.touched.title && formik.errors.title}
                        </div>
                    </div>
                    <select 
                        name="category" 
                        className='form-control py-3 mt-3'
                        value={formik.values.category}
                        onChange={formik.handleChange("category")} 
                        onBlur={formik.handleBlur("category")}
                    >
                        <option value="" disabled selected>Select Blog Category</option>
                        {
                            bCatState.map((i, j) => {
                                return (
                                    <option key={j} value={i?.title}>{i?.title}</option>
                                );
                            })
                        }
                    </select>
                    <div className='error'>
                        {formik.touched.category && formik.errors.category}
                    </div>
                    <ReactQuill 
                        theme='snow' 
                        className='mt-3'
                        name="description"
                        onChange={formik.handleChange("description")}
                        // onBlur={formik.handleBlur("description")} 
                        value={formik.values.description} 
                    />
                    <div className='error'>
                        {formik.touched.description && formik.errors.description}
                    </div>
                    <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>{getBlogId !== undefined ? "Edit" : "Add"} Blog</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddBlog;