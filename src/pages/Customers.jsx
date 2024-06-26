import React, { useEffect } from 'react';
import { Table } from 'antd';
import { getUsers } from '../features/customers/customerSlice';
import { useDispatch, useSelector } from "react-redux";

const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
];

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const customerState = useSelector((state) => state?.customer?.customers);

  const data1 = [];
  for (let i = 0 ; i<customerState?.length ; i++) {
    if (customerState[i]?.role !== "admin"){
      data1.push({
          key: i+1,
          name: customerState[i]?.firstname + " " + customerState[i]?.lastname,
          email: customerState[i]?.email,
          mobile: customerState[i]?.mobile,
      });
    }
  }

  return (
    <div>
        <h3 className="mb-4 title">Customers</h3>
        <Table columns={columns} dataSource={data1} />
    </div>
  )
}

export default Customers;