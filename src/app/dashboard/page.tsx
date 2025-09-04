'use client'
import ShimmerUI from "@/components/ShimmerUI";
import TodoItem from "@/components/TodoItem";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaUser } from "react-icons/fa6";
import { MdOutlineLightMode } from "react-icons/md";


interface TodoInterface {
    _id: string, 
    content: string, 
    completed: boolean
}



export default function Dashboard() {
    const [todoText, setTodoText] = useState('');
    const [allTodos, setAllTodos] = useState<TodoInterface[]>([]);
    const [filteredTodos, setFilteredTodos] = useState<TodoInterface[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: ""
    });
    const [showUserModal, setShowUserModal] = useState(false);

    const router = useRouter();

    useEffect( () => {
        fetchTodos();
        fetchUser();
    }, [] )

    async function fetchTodos() {
        try {
            setLoadingData(true);
            const res = await axios.get('/api/todos');
            const todos = res.data?.todos;
            setAllTodos(todos);

            const specificFilterTodo = todos.filter((todo: TodoInterface) => {
                if(activeFilter == 'all') return true;
                else if(activeFilter === 'active') return todo.completed === false;
                else if(activeFilter === 'completed') return todo.completed === true;
            } )
            setFilteredTodos(specificFilterTodo);
        } catch(error) {
            const e = error as AxiosError<{message: string}>
            if(!e.response) return toast.error(e.message);
            if(e.response.status === 401) {
                router.push('/login');
            }
        } finally {
            setLoadingData(false);
        }
    }

    async function fetchUser() {
        try {
            const res = await axios.get('/api/auth/user');
            const user = res.data?.user;
            setUserDetails(user);
        } catch(error) {
            const e = error as AxiosError<{message: string}>
            if(!e.response) return;
            if(e.response.status === 401) {
                toast.error('Session Expired. Please Login again.')
                router.push('/login');
            }
        }
    }

    async function handleCreateTodo() {
        if(!todoText.trim()) return;

        try {
            const res = await axios.post('/api/todos', {content: todoText});
            toast.success(res.data.message);
            setTodoText('');
            // fetchTodos();
            setAllTodos( (p) => [...p, res.data.todo])
            setFilteredTodos( (p) => [...p, res.data.todo])
        } catch(e) {
            console.log(e);
        }
    }

    async function handleDeleteTodo(_id: string) {
        try {
            const res = await axios.delete(`/api/todos/${_id}`);
            toast.success(res.data.message);
            // setAllTodos( (p) => [...p, res.data.todo])
            // filteredTodos( (p) => [...p, res.data.todo])
            fetchTodos();
            // setActiveFilter('all');
        } catch(e) {
            console.log(e);
        }
    }

    async function handleFilterTodo(filter: string) {
        if(filter === 'all') {
            setActiveFilter('all');

            setFilteredTodos(allTodos);
        } else if(filter === 'active') {
            setActiveFilter('active');

            const activeTodos = allTodos.filter((todo) => todo.completed === false)
            setFilteredTodos(activeTodos);
        } else if(filter === 'completed') {
            setActiveFilter('completed');

            const completedTodos = allTodos.filter((todo) => todo.completed === true)
            setFilteredTodos(completedTodos);
        }
    }

    async function handleLogout() {
        try {
            const res = await axios.post('/api/auth/logout');
            toast.success(res.data?.message);
            router.push('/login');
        } catch(error) {
            const e = error as AxiosError<{message: string}>

            if(!e.response) return toast.error(e.message);
            if(e.response) return toast.error(e.response.data.message);
            toast.error('Something went wrong.')
        }
    }

    return (
        <div className="min-h-screen w-screen bg-gray-800 p-10">
            {/* Add todo section */}
            <div className="w-2xl bg-slate-700 mx-auto rounded p-4 mb-10">
                <div className="flex justify-between relative">
                    <p className="text-white text-3xl font-semibold text-center">Todo Dashboard</p>
                    <div className="flex text-white gap-3 items-center text-xl"> 
                        <span className="cursor-pointer"> <MdOutlineLightMode /> </span> 
                        <span className="cursor-pointer" onClick={() => setShowUserModal(p => !p)}> <FaUser /> </span>
                    </div>
                    {/* User Details Modal */}
                    {showUserModal && 
                        <div className="w-[200px] h-[140px] bg-slate-800 border-1 border-gray-500 rounded-md absolute top-[100%] right-0 p-3">
                            <div className="text-gray-300 text-xl mb-['2px'] font-semibold">{userDetails.name}</div>
                            <div className="text-gray-400 mb-6">{userDetails.email}</div>
                            <div>
                                <button className="text-white bg-red-900 py-1 px-4 rounded cursor-pointer" onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    }
                </div>

                

                <div className="mt-6">
                    <div className="border-1 border-white rounded flex justify-between items-center px-2">
                        <input className="py-2 outline-none flex-1 text-gray-200" type="text" placeholder='Add a new task.' value={todoText} onChange={(e) => setTodoText(e.target.value)} onKeyDown={(e) => { if(e.key === 'Enter') {handleCreateTodo();} }} />
                        <span className="bg-gray-400 rounded-md p-2 cursor-pointer" onClick={handleCreateTodo}> <FaPlus /> </span>
                    </div>
                </div>
            </div>



            {/* Show loading while fetching todo data */}
            {loadingData && allTodos.length === 0 && (
                <ShimmerUI />
            )}


            {/* Show msg, in case of no Todos. */}
            {!loadingData && allTodos.length === 0 && 
                <div className="w-2xl bg-slate-700 mx-auto rounded p-4">
                    <p className="text-center text-gray-100">No Todos created yet. Create your 1st new todo now!</p>
                </div>
            }


            {/* List all todos section  */}
            {allTodos.length > 0 && 
                <div className="w-2xl bg-slate-700 mx-auto rounded p-4">
                    {/* Filters tab */}
                    <div className="flex justify-between">
                        <h1 className="text-white text-md text-center">Your Todos</h1>
                        <div className="flex gap-2">
                            <button className={`${activeFilter === 'all'? 'bg-white' : 'bg-transparent border-1 border-gray-400 text-gray-400'} py-1 px-2 rounded cursor-pointer`} onClick={() => {handleFilterTodo('all')}}>All</button>
                            <button className={`${activeFilter === 'active'? 'bg-white' : 'bg-transparent border-1 border-gray-400 text-gray-400'} py-1 px-2 rounded cursor-pointer`} onClick={() => {handleFilterTodo('active')}}>Active</button>
                            <button className={`${activeFilter === 'completed'? 'bg-white' : 'bg-transparent border-1 border-gray-400 text-gray-400'} py-1 px-2 rounded cursor-pointer`} onClick={() => {handleFilterTodo('completed')}}>Completed</button>
                        </div>
                    </div>

                    {/* Todo items */}
                    <div className="mt-6">
                        {   
                            [...filteredTodos].reverse().map((todo: TodoInterface) => (
                                <TodoItem key={todo._id} content={todo.content} completed={todo.completed} handleDeleteTodo={() => handleDeleteTodo(todo._id) } />
                            ))
                        }
                    </div>  
                </div>
            }
        </div>
    )
}

