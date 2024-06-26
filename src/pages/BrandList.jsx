import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { deleteABrand, getBrands, resetState } from '../features/brand/brandSlice';
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

const BrandList = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, []);

  const brandState = useSelector((state) => state?.brand?.brands);

  const data1 = [];
  for (let i = 0 ; i<brandState?.length ; i++) {
      data1.push({
          key: i+1,
          title: brandState[i]?.title,
          action: (
            <div>
              <Link to={`/admin/brand/${brandState[i]?._id}`} className='fs-3 text-danger'><BiEdit /></Link>
              <button 
                className='ms-3 fs-3 text-danger bg-transparent border-0'
                onClick={() => showModal(brandState[i]?._id)}
              ><AiFillDelete /></button>
            </div>
          ),
      });
  }

  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBrandId(e);
  }
  const hideModal = () => {
    setOpen(false);
  }

  const deleteBrand = (e) => {
    dispatch(deleteABrand(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
  }

  return (
    <div>
        <h3 className="mb-4 title">Brands</h3>
        <Table columns={columns} dataSource={data1} />
        <CustomModal 
          title="Are you sure you want to delete this brand?"
          hideModal={hideModal}
          performAction={() => {deleteBrand(brandId)}}
          open={open} 
        />
    </div>
  )
}

export default BrandList;