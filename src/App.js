import logo from './logo.svg';
import './App.css';
import Todo_component from './components/todo_component';
import { useRef, useEffect, useState } from 'react';
import { v4 } from 'uuid';



function App() {
  const textContentRef = useRef();
  const isImportantRef = useRef();
  const timeRef = useRef();
  const [data, setData] = useState([]);
  const [isChecked, setIsChecked] = useState(false)


  useEffect(()=>{
    const getdata = async() =>{
      await fetch('http://localhost:3001/data',{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res)=>res.json())
      .then((result)=>setData(result))
    }
    getdata()

  },[])


  const submitHandler = (e) => {
    e.preventDefault();
    const textContent = textContentRef.current.value;
    const isImportant = isChecked;
    const time = timeRef.current.value;

    const reqbody = {
      "id": v4(),
      "content": textContent,
      "scheduledTime": time,
      "importance": isImportant
    }

    const post = async () =>{
      await fetch('http://localhost:3001/data',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqbody) 
        })
        .then((res)=>(console.log))
        .catch((err)=>(console.log))
        window.location.reload()
    }
    post()

    console.log(textContent, isImportant, time);
  } 

  
  return (
    <div className="App">
      <h1>Todo App</h1>
      <form onSubmit={submitHandler} className="form_wrapper"> 
      <div className="input_wrapper">
        <div>
            <label htmlFor="checkbox" className="label">중요 여부</label>
            <input type="checkbox" name="checkbox" onClick = {() => setIsChecked(!isChecked)}className="isImportant" ref={isImportantRef}></input>
          </div>
          <div>
            <label htmlFor="time" className="label">목표 시간</label>
            <input type="time" name="time" className="time" ref={timeRef}></input>
          </div>
          <div>
            <label htmlFor="text" className="label">내용</label>
            <input type="text" name="text" className="textContent" ref={textContentRef}></input>
          </div>
      </div>
      <div className="button_wrapper">
        <button className="submit_button">할일 <br/> 추가하기</button>
      </div>

      </form>
      <Todo_component data={data}/>
    </div>
  );
}

export default App;
