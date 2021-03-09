import React, {useEffect, useState} from 'react';
import PageBackground from "../pagebackground";
import {Button} from "react-bootstrap";
import ManageItem from "./manageItem";
import api from "../../api";
import {useSubstrate} from "../../api/contracts";

export default function OrgManage(props){

    const {state,dispatch} = useSubstrate();
    const {orgcontract} = state;


    const [id, setId] = useState(null);
    const [moderators, setModerators] = useState(false);
    const [members, setMembers] = useState(false);
    const [showModalmoderators, setShowModalmoderators] = useState(false);
    const [showModalmembers, setShowModalmembers] = useState(false);
    const [showAddmoderators, setShowAddmoderators] = useState(false);
    const [showAddmembers, setShowAddmembers] = useState(false);
    const [showAddMember, setShowAddmember] = useState(false);
    const [addModerator, setaddModerator] = useState(false);
    const [addMember, setaddMember] = useState(false);
    const [logo, setLogo] = useState('');
    const [memberlist, setMemberlist] = useState([]);
    const [checklist, setChecklist] = useState([]);

    useEffect(() => {
        if(addModerator){
            props.history.push(`/org/${id}`)
        }
    }, [addModerator]);
    useEffect(() => {
        if(addMember){
            props.history.push(`/org/${id}`)
        }
    }, [addMember]);
    useEffect(() => {
        setId(props.match.params.id)
        let logo = sessionStorage.getItem('logo');
        setLogo(logo);
    }, []);
    useEffect(async () => {

        await api.org.getDaoModeratorList(orgcontract).then(data => {
            if (!data) return;
            setChecklist(data)
        });
        await api.org.getDaoMembersList(orgcontract).then(data => {
            if (!data) return;
            setMemberlist(data)
        });
    }, [orgcontract]);

    const handleClicktoview = async (item,type) =>{
        // let {voteid} = this.state;
        // this.props.history.push(`/voteView/${id}/${voteid}`)

        let obj={
            name:'Alice',
            address:item[0]
        }
        if(type==='moderators'){

            await api.org.removeDaoModerator(orgcontract,obj,function (result) {
                setaddModerator(result)
            }).then(data => {
                if (!data) return;

            });
        }else if(type==='members'){

            await api.org.removeDaoMember(orgcontract,obj,function (result) {
                setaddMember(result)
            }).then(data => {
                if (!data) return;

            });
        }
    }

    const isAllChecked = (e) => {
        const name = e.target.id;
        const listname = e.target.dataset.list;

        let values= eval(name);
        let listobj =  eval(listname);

            if (name === 'moderators') {
                setModerators(!values)
            } else if (name === 'members') {
                setMembers(!values)
            }
            listobj.map((item) => {
                item.checked = !values;
            })

        if (listname === 'checklist') {
            setChecklist([...listobj])
        } else if (name === 'memberlist') {
            setMemberlist([...listobj])
        }
    }

    const isChecked = (e, obj) =>{
        let currentbool = e.target.checked;
        const name = e.target.dataset.type;
        const listname = e.target.dataset.list;

        if(!currentbool){
            if (name === 'moderators') {
                setModerators(false)
            } else if (name === 'members') {
                setMembers(false)
            }
        }


        let listobj =  eval(listname);

        listobj.map(item => {
            if (item.id === obj.id) {
                item.checked = currentbool
            }
        });

        if (listname === 'checklist') {
            setChecklist([...listobj])
        } else if (name === 'memberlist') {
            setMemberlist([...listobj])
        }
    }

    const delConfirm = (name) => {
        if(name==="showModalmoderators"){
            setShowModalmoderators(true)
        }else if(name==="showModalmembers"){
            setShowModalmembers(true)
        }
    }

    const addModerators = (name) => {
        if(name==="showAddmoderators"){
            setShowAddmoderators(!showAddmoderators)
        }else if(name==="showAddmembers"){
            setShowAddmembers(!showAddmembers)
        }

    }
    const handleClicktoOrg = () => {
       props.history.push(`/org`)
    }
    const submitModerators = async (obj) =>{

        await api.org.addDaoModerator(orgcontract,obj,function (result) {
            setaddModerator(result)
        }).then(data => {
            if (!data) return;

        });

    }
 const submitMembers = async (obj) =>{
     await api.org.addDaoMember(orgcontract,obj,function (result) {
         setaddMember(result)
     }).then(data => {
         if (!data) return;
         console.log(data)
     });
    }


        return <div>
            <section>
                <PageBackground/>
                <div className="container">
                    <div className="bgwhite row">
                        <div className='col-lg-4 bg'>
                            <div>
                                <img src={logo} alt=""/>
                            </div>
                            <div className='brdr '>
                                <Button variant="outline-primary" onClick={handleClicktoOrg}>Back</Button>
                            </div>
                        </div>
                        <div className='col-lg-8'>
                            <ul className="manage">
                                <li>
                                    <h6>Moderators</h6>
                                    <ManageItem
                                        list={checklist}
                                        chooseAll={moderators}
                                        type='moderators'
                                        isChecked={isChecked}
                                        listname={'checklist'}
                                        isAllChecked={isAllChecked}
                                        handleClicktoview={handleClicktoview}
                                        showModal={showModalmoderators}
                                        showAdd={showAddmoderators}
                                        handleSubmit={submitModerators}
                                        handleClose={()=>setShowModalmoderators(false)}
                                        addModerators={()=>addModerators('showAddmoderators')}
                                        delConfirm={()=>delConfirm('showModalmoderators')}
                                    />
                                </li>
                                <li>
                                    <h6>Members</h6>
                                    <ManageItem
                                        list={memberlist}
                                        listname={'memberlist'}
                                        chooseAll={members}
                                        type='members'
                                        isChecked={isChecked}
                                        isAllChecked={isAllChecked}
                                        handleClicktoview={handleClicktoview}
                                        showModal={showModalmembers}
                                        showAdd={showAddmembers}
                                        handleClose={()=>setShowModalmembers(false)}
                                        handleSubmit={submitMembers}
                                        addModerators={()=>addModerators('showAddmembers')}
                                        delConfirm={()=>delConfirm('showModalmembers')}
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

        </div>;

}
