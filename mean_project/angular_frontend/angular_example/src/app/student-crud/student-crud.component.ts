import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-student-crud',
  templateUrl: './student-crud.component.html',
  styleUrls: ['./student-crud.component.css']
})
export class StudentCrudComponent {

  //creating a student array 
  StudentArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  name : string="";
  email  : string="";
  phone : string="";
  _id : string="";


  constructor(private http:HttpClient)
  {
    this.getAllUsers();
  }

  ngOnInit():void
  {

  }

  getAllUsers(){

    this.http.get("http://localhost:5000/api/users")
    .subscribe((resultData:any)=>
    {

      this.isResultLoaded = true;
      console.log(resultData);
      /*function func(){ 
        const res_array = []; 
        for(let i in resultData) { 
           res_array.push([i,resultData[i]]); 
        }; 
        console.log(res_array);
     };*/
      this.StudentArray = resultData; 
    });
    console.log(this.StudentArray);
  }

  register(){
    let bodyData = {
      "name" : this.name,
      "email" : this.email,
      "phone" : this.phone
    }

    this.http.post('http://localhost:5000/api/user/send',bodyData).subscribe((resultData:any)=>{
      console.log(resultData);
      alert("Student registered successfully");
      this.getAllUsers();
    })
  }

  save(){


    if(this._id=='')
    {
      this.register();
    }
    else{
      this.UpdateRecords();
    }
  }

  UpdateRecords()
  {
      let bodyData = {
        "name" : this.name,
        "email" : this.email,
        "phone" : this.phone,
        "id" : this._id
      };

      this.http.put('http://localhost:5000/api/user/update',bodyData)
      .subscribe((resultData:any)=>{

        console.log(resultData);
        alert("Student record updated");
        this.getAllUsers();
      });
  }

  setUpdate(data : any){

    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;

    this._id = data._id;
    this.UpdateRecords();  
  }

  setDelete(data:any)
  {
    const options = {
      body: {
        id: data._id
      }
    };
    
    
    this.http.delete('http://localhost:5000/api/user/delete', options).subscribe((resultData:any)=>{

    console.log(resultData);
    alert("Record deleted");
    this.getAllUsers();
    });
  }
}
