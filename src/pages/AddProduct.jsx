import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from '../features/brand/brandSlice';
import { getCategories } from '../features/pcategory/pcategorySlice';
import { getColors } from '../features/color/colorSlice';
import "react-widgets/styles.css";
import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import { createProducts, resetState } from '../features/product/productSlice';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

let schema = yup.object().shape({
    title: yup.string().required("Title is Required"),
    description: yup.string().required("Description is Required"),
    price: yup.number().required("Price is Required"),
    brand: yup.string().required("Brand is Required"),
    category: yup.string().required("Category is Required"),
    tags: yup.string().required("Tag is Required"),
    color: yup.array().min(1, "Pick atleast 1 color").required("Colors are requires"),
    quantity: yup.number().required("Quantity is Required"),
});

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [color, setColor] = useState([]);
    const [images, setImages] = useState([]);
    useEffect(() => {
        dispatch(getBrands());
        dispatch(getCategories());
        dispatch(getColors());
        // formik.values.color = color;
    }, [])

    const brandState = useSelector((state) => state?.brand?.brands);
    const catState = useSelector((state) => state?.pCategory?.pCategories);
    const colorState = useSelector((state) => state?.color?.colors);
    const imgState = useSelector((state) => state?.upload?.images);
    const newProduct = useSelector((state) => state?.product);
    const { isSuccess, isError, isLoading, createdProduct } = newProduct;


    useEffect(() => {
        if (isSuccess && createdProduct){
            toast.success("Product Added Successfully!");
        }
        if (isError){
            toast.error("Something went wrong!");
        }
    }, [isSuccess, isError, isLoading]);

    // console.log(colorState);

    const colorOpt = [];
    colorState.forEach((i) => {
        colorOpt.push({
            label: i?.title,
            value: i?._id,
        });
    })

    const handleColors = (e) => {
        setColor(e);
    }

    const img = [];
    imgState.forEach((i) => {
        img.push({
            public_id: i?.public_id,
            url: i?.url,
        });
    })

    useEffect(() => {
        formik.values.color = color ? color : " ";
        formik.values.images = img;
    }, [color, img]);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            price: "",
            brand: "",
            category: "",
            tags: "",
            color: "",
            quantity: "",
            images: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createProducts(values));
            formik.resetForm();
            setColor(null);
            setTimeout(() => {
                dispatch(resetState());
            }, 3000);
        },
    });
    const [desc, setDesc] = useState();
    const handleDesc = (e) => {
        setDesc(e);
    }
  return (
    <div>
        <h3 className="mb-4 title">Add Product</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-3'>
                <CustomInput 
                    type="text" 
                    label="Enter Product Title" 
                    name="title" 
                    val={formik.values.title}
                    onChng={formik.handleChange("title")} 
                    onBlr={formik.handleBlur("title")}
                />
                <div className='error'>
                    {formik.touched.title && formik.errors.title}
                </div>
                <div className=''>
                    <ReactQuill 
                        theme='snow'
                        name="description"
                        onChange={formik.handleChange("description")}
                        // onBlur={formik.handleBlur("description")} 
                        value={formik.values.description} 
                    />
                </div>
                <div className='error'>
                    {formik.touched.description && formik.errors.description}
                </div>
                <CustomInput 
                    type="number" 
                    label="Enter Product Price" 
                    name="price" 
                    val={formik.values.price}
                    onChng={formik.handleChange("price")} 
                    onBlr={formik.handleBlur("price")}
                />
                <div className='error'>
                    {formik.touched.price && formik.errors.price}
                </div>
                <select 
                    name="brand" 
                    className='form-control py-3 mb-3'
                    val={formik.values.brand}
                    onChange={formik.handleChange("brand")} 
                    onBlur={formik.handleBlur("brand")}
                >
                    <option value="" selected disabled>Select Product Brand</option>
                    {
                        brandState.map((i, j) => {
                            return (
                                <option key={j} value={i?.title}>{i?.title}</option>
                            );
                        })
                    }
                </select>
                <div className='error'>
                    {formik.touched.brand && formik.errors.brand}
                </div>
                <select 
                    name="category" 
                    className='form-control py-3 mb-3'
                    val={formik.values.category}
                    onChange={formik.handleChange("category")} 
                    onBlur={formik.handleBlur("category")}
                >
                    <option value="" disabled selected>Select Product Category</option>
                    {
                        catState.map((i, j) => {
                            return (
                                <option key={j} value={i?.title}>{i?.title}</option>
                            );
                        })
                    }
                </select>
                <div className='error'>
                    {formik.touched.category && formik.errors.category}
                </div>
                <select 
                    name="tags" 
                    className='form-control py-3 mb-3'
                    val={formik.values.tags}
                    onChange={formik.handleChange("tags")} 
                    onBlur={formik.handleBlur("tags")}
                >
                    <option value="" selected disabled>Select Product Tags</option>
                    <option value="featured">Featured</option>
                    <option value="popular">Popular</option>
                    <option value="special">Special</option>
                </select>
                <div className='error'>
                    {formik.touched.tags && formik.errors.tags}
                </div>
                <Select
                    mode='multiple'
                    allowClear
                    className='w-100'
                    placeholder="Select Colors"
                    defaultValue={color}
                    onChange={(i) => handleColors(i)}
                    options={colorOpt}
                />
                <div className='error'>
                    {formik.touched.color && formik.errors.color}
                </div>
                <CustomInput 
                    type="number" 
                    label="Enter Product Quantity"
                    name="quantity" 
                    val={formik.values.quantity}
                    onChng={formik.handleChange("quantity")} 
                    onBlr={formik.handleBlur("quantity")} 
                />
                <div className='error'>
                    {formik.touched.quantity && formik.errors.quantity}
                </div>
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
                    <div className="showimages d-flex flex-wrap gap-3">
                    {imgState?.length===0 ?
                                (img?.map((i,j) => {
                                    return (
                                        <div className='position-relative' key={j}>
                                            <div 
                                                onClick={() => dispatch(deleteImg(i?.url))}
                                                className="btn-close position-absolute" 
                                                style={{ top: "10px", right: "10px" }}
                                            ></div>
                                            <img src={i?.url} alt="" width={200} height={200} />
                                        </div>      
                                    )
                                })) :
                                imgState.map((i,j) => {
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
{/* 
                        {
                            imgState.map((i,j) => {
                                return (
                                    <div className='position-relative' key={j}>
                                        <div 
                                            onClick={() => dispatch(deleteImg(i?.public_id))}
                                            className="btn-close position-absolute" 
                                            style={{ top: "10px", right: "10px" }}
                                        ></div>
                                        <img src={i.url} alt="" width={200} height={200} />
                                    </div>      
                                )
                            })
                        } */}
                    </div>
                </div>
                <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>Add Product</button>
            </form>
        </div>
    </div>
  )
}

export default AddProduct