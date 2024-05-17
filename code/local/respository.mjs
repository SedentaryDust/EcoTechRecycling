import { PrismaClient } from '@prisma/client';


/**
* 

* MOCK para testes
*  
*/

let users = [
    {id:1 ,username:"MyName" , password:"Str0ngP@33worD", titutlo: '123' , data: '123' , hora:"19:45" , endereco:{
            logradouro:"rua logo ali 923",
            cidade:"curitiba",
            estado:"Parana"
    }, status:"closed" , descricao:"de arromba"},
    {id:2  , username:"321" , password:"321", titutlo: '321' , data: '321' , hora:"19:45" , endereco:{
            logradouro:"rua do outro lado 923",
            cidade:"curitiba",
            estado:"Parana"
        }, status:"closed" , descricao:"de arromba"},
    {id:3 , username:"joseph" , password:"me" , admin:false}
    


];


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

export async function loadByCred({ username, password }) {
    const user = await prisma.user.findFirst({
        where: { username, password }
    });
    return formatUser(user);
}

export async function singUp({ username, password }) {
    if (!username || !password) {
        return null;
    }

    const newUser = await prisma.user.create({
        data: { username: username, 
                password: password, 
                }
    });
    return formatUser(newUser);
}

export async function deletebyid(id) {
    await prisma.user.delete({
        where: { id }
    });
    return 'done';
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
