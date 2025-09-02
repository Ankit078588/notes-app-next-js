import { MdDelete, MdEdit } from "react-icons/md";


interface TodoItemInterface {
    content: string,
    completed: boolean,
    handleDeleteTodo: () => void
}


const TodoItem = ({content, completed, handleDeleteTodo} : TodoItemInterface) => {


  return (
    <div className="border-1 border-white rounded flex justify-between items-center p-2 mb-5">
        <div className="flex gap-2 items-center">
            <input type="checkbox" className="w-6 h-6 rounded-md" checked={completed} onChange={(e) => {console.log(e.target.checked)}} />
            {/* <input className="w-6 h-6 rounded-md cursor-pointer appearance-none border-2 border-gray-400 checked:bg-gray-600 checked:border-gray-600" type="checkbox" checked={true} onChange={(e) => {console.log(e.target.checked)}}  /> */}
            <p className="text-slate-200"> {content} </p>
        </div>
        <div className="flex gap-2">
            <div className="bg-blue-200 rounded-md p-2 cursor-pointer text-blue-700"> <MdEdit /> </div>                        
            <div className="bg-red-100 rounded-md p-2 cursor-pointer text-red-600" onClick={handleDeleteTodo}> <MdDelete /> </div>
        </div>                        
    </div>
  )
}


export default TodoItem;




