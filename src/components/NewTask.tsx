import { useState } from 'react'
import { Button } from 'react-bootstrap';
import { ModalNewTask } from './ModalNewTask';


export default function NewTask(){

    const [openTask, setOpenTask] = useState(false);

    return(

        <>
            <Button variant='primary' onClick={() => setOpenTask(true)} className='modal-btn c-pointer hov-custom t-300 d-flex justify-content-center align-items-center new-task rounded-circle bg-blue border border shadow'>
                <i className='bi bi-plus-lg text-light fs-2'></i>
            </Button>

            <ModalNewTask
                show={openTask}
                onHide={() => setOpenTask(false)}
            />
        </>
      
    )
}

        