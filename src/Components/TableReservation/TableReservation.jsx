import React, { useEffect, useState } from 'react'
import './TableReservation.css'
import NavBar from "../NavBar/Navbar"
import { useTranslation } from "react-i18next";
import RestaurantSidebar from '../Dashboards/RestaurantDashboard/RestaurantSidebar';
import Table from "react-bootstrap/Table";
import { ImCross, ImCheckmark } from "react-icons/im";
import { useSelector } from 'react-redux';
import axiosInstance from '../../helper/axios';
import moment from 'moment';

const TableReservation = () => {

    const { t } = useTranslation();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
    if (!token && userInfo?.user?.role !== "restaurant") {
        window.location = "/";
    }

    const [reserve, setReserve] = useState('')

    useEffect(() => {
        axiosInstance.get('/get-reservation').then((res) => {
            setReserve(res.data.reservation)
        })
    }, [reserve])

    const setStatusOfTable = (id)=>{
        var data={
          reserveId:id,
          status:"completed"
        }
        // console.log(data)
        axiosInstance.post('update-reservation',data)
    }

    const cancelOfTable =(id)=>{
        var data={
            reserveId:id,
            status:"canceledByRestaurant"
          }
          // console.log(data)
          axiosInstance.post('update-reservation',data)
    }

    return (
        <div className='tablereservation_main'>
            <NavBar />
            <RestaurantSidebar />
            <div className='tablereservation_main_scroll'>
                <h3 className='tablereservation_main_heading'>Table Reservation</h3>
                <Table striped>
                    <thead>
                        <tr>
                            <th>{t("no")}</th>
                            <th>{t("id")}</th>
                            <th>{t("T_name")}</th>
                            <th>{t("date_text")}</th>
                            <th>{t("time")}</th>
                            <th>{t("guests")}</th>
                            <th>{t("status")}</th>
                            <th>{t("action")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reserve?.length > 0 ? reserve?.map((obj, i) => {
                            return <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{obj?.reservationNumber}</td>
                                <td>{obj?.user?.firstName} {obj?.user?.lastName}</td>
                                <td>{obj?.bookDate}</td>
                                <td>{obj?.time}</td>
                                <td>{obj?.guest} people</td>
                                <td><p 
                                className={`badge badge-${obj?.status === "processing" ? "warning" : obj?.status === "canceledByUser" ? "danger" : obj?.status === "completed" ? "success" : obj?.status === "canceledByRestaurant" ? "danger" : "danger"} text-capitalize`}>
                                    {obj?.status}
                                </p></td>
                                <td className='tablereservation_mark_icons'>
                                    {obj?.status !== "completed" && obj?.status !== "canceledByRestaurant" && obj?.status !== "canceledByUser" &&<div onClick={()=>setStatusOfTable(obj?._id)}><ImCheckmark /></div>}
                                    {obj?.status !== "completed" && obj?.status !== "canceledByRestaurant" && obj?.status !== "canceledByUser" && <div onClick={()=>cancelOfTable(obj?._id)} ><ImCross /></div>}
                                </td>
                            </tr>
                        })
                            : <p>No Record Found</p>}


                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default TableReservation