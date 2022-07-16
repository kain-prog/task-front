import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { getTaskId } from "../../services/tasksAPI";

export default function TaskPainel(props: any){

const { id } = useParams()

let taskId = id ? Number.parseInt(id, 10) : null

const [name, setName] = useState<any>();
const [post, setPost] = useState<any>();
const [username, setUsername] = useState<any>();

    async function getId(taskId: number){
        const res = await getTaskId(taskId)
        setName(res[0].name)
        setPost(res[0].post)
        setUsername(res[0].username)
      }

    useEffect(() => {
        if(taskId !== undefined){
          getId(taskId!)
        }
      },[taskId]);

    return(
        <div className="main-body d-flex">

            <SideBar/>
            
            <div id="main" className="position-relative d-flex flex-column align-items-center bg-tasks w-100 p-5 overflow-auto">
                <div className="position-absolute local-3 d-flex justify-content-center w-75">
                    <h2 className="fs-5 fw-bold break-word-username anek text-capitalize">{username}</h2>
                </div>

                <Link to="/">
                    <div className="c-pointer position-absolute btn-home">
                        <i className="bi bi-chevron-double-left text-dark"> <span>Back</span></i>
                    </div>
                </Link>
                
                    <div id="all-task" className="flex-shrink-0 overflow-auto container border rounded shadow h-100 w-100 p-0">
                        
                        
                        <Card border="secondary" className="h-100 bg-transparent overflow-auto" style={{ width: '100%'}}>
                            <Card.Header className="bg-dark text-light">
                                <h6 className="break-word-username w-75 mb-0 anek text-capitalize">{name}</h6>
                            </Card.Header>
                            <Card.Body >
                            <Card.Text className="mingzat">
                                {post}
                            </Card.Text>
                            </Card.Body>
                        </Card>


                    </div>

            </div>
     
        </div>
    )
}