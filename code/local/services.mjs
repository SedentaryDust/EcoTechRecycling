import {createToken} from '../jwt.mjs';
import {loadbyId ,loadByCred , deletebyid ,updatebyid,changeRoleTo } from './respository.mjs'


export async function login(login, password){
    const user  = await loadByCred(login, password);
    //console.log(user)
    if (!user) return null;

    return {
        token: await createToken(user),
        ...user
    }

}

export async function changeRole(req){
    //console.log(req.user.id)
    return changeRoleTo(req);


}

export async function getUser(id){
    return loadbyId(id);
    
}

export async function delete_user(auth){
    return deletebyid(auth);
    
}

export async function update_user(id , user){
    const resp = updatebyid (id,user.username , user.password)

    return null;
}