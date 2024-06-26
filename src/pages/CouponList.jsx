import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { deleteACoupon, getAllCoupons, resetState } from '../features/coupon/couponSlice';
import CustomModal from '../components/CustomModal';

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name - b.name,
  },
  {
    title: "Discount",
    dataIndex: "discount",
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: "Expiry Date",
    dataIndex: "expiry",
    sorter: (a, b) => a.expiry - b.expiry,
  },
  {
    title: "Actions",
    dataIndex: "action",
  },
];

const CouponList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllCoupons());
  }, []);

  const couponState = useSelector((state) => state?.coupon?.coupons);

  const data1 = [];
  for (let i = 0 ; i<couponState?.length ; i++) {
      data1.push({
          key: i+1,
          name: couponState[i]?.name,
          discount: couponState[i]?.discount,
          expiry: new Date(couponState[i]?.expiry).toLocaleString(),
          action: (
            <div>
              <Link to={`/admin/coupon/${couponState[i]?._id}`} className='fs-3 text-danger'><BiEdit /></Link>
              <button 
                className='ms-3 fs-3 text-danger bg-transparent border-0'
                onClick={() => showModal(couponState[i]?._id)}
              ><AiFillDelete /></button>
            </div>
          ),
      });
  }

  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setCouponId(e);
  }
  const hideModal = () => {
    setOpen(false);
  }

  const deleteCoupon = (e) => {
    dispatch(deleteACoupon(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllCoupons());
    }, 100);
  }

  return (
    <div>
        <h3 className="mb-4 title">Coupons</h3>
        <Table columns={columns} dataSource={data1} />
        <CustomModal 
          title="Are you sure you want to delete this coupon?"
          hideModal={hideModal}
          performAction={() => {deleteCoupon(couponId)}}
          open={open} 
        />
    </div>
  )
}

export default CouponList;