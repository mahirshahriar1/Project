import React from 'react'
//eslint-disable-next-line
import Sidenav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';


export default function Mysidenav() {
    const navigate = useNavigate();


    const [sellerStatus, setsellerStatus] = useState(false);
    const [username, setUsername] = useState("");
    Axios.defaults.withCredentials = true;

    useEffect(() => {

        Axios.get('http://localhost:3001/sellerlogin').then((response) => {
            // console.log(response.data.loggedIn);
            if (response.data.loggedIn === true && response.data.user[0].Type === 'Seller') {
                setsellerStatus(true);
                setUsername(response.data.user[0].Username);

            }
        });

    }, []);

    return (
        <div  >

            <Sidenav style={{ background: '#2c3e50', position: 'fixed' }}
                onSelect={(selected) => {
                    console.log(selected);
                    if (selected !== '')
                        navigate('/' + selected);
                    else navigate('/');
                }}
            >
                <Sidenav.Toggle />
                <Sidenav.Nav defaultSelected="home">
                    <NavItem eventKey=''   >
                        <NavIcon> <i className='fa fa-fw fa-home' style={{ fontsize: "1.5em" }}></i> </NavIcon>
                        <NavText>
                            Home
                        </NavText>
                    </NavItem>
                    <NavItem eventKey='messages'>
                        <NavIcon> <i className='fa fa-fw fa-message' style={{ fontsize: "1.5em" }}></i> </NavIcon>
                        <NavText>
                            Messages
                        </NavText>
                    </NavItem>
                    {sellerStatus && <NavItem eventKey='menus' >
                        <NavIcon><i className='fa fa-fw fa-bars' style={{ fontsize: "1.5em" }}></i> </NavIcon>
                        <NavText style={{ background: 'black' }} >
                            Upload Product

                        </NavText>
                        <NavItem eventKey='addBooks'>
                            <NavText >
                                Books
                            </NavText>
                        </NavItem>
                        <NavItem>
                            <NavText>
                                Electronics
                            </NavText>
                        </NavItem>
                        <NavItem>
                            <NavText>
                                Cosmetics
                            </NavText>
                        </NavItem>
                        <NavItem>
                            <NavText>
                                Clothes
                            </NavText>
                        </NavItem>

                    </NavItem>
                    }


                </Sidenav.Nav>

            </Sidenav>
        </div>
    )
}
