import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { getTaskId, updateTask } from "../services/tasksAPI";
import { taskReq } from "../types/tasksTypes";

export function ModalEditTask(props: any) {

const [def, setDef] = useState(true);
const [isLoading, setIsLoading] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [msg, setMsg] = useState(false);
const [name, setName] = useState<string>();
const [post, setPost] = useState<string>();
const [username, setUserName] = useState<string>();

const onSubmit = (e: any) => {
  const task: taskReq = {
    name: name!,
    post: post!,
    username: username!,
    id: props.id
  }

  timing();  
  
  setTimeout(() => {
    postTask(task)
  }, 1300)
    
}
 
async function postTask(task: taskReq){
  await updateTask(task)
}

async function getId(id: number){
  const res = await getTaskId(id)
    setName(res[0].name)
    setPost(res[0].post)
    setUserName(res[0].username)
}

useEffect(() => {
  if(props.id !== undefined){
    getId(props.id)
  }
},[props.id]);

// Botão dinâmico
function timing(){
  setTimeout(()=>{
    setDef(false)
    setIsLoading(true)
  },0)

  setTimeout(() => {
    setIsLoading(false)
    setIsSuccess(true)
  }, 1200)

  setTimeout(() => {
    setMsg(true)
  }, 1450)

  setTimeout(() => {
    props.onHide()
    setIsSuccess(false)
    setMsg(false)
    setDef(true)
  }, 2100)
}
    return (
      
      <Modal
        {...props
        }size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="d-flex align-items-center">

          <Modal.Title id="contained-modal-title-vcenter" className="break-word-username anek text-capitalize font-weight fs-7 w-50">
            {username}
          </Modal.Title>

        </Modal.Header>

        <Modal.Body>

          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name Task:</Form.Label>
              <Form.Control type="text" placeholder="Insert Here.." className="fs-input mongzat" name="name" value={name} onChange={(e) => { setName(e.target.value)}} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Edit Task:</Form.Label>
              <Form.Control as="textarea" className="w-100 fs-input mongzat" cols={30} rows={6}  value={post} onChange={(e) => { setPost(e.target.value)}} />
            </Form.Group>
          </Form>

        </Modal.Body>

        <Modal.Footer>

            <div className={`alert d-flex align-items-center alert-success py-1 fade show ${msg ? 'd-flex' : 'd-none' } `} role="alert">
              <p className={`my-0 break-word-username max-w me-2 fs-input mongzat`}>{name}</p> <span className="my-0 fs-input mongzat">was <strong>Edited!</strong></span>
            </div>

            <Button onClick={onSubmit} className={` ${def ? 'd-block' : 'd-none' } fade show `}>
                <i className="bi bi-pencil-square text-light me-2"></i>
                Edit
            </Button>
            
            <button className={`btn btn-primary ${isLoading ? 'd-block' : 'd-none'} fade show`} type="button" disabled >
              <span className='spinner-border spinner-border-sm me-2' role="status" aria-hidden="true"></span>
                Loading...
            </button>

            <button className={`btn btn-success ${isSuccess ? 'd-block' : 'd-none' } fade show `} type="button" disabled >
              <i className="bi bi-check2-circle"></i>  
            </button>

        </Modal.Footer>
      </Modal>
    )
  }