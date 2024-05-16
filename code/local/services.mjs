import {createToken} from '../jwt.mjs';
import {loadbyId ,loadByCred , deletebyid ,updatebyid } from './respository.mjs'


export async function login(login, password){
    const user  = await loadByCred(login, password);

    if (!user) return null;

    return {
        token:createToken(user),
        ...user
    }

}


export async function getUser(id){
    return loadbyId(id);
    
}

export async function delete_user({id}){
    return deletebyid(id);
    
}

export async function update_user(id , user){
    const resp = updatebyid (id,user.username , user.password)

    return null;
}