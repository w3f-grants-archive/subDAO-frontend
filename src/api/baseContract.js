import ConnectContract from './connectContract';
let loadBase = false;
let basecontract;
export default async function baseConnect(state, dispatch)  {

    const {apiState, api, basecontractState} = state;
    let account = JSON.parse(sessionStorage.getItem('account'));
    if (apiState !== 'READY' || account && !account.length) return;
    const asyncLoadbase = async () => {

        try {
            basecontract = await ConnectContract(api, 'base','5GPi6oGcFqmJg9JxWBL7pxthya6xbu54oUQzNdFwdgAuGcMV');
            dispatch({ type: 'SET_BASE', payload: basecontract });
        } catch (e) {
            console.error(e);
            dispatch({ type: 'BASE_ERROR' });
        }
    };
    if (basecontractState!=='LOAD_BASE') return;
    if (loadBase) return dispatch({ type: 'SET_BASE', payload: basecontract });
    loadBase = true;
    asyncLoadbase();
}
