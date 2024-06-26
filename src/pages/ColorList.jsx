import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { deleteAColor, getColors, resetState } from '../features/color/colorSlice';
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

const ColorList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  }, []);

  const colorState = useSelector((state) => state?.color?.colors);

  const data1 = [];
  for (let i = 0 ; i<colorState?.length ; i++) {
      data1.push({
          key: i+1,
          title: colorState[i]?.title,
          action: (
            <div>
              <Link to={`/admin/color/${colorState[i]?._id}`} className='fs-3 text-danger'><BiEdit /></Link>
              <button 
                className='ms-3 fs-3 text-danger bg-transparent border-0'
                onClick={() => showModal(colorState[i]?._id)}
              ><AiFillDelete /></button>
            </div>
          ),
      });
  }

  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setColorId(e);
  }
  const hideModal = () => {
    setOpen(false);
  }

  const deleteColor = (e) => {
    dispatch(deleteAColor(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  }

  return (
    <div>
        <h3 className="mb-4 title">Colors</h3>
        <Table columns={columns} dataSource={data1} />
        <CustomModal 
          title="Are you sure you want to delete this color?"
          hideModal={hideModal}
          performAction={() => {deleteColor(colorId)}}
          open={open} 
        />
    </div>
  )
}

export default ColorList;