import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { deleteAProduct, getProducts, resetState } from '../features/product/productSlice';
import CustomModal from '../components/CustomModal';

const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      sorter: (a, b) => a.brand.length - b.brand.length,

    },
    {
      title: "Product Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,

    },
    {
      title: "Color",
      dataIndex: "color",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Actions",
      dataIndex: "action",
    },
];

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state?.product?.products);

  const data1 = [];
  for (let i = 0 ; i<productState?.length ; i++) {
      data1.push({
          key: i+1,
          title: productState[i]?.title,
          brand: productState[i]?.brand,
          category: productState[i]?.category,
          // color not working
          color: productState[i]?.color,
          price: productState[i]?.price,
          action: (
            <div>
              {/* <Link to="/" className='fs-3 text-danger'><BiEdit /></Link> */}
              <button
                className='ms-3 fs-3 text-danger bg-transparent border-0'
                onClick={() => showModal(productState[i]?._id)}
              ><AiFillDelete /></button>
            </div>
          ),
      });
    // }
  }

  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setProductId(e);
  }
  const hideModal = () => {
    setOpen(false);
  }

  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  }

  return (
    <div>
        <h3 className="mb-4 title">Products</h3>
        <Table columns={columns} dataSource={data1} />
        <CustomModal 
          title="Are you sure you want to delete this product?"
          hideModal={hideModal}
          performAction={() => {deleteProduct(productId)}}
          open={open} 
        />
    </div>
  )
}

export default ProductList;