// import data from '../data/data.json'
import './todo_component.css';
import { useState, useRef } from 'react';





const Todo_component = ({data}) => {
    const [isDisabled, setIsDisabled] = useState(true);
    const textContentRef = useRef(null);
    const isImportantRef = useRef(null);
    const timeRef = useRef(null);

    const [time, setTime] = useState();
    const [textInput, setTextInput] = useState();
    const [isChecked, setIsChecked] = useState();


    const handleEventChange = (event) => {
        this.setState({ [event.target.name]: event.target.value});
    }

    const handleDelete = (e,id) =>{

        const deletedata = async () =>{
          await fetch(`http://localhost:3001/data/${id}`,{
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            }
            })
            .then((res)=>(console.log))
            .catch((err)=>(console.log))
            window.location.reload()
            
      }
      deletedata()
      }

    const handleUpdate = (e, item) => {

        const update = async () =>{
            const reqbody = data.filter(el => el.id === item.id)[0];
            reqbody.content = textInput;
            reqbody.scheduledTime = time;
            reqbody.importance = isChecked;


            console.log(reqbody);
    
            fetch(`http://localhost:3001/data/${item.id}`,{
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(reqbody) 
              })
              .then((res)=>(console.log))
              .catch((err)=>(console.log))
          }
        update()
    }


    return(
        <div className="todo_wrapper">
            {data.map(item => <div key={item.id}>
            <div className="todo_component_wrapper">
                <input defaultChecked={item.importance} type="checkbox" ref={isImportantRef} onChange={(e) => {setIsChecked(e.target.checked)
                console.log(isChecked)}} disabled={isDisabled}></input>
                <input type="time" defaultValue={item.scheduledTime} ref={timeRef} onChange={(e) => setTime(e.target.value)} onChange={(e) => {setTime(e.target.value)
                console.log(time)}} disabled={isDisabled}></input>
                <input className="textContent" defaultValue={item.content} ref={textContentRef} onChange={(e) => {setTextInput(e.target.value)
                console.log(textInput)}} disabled ={isDisabled}></input>
                <div className="button_wrapper">
                    <button onClick={(e)=> {
                        setIsDisabled(!isDisabled)
                        (!isDisabled ? handleUpdate(e, item) 
                    : null)}}>수정하기</button>
                    <button onClick={(e) => handleDelete(e,item.id)}>삭제하기</button>
                </div>
            </div>

        </div>)}
        </div>
    )
}

export default Todo_component;