import axios from "axios"
import { useState } from "react"

function App(){

const [isLogin,setIsLogin] = useState(true)

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const [token,setToken] = useState("")

const [title,setTitle] = useState("")
const [description,setDescription] = useState("")

const [tasks,setTasks] = useState([])

const clearFields = () => {
  setName("")
  setEmail("")
  setPassword("")
  setTitle("")
  setDescription("")
}

const register = async () => {

if(!name || !email || !password){
alert("Please fill all fields")
return
}

try{

await axios.post(
"http://localhost:5000/api/v1/auth/register",
{ name,email,password }
)

alert("Registration successful. Please login.")

setIsLogin(true)
clearFields()

}
catch(error){

if(error.response?.data?.error?.includes("duplicate")){
alert("User already exists. Please login.")
}
else{
alert("Registration failed")
}

}

}

const login = async () => {

if(!email && !password){
alert("Please enter email and password")
return
}

if(!email){
alert("Email is required")
return
}

if(!password){
alert("Password is required")
return
}

try{

const res = await axios.post(
"http://localhost:5000/api/v1/auth/login",
{ email,password }
)

setToken(res.data.token)

localStorage.setItem("token",res.data.token)

alert("Login Successful")

fetchTasks()

}
catch(error){

if(error.response?.status === 404){
alert("User not registered. Please register first.")
}
else if(error.response?.status === 400){
alert("Incorrect password. Please try again.")
}
else{
alert("Login failed")
}

}

}
const fetchTasks = async () => {

try{

const token = localStorage.getItem("token")

const res = await axios.get(
"http://localhost:5000/api/v1/tasks",
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

setTasks(res.data)

}
catch{
alert("Failed to fetch tasks")
}

}

const createTask = async () => {

if(!title){
alert("Task title required")
return
}

const token = localStorage.getItem("token")

await axios.post(
"http://localhost:5000/api/v1/tasks",
{ title,description },
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

setTitle("")
setDescription("")

fetchTasks()

}

const deleteTask = async (id) => {

const token = localStorage.getItem("token")

await axios.delete(
`http://localhost:5000/api/v1/tasks/${id}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

fetchTasks()

}

const updateTask = async (id) => {

const newTitle = prompt("Enter new task title")

if(!newTitle) return

const token = localStorage.getItem("token")

await axios.put(
`http://localhost:5000/api/v1/tasks/${id}`,
{ title:newTitle },
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

fetchTasks()

}

const logout = () => {

localStorage.removeItem("token")

setToken("")
setTasks([])

clearFields()

alert("Logged out")

}

return(

<div style={{
background:"#f4f6f9",
minHeight:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
fontFamily:"Arial"
}}>

<div style={{
background:"white",
padding:"30px",
borderRadius:"10px",
width:"420px",
boxShadow:"0 5px 20px rgba(0,0,0,0.1)"
}}>

<h1 style={{
textAlign:"center",
color:"#230e07",
marginBottom:"20px"
}}>
Task Manager
</h1>
{!token && (

<div>

<div style={{display:"flex",justifyContent:"space-between",marginBottom:"20px"}}>

<button onClick={()=>{setIsLogin(true);clearFields()}} style={switchBtn}>
Login
</button>

<button onClick={()=>{setIsLogin(false);clearFields()}} style={switchBtnBlue}>
Register
</button>

</div>

{!isLogin && (

<div>

<input
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
style={input}
/>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={input}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={input}
/>

<button onClick={register} style={primaryBtn}>
Register
</button>

</div>

)}

{isLogin && (

<div>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={input}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={input}
/>

<button onClick={login} style={primaryBtn}>
Login
</button>

</div>

)}

</div>

)}

{token && (

<div>

<button onClick={logout} style={logoutBtn}>
Logout
</button>

<h3>Create Task</h3>

<input
placeholder="Task Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
style={input}
/>

<input
placeholder="Task Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
style={input}
/>

<button onClick={createTask} style={primaryBtn}>
Create Task
</button>

<h3 style={{marginTop:"20px"}}>Your Tasks</h3>

{tasks.map(task => (

<div key={task._id} style={taskCard}>

<b>{task.title}</b>
<p>{task.description}</p>

<button onClick={()=>updateTask(task._id)} style={editBtn}>
Edit
</button>

<button onClick={()=>deleteTask(task._id)} style={deleteBtn}>
Delete
</button>

</div>

))}

</div>

)}

</div>

</div>

)

}

const input = {
width:"100%",
padding:"10px",
marginBottom:"10px",
borderRadius:"5px",
border:"1px solid #ccc"
}

const primaryBtn = {
width:"100%",
padding:"10px",
background:"#4CAF50",
color:"white",
border:"none",
borderRadius:"5px",
cursor:"pointer"
}

const logoutBtn = {
background:"#ff4d4d",
color:"white",
border:"none",
padding:"8px 15px",
borderRadius:"5px",
marginBottom:"15px"
}

const switchBtn = {
padding:"8px 15px",
background:"#4CAF50",
color:"white",
border:"none",
borderRadius:"5px"
}

const switchBtnBlue = {
padding:"8px 15px",
background:"#2196F3",
color:"white",
border:"none",
borderRadius:"5px"
}

const taskCard = {
border:"1px solid #4a3838",
padding:"10px",
borderRadius:"5px",
marginBottom:"10px"
}

const editBtn = {
padding:"5px 10px",
marginRight:"5px",
background:"#2196F3",
color:"white",
border:"none",
borderRadius:"5px"
}

const deleteBtn = {
padding:"5px 10px",
background:"#ff4d4d",
color:"white",
border:"none",
borderRadius:"5px"
}

export default App