import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { deleteAProductCategory, getCategories, resetState } from '../features/pcategory/pcategorySlice';
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
    title: "Actions",
    dataIndex: "action",
  },
];


const CategoryList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);
  const pCategoryState = useSelector((state) => state?.pCategory?.pCategories);

  const data1 = [];
  for (let i = 0 ; i<pCategoryState?.length ; i++) {
      data1.push({
          key: i+1,
          title: pCategoryState[i]?.title,
          action: (
            <div>
              <Link to={`/admin/category/${pCategoryState[i]?._id}`} className='fs-3 text-danger'><BiEdit /></Link>
              <button
                className='ms-3 fs-3 text-danger bg-transparent border-0'
                onClick={() => showModal(pCategoryState[i]?._id)}
              ><AiFillDelete /></button>
            </div>
          ),
      });
  }

  const [open, setOpen] = useState(false);
  const [pCatId, setPCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setPCatId(e);
  }
  const hideModal = () => {
    setOpen(false);
  }

  const deleteProductCategory = (e) => {
    dispatch(deleteAProductCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  }

  return (
    <div>
        <h3 className="mb-4 title">Product Categories</h3>
        <Table columns={columns} dataSource={data1} />
        <CustomModal 
          title="Are you sure you want to delete this product category?"
          hideModal={hideModal}
          performAction={() => {deleteProductCategory(pCatId)}}
          open={open} 
        />
    </div>
  )
}

export default CategoryList;