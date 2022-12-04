import React from 'react'
import './RegisteredUsers.css'
import NavBar from "../NavBar/Navbar"
import { useTranslation } from "react-i18next";
import FeedSidebar from "../Feed/FeedSidebar"
import Table from "react-bootstrap/Table";

const RegisteredUsers = () => {
    const { t } = useTranslation();

    return(
        <div className='roles_main'>
            <NavBar />
            <FeedSidebar />
            <div className='roles_main_scroll'>
            <div className="menuTabs">
                <div className="lower">
                    <div className="lower_header">
                        <div>
                            <h4>Regsitered Users</h4>
                            <p>Last added on 24/01/2022</p>
                        </div>
                        <button>Download Report</button>
                    </div>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>{t("no")}</th>
                                <th>ID</th>
                                <th>Role</th>
                                <th>Name</th>
                                <th>Registration Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>001</td>
                                <td>Restaurant</td>
                                <td>Kirn aweson</td>
                                <td>26/6/22</td>
                                <td className='status_red'>Pending</td>
                                <td>...</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>001</td>
                                <td>Restaurant</td>
                                <td>Kirn aweson</td>
                                <td>26/6/22</td>
                                <td className='status_green'>Registered</td>
                                <td>...</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>001</td>
                                <td>Restaurant</td>
                                <td>Kirn aweson</td>
                                <td>26/6/22</td>
                                <td className='status_red'>Pending</td>
                                <td>...</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>001</td>
                                <td>Restaurant</td>
                                <td>Kirn aweson</td>
                                <td>26/6/22</td>
                                <td className='status_green'>Registered</td>
                                <td>...</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>001</td>
                                <td>Restaurant</td>
                                <td>Kirn aweson</td>
                                <td>26/6/22</td>
                                <td className='status_red'>Pending</td>
                                <td>...</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>001</td>
                                <td>Restaurant</td>
                                <td>Kirn aweson</td>
                                <td>26/6/22</td>
                                <td className='status_green'>Registered</td>
                                <td>...</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>001</td>
                                <td>Restaurant</td>
                                <td>Kirn aweson</td>
                                <td>26/6/22</td>
                                <td className='status_red'>Pending</td>
                                <td>...</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>001</td>
                                <td>Restaurant</td>
                                <td>Kirn aweson</td>
                                <td>26/6/22</td>
                                <td className='status_green'>Registered</td>
                                <td>...</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>001</td>
                                <td>Restaurant</td>
                                <td>Kirn aweson</td>
                                <td>26/6/22</td>
                                <td className='status_red'>Pending</td>
                                <td>...</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>001</td>
                                <td>Restaurant</td>
                                <td>Kirn aweson</td>
                                <td>26/6/22</td>
                                <td className='status_green'>Registered</td>
                                <td>...</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
            </div>
        </div>
    )
}

export default RegisteredUsers