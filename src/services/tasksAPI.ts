import axios from "axios";
import { taskReq} from "../types/tasksTypes";

const enderecoAPI = axios.create({
    baseURL: 'https://task-serv.herokuapp.com/'
})

async function getTasks(){
    let {data, status} = await enderecoAPI.get('/posts')
    if (status === 200){
        return data
    }
    else{
        return console.log(status);
    }
}

async function getTaskId(id: number){
    let {data, status} = await enderecoAPI.get(`/task/${id}`)
    if (status === 200){
        return data
    }
    else{
        return console.log(status, 'deu erro');
    }
}

async function createTask(task: taskReq, code?: any){
    let query = await enderecoAPI.post('/newPost', task)
    return query;
}


async function updateTask(task: taskReq){
    enderecoAPI.put(`/posts/${task.id}`, task)
    const code = true;
        return code;
}

async function deleteTask(task: number){
    enderecoAPI.delete(`/posts/${task}`);
    const code = true;
        return code;
}

export { getTasks, createTask, updateTask, getTaskId, deleteTask, enderecoAPI };