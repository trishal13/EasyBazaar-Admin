import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { deleteAEnquiry, getEnquiries, resetState, updateAEnquiry } from '../features/enquiry/enquirySlice';
import CustomModal from '../components/CustomModal';

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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Actions",
    dataIndex: "action",
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, []);

  const enquiryState = useSelector((state) => state?.enquiry?.enquiries);

  const setEnqStatus = (e, id) => {
    const data = { id: id, status: e }
    dispatch(updateAEnquiry(data));
  }

  const data1 = [];
  for (let i = 0 ; i<enquiryState?.length ; i++) {
      data1.push({
          key: i+1,
          name: enquiryState[i]?.name,
          email: enquiryState[i]?.email,
          mobile: enquiryState[i]?.mobile,
          status: (
            <div>
              <select 
                name="" 
                id="" 
                defaultValue={enquiryState[i]?.status} 
                className='form-control form-select'
                onChange={(e) => setEnqStatus(e.target.value, enquiryState[i]?._id)}
              >
                  <option value="Submitted">Submitted</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
              </select>
            </div>
          ),
          action: (
            <div>
              <Link to={`/admin/enquiries/${enquiryState[i]?._id}`} className='ms-3 fs-3 text-danger'><AiOutlineEye /></Link>
              <button 
                className='ms-3 fs-3 text-danger bg-transparent border-0'
                onClick={() => showModal(enquiryState[i]?._id)}
              ><AiFillDelete /></button>
            </div>
          ),
      });
  }

  const [open, setOpen] = useState(false);
  const [enqId, setEnqId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setEnqId(e);
  }
  const hideModal = () => {
    setOpen(false);
  }

  const deleteEnquiry = (e) => {
    dispatch(deleteAEnquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  }

  return (
    <div>
        <h3 className="mb-4 title">Enquiries</h3>
        <Table columns={columns} dataSource={data1} />
        <CustomModal 
          title="Are you sure you want to delete this enquiry?"
          hideModal={hideModal}
          performAction={() => {deleteEnquiry(enqId)}}
          open={open} 
        />
    </div>
  )
}

export default Enquiries;