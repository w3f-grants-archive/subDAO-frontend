import { ContractPromise } from '@polkadot/api-contract';

// 3.0
import mainAbi from '../abi/release3/main_v0.1';

import baseAbi from '../abi/release3/base_v0.1';

import erc20Abi from '../abi/release3/erc20_v0.1';

import orgAbi from '../abi/release3/org_v0.1';

import vaultAbi from '../abi/release3/vault_v0.1';

import voteAbi from '../abi/release3/vote_manager_v0.1';

import daoManagerAbi from '../abi/release3/dao_manager_v0.1';

import authAbi from '../abi/release3/auth_v0.1';


const ConnectContract = async (api,type,address) =>{
    if(!api){
      return
    }
    let abi;
    switch(type){

        case'base':
            abi = baseAbi;
            break;
        case'erc20':
            abi = erc20Abi;
            break;
        case'org':
            abi = orgAbi;
            break;
        case'vault':
            abi = vaultAbi;
            break;
        case'vote':
            abi = voteAbi;
            break;
        case'daoManager':
            abi = daoManagerAbi;
            break;
        case'auth':
            abi = authAbi;
            break;
        default:
        case'main':
            abi = mainAbi;
            break;

    }
    const mainContract = new ContractPromise(api, abi, address);
    return mainContract;
  }

export default ConnectContract
