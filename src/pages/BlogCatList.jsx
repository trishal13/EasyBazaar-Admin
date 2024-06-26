import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { deleteABlogCategory, getCategories, resetState } from '../features/bcategory/bcategorySlice';
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


const BlogCatList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);

  const bCategoryState = useSelector((state) => state?.bCategory?.bCategories);

  const data1 = [];
  for (let i = 0 ; i<bCategoryState?.length ; i++) {
      data1.push({
          key: i+1,
          title: bCategoryState[i]?.title,
          action: (
            <div>
              <Link to={`/admin/blog-category/${bCategoryState[i]?._id}`} className='fs-3 text-danger'><BiEdit /></Link>
              <button
                className='ms-3 fs-3 text-danger bg-transparent border-0'
                onClick={() => showModal(bCategoryState[i]?._id)}
              ><AiFillDelete /></button>
            </div>
          ),
      });
  }

  const [open, setOpen] = useState(false);
  const [bCatId, setBCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBCatId(e);
  }
  const hideModal = () => {
    setOpen(false);
  }

  const deleteBlogCategory = (e) => {
    dispatch(deleteABlogCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  }

  return (
    <div>
        <h3 className="mb-4 title">Blogs Categories</h3>
        <Table columns={columns} dataSource={data1} />
        <CustomModal 
          title="Are you sure you want to delete this blog category?"
          hideModal={hideModal}
          performAction={() => {deleteBlogCategory(bCatId)}}
          open={open} 
        />
    </div>
  )
}

export default BlogCatList;