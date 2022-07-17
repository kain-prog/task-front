import NewTask from '../../components/NewTask'
import SideBar from '../../components/SideBar'
import Tasks from '../../components/Tasks'

export default function Home(){


    return(
        <div className='main-body d-flex'>

            <SideBar/>
            
            <div id='main' className='position-relative d-flex flex-column align-items-center bg-tasks w-100 p-5 overflow-auto'>
                <div className='position-absolute local-3'>
                    <h2 className='fs-4 fw-bold'>My Tasks</h2>
                </div>

                <div className='position-absolute local-2 text-center margin-auto'>
                    <NewTask/>
                </div>
                
                <div id='all-task' className='flex-shrink-0 overflow-auto container border rounded shadow h-100 w-100'>
                    <Tasks/>
                </div>

            </div>
     
        </div>
    )
}