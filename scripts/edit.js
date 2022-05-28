(async function(){
    let id=JSON.parse(localStorage.getItem('tasks'));
   let res= await fetch(`http://localhost:3000/tasks/${id[0]}`);
   let data= await res.json();
   
   document.querySelector('#title').value=data.title;
   document.querySelector('#status').checked=data.status;

   document.querySelector('form').addEventListener('submit',()=>{
       let title = document.querySelector('#title').value;
       let status = document.querySelector('#status').checked;

       let body={
           title,
           status
       };

       (async function(){
           let resp= await fetch(`http://localhost:3000/tasks/${id[0]}`,{
           method:"PUT",
           body:JSON.stringify(body),
           headers:{
               "Content-Type":"application/json"
           }
       });
       let dat= await resp.json();
       })();
       window.location.href="./index.html";
   })
})();