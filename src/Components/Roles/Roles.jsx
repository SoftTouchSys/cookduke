import React from 'react'
import './Roles.css'
import NavBar from "../NavBar/Navbar"
import { useTranslation } from "react-i18next";
import FeedSidebar from "../Feed/FeedSidebar"
import Table from "react-bootstrap/Table";

const Roles = () => {
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
                            <h4>Roles</h4>
                            <p>Last added on 24/01/2022</p>
                        </div>
                        <button>+ Create Role</button>
                    </div>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>{t("no")}</th>
                                <th>ID</th>
                                <th>Role</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Access</th>
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
                                <td>Full Access</td>
                                <td>...</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>001</td>
                                <td>Restaurant</td>
                                <td>Kirn aweson</td>
                                <td>26/6/22</td>
                                <td>Full Access</td>
                                <td>...</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>001</td>
                                <td>Restaurant</td>
                                <td>Kirn aweson</td>
                                <td>26/6/22</td>
                                <td>Full Access</td>
                                <td>...</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>001</td>
                                <td>Restaurant</td>
                                <td>Kirn aweson</td>
                                <td>26/6/22</td>
                                <td>Full Access</td>
                                <td>...</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>001</td>
                                <td>Restaurant</td>
                                <td>Kirn aweson</td>
                                <td>26/6/22</td>
                                <td>Full Access</td>
                                <td>...</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>001</td>
                                <td>Restaurant</td>
                                <td>Kirn aweson</td>
                                <td>26/6/22</td>
                                <td>Full Access</td>
                                <td>...</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>001</td>
                                <td>Restaurant</td>
                                <td>Kirn aweson</td>
                                <td>26/6/22</td>
                                <td>Full Access</td>
                                <td>...</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>001</td>
                                <td>Restaurant</td>
                                <td>Kirn aweson</td>
                                <td>26/6/22</td>
                                <td>Full Access</td>
                                <td>...</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>001</td>
                                <td>Restaurant</td>
                                <td>Kirn aweson</td>
                                <td>26/6/22</td>
                                <td>Full Access</td>
                                <td>...</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>001</td>
                                <td>Restaurant</td>
                                <td>Kirn aweson</td>
                                <td>26/6/22</td>
                                <td>Full Access</td>
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

export default Roles