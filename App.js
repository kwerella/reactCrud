import {React,Component} from "react";
import './style.css';

var selectedClass;
var a;
var b;

class App extends Component{

  
 constructor(){
  super();
  
  this.state={
    employeeData : [],
    filterData : [],
    isfilterclicked : false,
    class:{
      A : false,
      B : false,
      C : false,
    },
    
   
  };
  this.onChangeValue = this.onChangeValue.bind(this);
 }

 onChangeValue(event) {

  selectedClass = event.target.value;
}

 handleSubmit = (e) => {
  e.preventDefault();
  let employeeData = this.state.employeeData;
  let studentname = this.refs.studName.value;
  let score = this.refs.studScore.value;
  let sclass = selectedClass;
  
 
  let newstudent = {
    "studName" : studentname,
    "score": score,
    "class": sclass
  }
  employeeData.push(newstudent)

  this.setState({
    employeeData : employeeData
  })

  this.refs.myform.reset();
 }

  handleFilter = (i) => {
    let classs = this.state;
  classs.class[b] = a;
  this.setState(classs)
  console.log(this.state.class)

  
  this.state.filterData = [];
  let studentData = this.state.employeeData;
  let filterData = this.state.filterData;
  this.state.isfilterclicked = true;
  
   
if(parseInt(this.refs.startscore.value) < parseInt(this.refs.endscore.value)){
  
 for(let item in studentData){

  if(this.refs.startscore.value <= studentData[item].score && this.refs.endscore.value >= studentData[item].score){
    let classs = this.state;
    console.log("item is greater")
    if(classs.class['A'] === true && studentData[item].class === 'A'){
      
       filterData.push(studentData[item]);
    }
    else if(classs.class['B'] === true && studentData[item].class === 'B'){
      filterData.push(studentData[item]);
    }
   else if(classs.class['C'] === true && studentData[item].class === 'C'){
      filterData.push(studentData[item]);
    }

  }
 }
 
 

  console.log(filterData)
}else{
alert("end score should be greater than start score")
}
  }

 handleDelete = (i) => {
 let studentData = this.state.employeeData;
 studentData.splice(i,1);
 this.setState({
  employeeData: studentData
 })
 }

 handleCheckbox = (event) =>{
 a = event.target.checked;
 b = event.target.value;
 let classs = this.state;
 classs.class[b] = a;
 this.setState(classs)
 }
 
 render(){
  let studentData = this.state.isfilterclicked ?  this.state.filterData : this.state.employeeData;
  console.log("page render")
  console.log(studentData);
  return(
    <>
    <div className="container">
    <form ref="myform">
      <div className="container">
      <label>Student Name</label>
      <input type="text" ref="studName" placeholder="Enter Name"/><br></br>
      <label>Score</label>
      <input type="number" ref="studScore" placeholder="Enter Score"/><br></br>
      <label>Class</label>
      <span onChange={this.onChangeValue}>
      <input type="radio" value="A" name="class" /> A
        <input type="radio" value="B" name="class" /> B
        <input type="radio" value="C" name="class" /> C</span></div>
      <div className="container">
      <button type="submit" onClick={e => this.handleSubmit(e)}>Create Record</button>
      </div>
    </form>
<div className="tablediv">
      <h5>Filter table</h5>
    
      <input type="number" ref="startscore" placeholder="From Score"/>
    
      <input type="number" ref="endscore" placeholder="To Score"/>

      <input type="checkbox" name="filterClass" value = 'A'  onChange={this.handleCheckbox} checked={this.state.class.A}/>A
      <input type="checkbox" value = 'B' name="filterClass" onChange={this.handleCheckbox} checked={this.state.class.B}/>B
      <input type="checkbox" value = 'C' name="filterClass" onChange={this.handleCheckbox} checked={this.state.class.C}/>C

      <button onClick={e => this.handleFilter(e)}>Filter</button>
  
       
    <table>
      <tr>
      <th>Student Name</th>
      <th>Score</th>
      <th>Class</th>
      <th></th>
      </tr>
      {
         
        studentData.map((data,i)=>
        
        <tr key={i} className={data.class}>
          <td>{data.studName}</td>
          <td>{data.score}</td>
          <td>{data.class}</td>
          
          <td>
            <button onClick={e => this.handleDelete(e)}>Delete</button></td>
        </tr>
        )
      }
    </table>
    </div>
    </div>
    </>
  )
 }
}

export default App;