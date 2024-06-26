import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { getOrders, updateAOrder } from '../features/auth/authSlice';

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Actions",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const orderState = useSelector((state) => state.auth.orders.orders);

  const updateOrderStatus = (data) => {
    dispatch(updateAOrder(data));
  }

  const data1 = [];
  for (let i = 0 ; i<orderState?.length ; i++) {
      data1.push({
          key: i+1,
          name: orderState[i]?.user?.firstname,
          product: (
            <Link to={`/admin/orders/${orderState[i]._id}`}>View Orders</Link>
          ),
          mobile: orderState[i]?.mobile,
          amount: orderState[i]?.totalPrice,
          date: new Date(orderState[i]?.createdAt).toLocaleString(),
          action: (
            <div>
              <select 
                defaultValue={orderState[i]?.orderStatus}
                name="" 
                id="" 
                className='form-control form-select'
                onChange={(e) => updateOrderStatus({id: orderState[i]?._id, status: e.target.value})}
              >
                <option value="Ordered" disabled selected>Ordered</option>
                <option value="Processed">Processed</option>
                <option value="Shipped">Shipped</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ),
      });
  }
  return (
    <div>
        <h3 className="mb-4 title">Orders</h3>
        <Table columns={columns} dataSource={data1} />
    </div>
  )
}

export default Orders