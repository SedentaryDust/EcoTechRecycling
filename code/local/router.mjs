import { login  , getUser , delete_user,update_user, changeRole} from "./services.mjs";
import { singUp } from "./respository.mjs";


/**
 * @openapi
 * /evento/login:
 *   post:
 *     summary: "Logs in the user"
 * 
 *     tags:
 *       - "auth"
 *     
 *     operationId: user_login
 *     x-eov-operation-handler: local/router
 * 
 *     requestBody:
 *       description: Login information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UsernamePassword" 
 * 
 *     responses:
 *       '200':
 *         description: "User logged in"
 *       '400':
 *         description: "Invalid data provided"
 *       '401':
 *         description: "Login failed"
 */
export async function user_login(req, res, _){
    const user  = await login(req.body);

    return user ? res.send(`usuario autenticado com o token "${user.token}  + ${user.id}"`) : res.sendStatus(401);

}
/**
 * @openapi
 * 
 * /evento/change:
 *   post:
 *     tags:
 *       - "Transform the user Class to the chosed"
 * 
 *     summary: "Retrives user info by id"
 * 
 *     operationId: transformUserRole
 *     requestBody:
 *       description: Login information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/RoleInfo" 
 *     x-eov-operation-handler: local/router
 *     responses:
 *       '200':
 *         description: "get the user Id info"
 *         
 *       '404':
 *         description: "User not found"
 *     security: 
 *       - {}
 *       - JWT: ['USER']
 *
 */

export async function transformUserRole(req, res, _) {  
    //if(!req.user) return res.send("Authorized Users Only");
    //console.log(req)
    const user = changeRole(req);
    return user ? res.sendStatus(200) : res.sendStatus(404);  
}
/**
 * @openapi
 * /evento/sigup:
 *   post:
 *     summary: "Logs in the user"
 * 
 *     tags:
 *       - "Signup"
 *     
 *     operationId: singup
 *     x-eov-operation-handler: local/router
 * 
 *     requestBody:
 *       description: Create New User
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User" 
 * 
 *     responses:
 *       '200':
 *         description: "User logged in"
 *       '400':
 *         description: "Invalid data provided"
 *       '401':
 *         description: "Login failed"
 */

export async function singup(req, res, _){

    const new_user = await singUp(req.body);

    return new_user ? res.send(`usuario criado login"${new_user.id}"`) : res.sendStatus(401);
}


/**
 * @openapi
 * /evento/deleteuser:
 *   post:
 *     summary: "Delete some user"
 * 
 *     tags:
 *       - "Delete"
 *     operationId: deleteuser
 *     x-eov-operation-handler: local/router
 * 
 * 
 *     responses:
 *       '200':
 *         description: "User deleted"
 *       '400':
 *         description: "Invalid data provided"
 *       '401':
 *         description: "DEleting process failed"
 * 
 *     security: 
 *       - {}
 *       - JWT: ['USER']
 *
 */
 
export async function deleteuser(req, res , _){
    if (!req.user) res.send("Authorized Users Only");
    
    const user  = await delete_user(req.user);
    return user ? res.send(`usuario do id ${req.user.id} deletado`) : res.sendStatus(401);


    


}

/**
 * @openapi
 * 
 * /evento/StudentInfo:
 *   get:
 *     summary: "Retrives user of the students"
 * 
 *     tags:
 *       - "JsonStudent"
 * 
 *     operationId: get_student_info
 *     x-eov-operation-handler: local/router
 * 
 *     responses:
 *       '200':
 *         description: "Returns the student info"
 *       '404':
 *         description: "Request Failed"
 *
 */


export async function get_student_info(req, res, _){

    return res.send("Lucas Carvalho e Matheus Kozak");

}


/**
 * @openapi
 * /local/update/me:
 *   post:
 *     summary: "Update user info"
 * 
 *     tags:
 *       - "update"
 *     
 *     operationId: updateuser
 *     x-eov-operation-handler: local/router
 * 
 * 
 *     requestBody:
 *       description: Login information
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UsernamePasswordUpdate" 
 * 
 *     responses:
 *       '200':
 *         description: "User logged in"
 *       '400':
 *         description: "Invalid data provided"
 *       '401':
 *         description: "Login failed"
 * 
 * 
 *     security: 
 *       - {}
 *       - JWT: ['USER']
 *
 */


export async function updateuser(req,res, _){
    if(!req.user) res.send("Authorized Only");
    const user = update_user(req.user.id , req.body);
    return user ? res.send("Credential update sucess") : res.sendStatus(401)

}






