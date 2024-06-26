import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { getOrder, getOrders } from '../features/auth/authSlice';

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },  
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
];

const ViewOrder = () => {
    const location = useLocation();
    const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder(orderId));
  }, []);
  const orderState = useSelector((state) => state?.auth?.singleOrder?.orders);

  const data1 = [];
      for (let i=0 ; i<orderState?.orderItems?.length ; i++) {
          data1.push({
              key: i+1,
              name: orderState?.orderItems[i]?.product.title,
              brand: orderState?.orderItems[i]?.product?.brand,
              count: orderState?.orderItems[i]?.quantity,
              color: orderState?.orderItems[i]?.color?.title,
              amount: orderState?.orderItems[i]?.price,
          });
      }
  return (
    <div>
        <h3 className="mb-4 title">View Order</h3>
        <Table columns={columns} dataSource={data1} />
    </div>
  )
}

export default ViewOrder;