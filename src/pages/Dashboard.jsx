import React from 'react';
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getMonthlyData, getOrders, getYearlyData } from '../features/auth/authSlice';
import { useState } from 'react';

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
    title: "Product Count",
    dataIndex: "product",
  },
  {
    title: "Total Price",
    dataIndex: "price",
  },
  {
    title: "Total Price After Discount",
    dataIndex: "dprice",
  },
  {
    title: "Status",
    dataIndex: "staus",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();

  const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
  const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
  const orderState = useSelector((state) => state?.auth?.orders?.orders);

  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);
  const [orderData, setOrderData] = useState([]);

  let monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    dispatch(getMonthlyData());
    dispatch(getYearlyData());
    dispatch(getOrders());
  }, []);

  console.log(orderState);

  useEffect(() => {
    let data = [];
    let monthlyOrderCount = [];
    for (let i=0 ; i<monthlyDataState?.length ; i++){
      data.push({
        type: monthNames[monthlyDataState[i]?._id?.month],
        income: monthlyDataState[i]?.amount,
      });
      monthlyOrderCount.push({
        type: monthNames[monthlyDataState[i]?._id?.month],
        sales: monthlyDataState[i]?.count,
      });
    }
    setDataMonthlySales(monthlyOrderCount);
    setDataMonthly(data);
    let data1 = [];
    for (let i=0 ; i<orderState?.length ; i++) {
      data1.push({
        key: i,
        name: `${orderState[i]?.user?.firstname} ${orderState[i]?.user?.lastname}`,
        product: orderState[i]?.orderItems?.length,
        price: orderState[i]?.totalPrice,
        dprice: orderState[i]?.totalPriceAfterDiscount,
        staus: orderState[i]?.orderStatus,
      });
    }
    setOrderData(data1);
  }, [monthlyDataState, yearlyDataState]);

  const config = {
    data: dataMonthly,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  const config2 = {
    data: dataMonthlySales,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };

  return (
    <div>
      <h3 className='mb-4 title'>Dashboard</h3>
      <div className='d-flex justify-content-between align-items-center gap-3'>
        <div className='d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc'>Total Income</p>
            <h4 className='mb-0 sub-title'>Rs. {yearlyDataState && yearlyDataState[0]?.amount}</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <p className='mb-0 desc'>Income in last year from today</p>
          </div>
        </div>
        <div className='d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc'>Total Sales</p>
            <h4 className='mb-0 sub-title'>{yearlyDataState && yearlyDataState[0]?.count}</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <p className='mb-0 desc'>Sales in last year from today</p>
          </div>
        </div>
      </div>

      <div className='d-flex justify-content-between gap-3'>
        <div className='mt-4 flex-grow-1 w-50'>
          <h3 className='mb-5 title'>Income Statics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>

        <div className='mt-4 flex-grow-1 w-50'>
          <h3 className='mb-5 title'>Sales Statics</h3>
          <div>
            <Column {...config2} />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={orderData} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;