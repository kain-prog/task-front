import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getTasks } from '../services/tasksAPI';
import { taskReq } from "../types/tasksTypes";
import { ModalDeleteTask } from "./ModalDeleteTask";
import { ModalEditTask } from "./ModalEditTask";



export default function Tasks(){

    const [openTask, setOpenTask] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [taskId, setTaskId] = useState<number>();
    const [taskName, setTaskName] = useState<string>();
    const [task, setTask] = useState([]);

    async function reqTask(){
        const res = await getTasks();
        setTask(res);
    }

    useEffect(() => {
        reqTask();
    }, []);

    useEffect(() => {
        reqTask();
    },[task, openDelete, openTask ])

    function modalData(isOpen: boolean, taskId: number,){
        setOpenTask(isOpen);
        setTaskId(taskId);
    }

    function modalDataDelete(openDelete: boolean, taskId: number, taskName: string){
        setOpenDelete(openDelete);
        setTaskId(taskId);
        setTaskName(taskName);
    }

    return(
        <>
            <div className="row">

                {task.length !== 0 ? task.map((data: taskReq) => (
                    
                    <div key={data.id} className="col-md-6 col-lg-4 col-xl-3 my-2">
                        

                        <Card id="tasks" className="shadow-sm h-100 w-100 ">
                            
                            <Card.Header className="fs-7 d-flex justify-content-between align-items">
                                <strong className="text-capitalize break-word-username w-75">{data.username!}</strong>
                                <div>
                                    <i onClick={() => modalData(true, data.id!)} className="c-pointer bi bi-pencil-square text-success me-2 hover-icons"></i>
                                    <i onClick={() => modalDataDelete(true, data.id!, data.name)} className="c-pointer bi bi-x-circle text-danger hover-icons"></i>
                                </div>
                            </Card.Header>
    
                            <Card.Body className="d-flex flex-column justify-content-between" >
                                <Card.Title className="fs-6 break-word-title username">
                                    {data.name}
                                </Card.Title>
                                <Card.Text className="fs-7 break-word-post mingzat">
                                    {data.post}
                                </Card.Text>
                                <Card.Text className="mt-3 d-flex align-items-center justify-content-between">
                                    <Link to={`/painel/${data.id!} `} className="w-100" >
                                        <Button variant="primary" className="w-100 fs-6 py-1">View Content</Button>
                                    </Link>
                                </Card.Text>
                                
                            </Card.Body>
                        </Card>

                    </div>
                    
                )) : <div id="task-loading" className="d-flex mt-5 pt-5 text-center justify-content-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }                   

            </div>

            <ModalEditTask
                show={openTask}
                onHide={() => setOpenTask(false)}
                id={taskId}
            />

            <ModalDeleteTask
                show={openDelete}
                onHide={() => setOpenDelete(false)}
                id={taskId}
                name={taskName}
            />          
        </>
    )
}