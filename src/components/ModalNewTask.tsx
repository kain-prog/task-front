import { useState } from "react";
import { Button, Form, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { createTask } from "../services/tasksAPI";
import { taskReq } from "../types/tasksTypes";

export function ModalNewTask(props: any) {

const [validation, setValidation] = useState<string>()
const [codin, setCode] = useState<boolean>()
const [def, setDef] = useState(true);
const [isLoading, setIsLoading] = useState(false);
const [msgFail, setMsgFail] = useState(false);
const [isNotSuccess, setIsNotSuccess] = useState(false)
const [isSuccess, setIsSuccess] = useState(false);
const [msg, setMsg] = useState(false);
const [name, setName] = useState<string>();
const [post, setPost] = useState<string>();
const [username, setUserName] = useState<string>();

const onSubmit = (e: any) => {
  const task: taskReq = {
    name: name!,
    post: post!,
    username: username!
  }
  
  setTimeout(() => {
    setDef(false)
    setIsLoading(true)
  },0)

  setTimeout(() => {
    postTask(task)
  }, 1200)
  
}

// Requisição post
async function postTask(task: taskReq, code?: boolean){
  await createTask(task).then((res) => {code = true; console.log(code);}).catch((error) => {code = false; console.log(code) ; setValidation(error.response.data);})
  setCode(code);
                          // Botão dinâmico sem erro
  if(code === true){
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
  }                        // Botão dinâmico captando erro
  else{ 
    setTimeout(() => {
      setIsLoading(false)
      setIsNotSuccess(true)
    }, 1200)
  
    setTimeout(() => {
      setMsgFail(true)
    }, 1450)
  
    setTimeout(() => {
      setIsNotSuccess(false)
      setMsgFail(false)
      setDef(true)
    }, 4000)

    setTimeout(() => {
      setCode(undefined)
      console.log(codin)
    }, 4200)
  }
}

  return (
      <Modal
        {...props
        }size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="py-2 bg-bege" closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="fs-6">
          <Form.Group className="d-flex align-items-center" controlId="exampleForm.ControlInput1">
              <Form.Label className="mb-0 w-50">Username:</Form.Label>
              <Form.Control type="text" placeholder="Your name..." name="username" className="fs-input mongzat ms-1" onChange={(e) => { setUserName(e.target.value)}} required />

              <>
                {
                  <OverlayTrigger
                    key={'top'}
                    overlay={
                      <Tooltip id={`tooltip-${'top'}`}>
                        This input is <strong>required</strong>
                      </Tooltip>
                    }
                  >
                    <Button variant="" className={`mx-3 bg-transparent p-0 ${isNotSuccess ? 'd-none' : 'd-block'} `} ><i className={`bi bi-info-square text-primary`}></i></Button>
                  </OverlayTrigger>
                }
              </>

              <i className={`${isNotSuccess ? 'd-block' : 'd-none'} bi bi-exclamation-square ms-3 text-danger`}></i>
            </Form.Group>
          </Modal.Title>

        </Modal.Header>
        <Modal.Body>

          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name Task:</Form.Label>
              <Form.Control type="text" placeholder="Insert Here..." className="fs-input mongzat" name="name" onChange={(e) => { setName(e.target.value)}} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Task:</Form.Label>
              <Form.Control as="textarea" placeholder="Your task..." className="w-100 fs-input mongzat" name="post" cols={30} rows={6} onChange={(e) => { setPost(e.target.value)}} />
            </Form.Group>
          </Form>


        </Modal.Body>
        <Modal.Footer className="">
            <Button onClick={onSubmit} className={` ${def ? 'd-block' : 'd-none' } fade show `}>
                <i className="bi bi-plus-lg text-light me-2"></i>
                Create
            </Button>

            <div className={`d-flex align-items-center alert alert-success py-1 fade show ${msg ? 'd-flex' : 'd-none' } `} role="alert">
              <p className={`mb-0 break-word-username max-w me-2 fs-input mongzat`}>{name}</p> <span>was <strong>Created!</strong></span>
            </div>

            <div className={`alert alert-danger py-1 fade show ${msgFail ? 'd-block' : 'd-none' } `} role="alert">
              <strong className="fs-input mongzat">{validation}</strong>
            </div>
            
            <button className={`btn btn-primary ${isLoading ? 'd-block' : 'd-none'} fade show`} type="button" disabled >
              <span className='spinner-border spinner-border-sm me-2' role="status" aria-hidden="true"></span>
                Loading...
            </button>

            <button className={`btn btn-success ${isSuccess ? 'd-block' : 'd-none' } fade show `} type="button" disabled >
              <i className="bi bi-check2-circle"></i>  
            </button>

            <button className={`btn btn-danger ${isNotSuccess ? 'd-block' : 'd-none' } fade show `} type="button" disabled >
              <i className="bi bi-exclamation-circle"></i>  
            </button>
        </Modal.Footer>

      </Modal>

  

    );
  }