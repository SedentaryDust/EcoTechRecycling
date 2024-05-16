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
/**
* 
*somente para a atividade colocarei username e password no local
*  
*/

function formatUser(user){
    if(!user) return user;
    return {...user , password:undefined};

}

export async function loadbyId(id){
    return formatUser(users.find(u=> u.id === id));

}


export async function loadByCred({username, password}){
    return formatUser(users.find(u => 
            u.username === username &&
            u.password === password
        ));
}


export async function singUp ({username,password}){
    if (!username || !password ){
        return null;

    }
        const singup = {id: ((users.length) + 1 ), login:username , password:password ,admin:false};
        users.push(singup);
        return singup;
}


export async function deletebyid(id){

    
    users.splice(users.indexOf(id) , 1);
    return 'done';
}


export async function updatebyid(id,username,password){

   users.map(u => {
    if(u.id === id){
        if(username){
        u.username = username;
        }
        if(password){
        u.password = password
        }
        return null

    }

   })



}