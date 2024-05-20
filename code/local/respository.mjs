import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import {decode} from '../jwt.mjs'

dotenv.config();


const prisma = new PrismaClient();

async function formatUser(user) {
    if (!user) return user;
    return { ...user, password: undefined };
}

export async function loadbyId(id) {
    const user = await prisma.user.findUnique({
        where: { id }
    });
    return formatUser(user);
    
}

export async function changeRoleTo(req){

        const {CPF , address , userRole} = req.body;

        const {user} = decode(req.headers.authorization);

        if (userRole == "DOADOR"){
           return changeRoleToDonator(user.id , {CPF , address , userRole})
        }
        return changeRoleToCollector(user.id , {CPF , address , userRole})
}

export async function changeRoleToDonator(id , {CPF , address , userRole}){
        const updated = updateRole(id , userRole);
        const user = await prisma.donor.create({
            data: {
                userId : id,

                additionalInfoDonor : address

            }
        })
        deleteColectorById(id);
        return user;
}

export async function changeRoleToCollector(id , {CPF , address}){
    const updated = updateRole(id);
    const user = await prisma.collector.create({
        data: {
            userId : id,
            CPF : CPF,
            additionalInfoCollector : address

        }
    })
    deleteDonorById(id);
    return user;
}

export async function loadByCred({ username, password }) {
    const user = await prisma.user.findFirst({
        where: { username, password }
    });
    return formatUser(user);
}

export async function singUp({ username, email, password }) {
    if (!username || !password || !email) {
        return null;
    }


    const newUser = await prisma.user.create({
        data: { 
            username: username,
            email: email,
            password: password, 
            userType: "DOADOR"
        }
    });

    makeBasicRelation(newUser.id)  
    return formatUser(newUser);
}

export async function deletebyid(auth) {
    const account = decode(auth);
    const id = account.id;
    await prisma.user.delete({
        where: { id }
    });
    return 'done';
}

async function deleteDonorById(id){
    await prisma.donor.delete({
        where: { userId : id }
    });
    return 'done';
}

async function deleteColectorById(id){
    await prisma.collector.delete({
        where: { userId : id }
    });
    return 'done';
}

async function makeBasicRelation(id ,userType ,additionalInfoCollector){
    await prisma.donor.create({
        data:{
            userId: id,
            additionalInfoDonor: additionalInfoCollector ? additionalInfoCollector : "none"
        }
    })
}

export async function updatebyid(id, { username, password }) {
    const updateData = {};
    if (username) {
        updateData.login = username;
    }
    if (password) {
        updateData.password = password;
    }
    const updatedUser = await prisma.user.update({
        where: { id },
        data: updateData
    });
    return formatUser(updatedUser);
}

async function updateRole(id , userRole){
    const updateUser = await prisma.user.update({
        where: { id } , 
        data : {userType : userRole}
    });
    return updateUser;
}
