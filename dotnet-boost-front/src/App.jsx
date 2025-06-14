import React, { Children, useEffect, useState } from "react";
import { BiEdit, BiFilter, BiPlus, BiTrash, BiX } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import tasksMock from "./data/tasksMock";
import { add, del, getAll, update } from "./services/crudServices";
import { formatTime } from "./Utils";

const borderColors = [
  "border-green-500",
  "border-purple-500",
  "border-blue-500",
]

const getRandomBorder = ()=>{
  const randomIndex = Math.floor(Math.random() * borderColors.length)

  return borderColors[randomIndex]
}

const deleteItem = (arr, id)=>{
  let newArr = []
  newArr.reverse
  arr.forEach(element => {
    if(element.id != id){
      newArr = [...newArr, element]
    }
  });

  return newArr
}

const Form = ({handlSubmit})=>{;
  const [task, setTask] = useState({title: "", state: false, dueDate: new Date(), border: getRandomBorder()})

  const handleTChange = (e)=>{
    setTask((prev)=>({...prev,
      title: e.target.value, 
    }))
  }

  const handleDChange = (e)=>{
    setTask((prev)=>({...prev,
      dueDate: e.target.value, 
    }))
  }

  return (
    <div>
      <form className="flex gap-3 sm:min-w-[500px]" onSubmit={(e)=>{
        e.preventDefault()
        console.log(task)
        handlSubmit(task)
        setTask((prev=>({title: "", state: false, dueDate: "", border: getRandomBorder()})))
      }}>
        <input onChange={handleTChange} value={task.title} type="text" placeholder="Nouvelle tâche" className="flex-1 border-b-3 outline-0 px-4 py-2 border-gray-700"  />
        <input onChange={handleDChange} type="datetime-local" value={task.dueDate} className="cursor-pointer border-b-3 outline-0 px-4 py-2 border-gray-700" />
        {/* <input onChange={handleHChange} type="time" value={task.hour} placeholder="Nouvelle tache" className="cursor-pointer border-b-3 outline-0 px-4 py-2 border-gray-700" /> */}
        <button className="rounded-lg px-4 py-2 bg-gray-700 text-white cursor-pointer disabled:bg-gray-400" disabled={!(task.title && task.dueDate)}> <BiPlus className="size-[20px]" /></button>
      </form>
    </div>
  )
}


const UpdateForm = ({setMod, oldTask, handleUpdate})=>{;
  const [task, setTask] = useState(()=>oldTask)

  const handleTChange = (e)=>{
    setTask((prev)=>({...prev,
      title: e.target.value, 
    }))
  }

  const handleDChange = (e)=>{
    setTask((prev)=>({...prev,
      dueDate: e.target.value, 
    }))
  }

  const handleHChange = (e)=>{
    setTask((prev)=>({...prev,
      hour: e.target.value, 
    }))
  }

  return (
    <div>
      <form className="flex gap-1 max-w-[200px]" onSubmit={(e)=>{
        e.preventDefault()
        setMod(false)
        handleUpdate(task)
      }}>
        <input onChange={handleTChange} value={task.title} type="text" placeholder="Modification" className="flex-1 bg-[#eee] outline-0"  />
        <input onChange={handleDChange} type="datetime-local" value={task.dueDate} className="cursor-pointer outline-0" />
        {/* <input onChange={handleHChange} type="time" value={task.hour} placeholder="Nouvelle tache" className="cursor-pointer border-b-3 outline-0 px-4 py-2 border-gray-700" /> */}
      </form>
    </div>
  )
}



const Table = ({tasks, handleDelete, handleCheck, handleUpdate})=>{

  if(tasks.length < 1){
    return (
      <div className="text-center text-[20px] text-gray-500">
        Aucune tache enregistree
      </div>)
  }
  
  const Task = ({item, index, handleUpdate})=>{
    const [mod, setMod] = useState(()=>false)

    const expiresAt = new Date(item.dueDate)
    const [timeLeft, setTimeLeft] = useState(expiresAt - Date.now());

    useEffect(() => {
      const interval = setInterval(() => {
        setTimeLeft(expiresAt - Date.now());
      }, 1000);

      return () => clearInterval(interval);
    }, [expiresAt]);


     return ( 
        <div key={index} className={`px-5 sm:w-[500px] w-full cursor-pointer shadow-sm border ${item.border} flex items-center rounded-2xl justify-between`}>
          <div className="flex justify-between items-center gap-3 w-full">
            <input type="checkbox" checked={ item.state == true } className="cursor-pointer size-[20px] outline-0 checked:bg-green rounded-lg" onChange={(e)=>{
              if(item.state == true){
                item.state = false
              }else{
                item.state = true
              }

              handleCheck(item)
              
            }} />
            <div className="flex-1 flex justify-between items-center w-full">
              <div className={`py-2 text-start font-medium ${ item.state == true && !mod ? "line-through text-gray-400": "text-gray-600 " }`} onClick={()=>{setMod(()=>(true))}}> { !mod ? item.title: <UpdateForm setMod={setMod} oldTask={item} handleUpdate={handleUpdate}/> } </div>
              {!mod && <div className={`py-2 float-end text-start px-4 ${ formatTime(timeLeft) == "Expiré" ? "text-orange-600": "text-gray-600 font-medium"}`} onClick={()=> setMod(true)}>{formatTime(timeLeft)}</div>}
            </div>
          </div>
          <div className="py-2 text-start font-medium flex gap-2 items-center">
              {/* <button className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg font-medium text-[#707070] flex items-center gap-1"> <BiEdit/> Editer</button> */}
              <button className="cursor-pointer text-[#da6666] rounded-lg font-medium flex items-center gap-1" onClick={()=>{
                handleDelete(tasks, item.id)
              }}><BiX className="size-[30px]" /></button>
          </div>
        </div>
      )
  }

  console.log(tasks)
  return (
    <div className="flex flex-col gap-3">
      {/* <tr className="bg-blue-100 rounded-lg">
        <th className="px-4 py-2 text-start font-semibold">Tache</th>
        <th className="px-4 py-2 text-start font-semibold">Temps restant</th>
        <th className="px-4 py-2 text-start font-semibold">Actions</th>
      </tr> */}
      {tasks && tasks.map((item, index)=>(
        <Task item={item} index={index} key={index} handleUpdate={handleUpdate}/>
      ))}
    </div>
  )
}

const Content = ()=>{
    const [tasks, setTasks] = useState([])

    const handlSubmit = async (task)=>{
       try {
        const newTask = await add(task)
        console.log("Nouveau tache ajoutee: " + newTask)
        setTasks((prev) => [...prev, newTask]) 
      } catch (error) {
        console.error("Erreur lors de l'ajout de la tâche :", error)
      }
    }

    const handleUpdate = async (task)=>{
       try {
        const newTask = await update(task)
       	console.log("tache mise a jours: " + newTask)
        const newTasks = tasks.map((element)=>{
          if(element.id == task.id){
            return task
          }else{
            return element
          }

        })
        setTasks((prev) => newTasks) 
      } catch (error) {
        console.error("Erreur lors de l'ajout de la tâche :", error)
      }
    }

    useEffect(()=>{
       const fetchTasks = async () => {
         try {
           const data = await getAll()
           console.log(data)
           setTasks(data)
         } catch (error) {
           console.error("Erreur lors de la récupération des tâches :", error)
         }
       }

       fetchTasks()
    },[])

    const handleDelete = async  (tasks, id)=>{
      const data = await del(id)
      setTasks((prev)=>{
        return deleteItem(tasks, id)
      })
    }

    const handleCheck = async (task)=>{
      task = await update(task)
      let newTasks = []
      tasks.forEach(item=>{
        if(item.id == task.id){
          item.state == task.state
        }
        newTasks.push(item)
      })

      setTasks((prev)=>{
        return newTasks
      })
    }



    return (
      <div className="flex flex-col gap-[2rem]">
	    <div className="font-bold text-[28px] text-gray-600">Liste de tâches</div>
        <Form handlSubmit={handlSubmit}  />
        <Table tasks={tasks} handleDelete={handleDelete} handleUpdate={handleUpdate} handleCheck={handleCheck} />
      </div>
    )

}

function App() {
  return (
    <div className="px-[200px] py-[5rem] flex justify-center">
      <Content/>
    </div>
  );
}

export default App;
