import { useState } from "react";
import { Button, Modal } from "react-bootstrap"
import { deleteTask } from "../services/tasksAPI";
import { taskReq } from "../types/tasksTypes"

export function ModalDeleteTask(props: any){

    const [def, setDef] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [msg, setMsg] = useState(false);

    const onSubmit = (e: any) => {
        const task: taskReq = {
            name: props.name,
            post: props.post,
            id: props.id
        }


        setTiming();

        setTimeout(() => {
            deleteTask(task.id!) 
          }, 1300)
    }

    const onCancel = (e:any) => {
        props.onHide()
    }

    function setTiming(){
        setTimeout(() => {
            setDef(false)
            setIsLoading(true)
        },0)
    
        setTimeout(() => {
            setIsLoading(false)
            setMsg(true)
        },1400)

        setTimeout(() => {
            setIsSuccess(true)
        }, 1700)

        setTimeout(() => {
            setMsg(false)
            setIsSuccess(false)
            props.onHide()
        },2200)

        setTimeout(() => {
            setDef(true)
        },2400)
    }

    return (
        <Modal
        {...props
        }size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="fs-6">
                    - Task
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="mb-5">
            <div className="d-flex">
                <div>
                    <h6 className="w-auto me-1">Can you delete Task:</h6>
                </div>
                <div className="break-word-username max-w">
                    <h6 className="me-1 text-primary font-weight mw-25">{props.name}</h6>
                </div>
                <div>
                    <h6 className="w-auto ms-2">?</h6>
                </div>
            </div>                       
            </Modal.Body>
            <Modal.Footer>

            <div id="alert-btn" className={`d-flex alert alert-success fade show ${msg ? 'd-block' : 'd-none'} py-1`} role="alert">
              <p className={`mb-0 break-word-username max-w me-2`}>{props.name}</p> <span>was <strong>Deleted!</strong></span>
            </div>

            <Button onClick={onCancel} className={`btn-danger me-3 ${def ? 'd-block' : 'd-none'} `}>
            <i className="bi bi-x-circle me-2"></i>
                Cancel
            </Button>

            <Button onClick={onSubmit} className={`btn-primary ${def ? 'd-block' : 'd-none'} `}>
            <i className="bi bi-check2-circle me-2"></i>
                Yes
            </Button>     

            <button id="btn-loading" className={`btn btn-primary ${isLoading  ? 'd-block' : 'd-none'} `} type="button" disabled >
              <span className='spinner-border spinner-border-sm me-2' role="status" aria-hidden="true"></span>
              Loading...
            </button>

            <button id="btn-succefull"className={`btn btn-success ${isSuccess ? 'd-block' : 'd-none'} `} type="button" disabled >
              <i className="bi bi-check2-circle"></i>
            </button>

        </Modal.Footer>
      </Modal>
    )
}