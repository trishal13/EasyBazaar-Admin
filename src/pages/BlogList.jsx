import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { deleteABlog, getBlogs, resetState } from '../features/blogs/blogSlice';
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
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
    title: "Blog Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,

  },
  {
    title: "Actions",
    dataIndex: "action",
  },
];

const BlogList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, []);

  const blogState = useSelector((state) => state?.blogs?.blogs);

  const data1 = [];
  for (let i = 0 ; i<blogState?.length ; i++) {
      data1.push({
          key: i+1,
          title: blogState[i]?.title,
          category: blogState[i]?.category,
          action: (
            <div>
              <Link to={`/admin/blog/${blogState[i]?._id}`} className='fs-3 text-danger'><BiEdit /></Link>
              <button
                className='ms-3 fs-3 text-danger bg-transparent border-0'
                onClick={() => showModal(blogState[i]?._id)}
              ><AiFillDelete /></button>
            </div>
          ),
      });
  }

  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBlogId(e);
  }
  const hideModal = () => {
    setOpen(false);
  }

  const deleteBlog = (e) => {
    dispatch(deleteABlog(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 100);
  }

  return (
    <div>
        <h3 className="mb-4 title">Blogs</h3>
        <Table columns={columns} dataSource={data1} />
        <CustomModal 
          title="Are you sure you want to delete this blog?"
          hideModal={hideModal}
          performAction={() => {deleteBlog(blogId)}}
          open={open} 
        />
    </div>
  )
}

export default BlogList;