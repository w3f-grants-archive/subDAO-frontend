import React, {useEffect, useState} from 'react';
import VoteEcharts from "./voteEcharts";
import api from "../../api";
import {useSubstrate} from "../../api/contracts";
import Left from "../left";
import Back from "../../images/prev.png";
import {useTranslation} from "react-i18next";

export default function VoteOverview (props){
    const {state} = useSubstrate();
    const {votecontract} = state;
    const [voteid, setvoteid] = useState(null);
    const [title, settitle] = useState('');
    const [desc, setdesc] = useState('');
    const [support, setsupport] = useState('');
    const [min, setmin] = useState('');
    const [toaddress, settoaddress] = useState('');
    const [optionlist, setoptionlist] = useState([]);

    let { t } = useTranslation();

    const handleClicktoVote = () => {
       props.history.push(`/vote/${props.match.params.id}`)
    }
    useEffect(() => {
        const setOneVote = async() => {
            await api.vote.queryOneVote(votecontract, props.match.params.voteid).then(data => {
                if (!data) return;


                const {
                    vote_id, title, desc, support_require_num, min_require_num, choices, to_address
                } = data;
                settitle(title);
                setvoteid(vote_id);
                setdesc(desc);
                settoaddress(to_address);
                setsupport(support_require_num);
                setmin(min_require_num);
                let arr = [], afterArr = [];
                arr = choices.split('|');
                arr.map((i, index) => {
                    let obj = i.split(":");
                    afterArr[index] = {
                        value: obj[1] ? parseInt(obj[1]) : 0,
                        name: obj[0]
                    };
                    return i;
                });
                if (afterArr.length) {
                    setoptionlist(afterArr);
                }

            });
        };

        setOneVote();
    }, []);

    return (
        <div>
            <section>
                <div className="row">
                        <div className="col-lg-3">
                            <Left />
                        </div>
                        <div className="col-lg-9">
                            <div className='voteTop mt10'>
                                <div className='voteLft' onClick={handleClicktoVote}>
                                    <img src={Back} alt=""/> {t('Back')}
                                </div>
                            </div>
                            <div className="row">
                                <div className='col-lg-4 bg overView'>
                                    <ul>
                                        <li>
                                            <h6>{t('Title')}</h6>
                                            <div>{title}</div>
                                        </li>
                                        <li>
                                            <div>{voteid}</div>
                                            <h6>{t('VotingNumber')}</h6>
                                        </li>

                                        <li>
                                            <div>{support}</div>
                                            <h6>{t('supportnumber')}</h6>
                                        </li>
                                        <li>
                                            <div>{min}</div>
                                            <h6>{t('minnumber')}</h6>
                                        </li>
                                        <li>
                                            <div>{min}</div>
                                            <h6>{t('Amount')}</h6>
                                        </li>
                                        <li>
                                            <h6>{t('ReceiverAddress')}</h6>
                                            <div className='address'>{desc}</div>
                                        </li>
                                        <li>
                                            <h6>{t('VotingDescription')}</h6>
                                            <div>{desc}</div>
                                        </li>
                                    </ul>
                                </div>
                                <div className='col-lg-8 bg'>
                                    {
                                        !!optionlist.length&&<VoteEcharts optionlist={optionlist} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            </section>

        </div>
    )

}
