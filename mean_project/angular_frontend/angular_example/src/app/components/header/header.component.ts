import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.css','../../../assets/css/bootstrap.min.css','../../../assets/css/animate.css','../../../assets/css/aos.css','../../../assets/css/bootstrap-datepicker.css','../../../assets/css/jquery.timepicker.css','../../../assets/css/fancybox.min.css','../../../assets/css/style.css','../../../assets/fonts/ionicons/css/ionicons.min.css','../../../assets/fonts/fontawesome/css/font-awesome.min.css'
  ]
})
export class HeaderComponent {
  myScriptElement: HTMLScriptElement;
  

   //creating a student array 
   StudentArray : any[] = [];
   isResultLoaded = false;
   isUpdateFormActive = false;
   public nouser="No such user exists. Kindly check the credentials";
   public userFound="Login successful";
   public registered = "Registration successfull";
 
   name : string="";
   email  : string="";
   phone : string="";
   passwrd : string="";
   _id : string="";
 
 
   constructor(private http:HttpClient)
   {
     this.myScriptElement = document.createElement("script");
     this.myScriptElement.src = "../../../assets/js/main.js";
     document.body.appendChild(this.myScriptElement);

     this.myScriptElement = document.createElement("script");
     this.myScriptElement.src = "../../../assets/js/jquery-3.3.1.min.js";
     document.body.appendChild(this.myScriptElement);


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
       "phone" : this.phone,
       "passwrd" : this.passwrd
     }
 
     this.http.post('http://localhost:5000/api/user/send',bodyData).subscribe((resultData:any)=>{
       console.log(resultData);
       alert(this.registered);
     })
   }
  
   verify(){
    let bodyData = {
      "email" : this.email,
      "passwrd" : this.passwrd
      /*Pending*/
    }
    this.http.put('http://localhost:5000/api/user/login',bodyData)
       .subscribe((resultData:any)=>{
 
        if(resultData=="null")
        {
          alert(this.nouser);
        }
        else{
          console.log(resultData);
          alert(this.userFound);
        };    
   });
  }
   save(){
 
      if(this._id=='')
     {
       this.register();
       alert(this.registered);
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
         alert("Your record has been updated");
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
