async function Display(){
    let res = await fetch("http://localhost:3000/tasks");
    let data = await res.json();
    document.querySelector('#display').innerHTML="";
    let id=[];
    data.forEach((element)=>{
        let tasks = document.createElement('button');
        let deleteButton = document.createElement('button');
        let box= document.createElement('div');
        deleteButton.innerText = "DELETE";
        
        tasks.innerText = element.title;
        if(element.status==false)
        tasks.style.color="red";
        else 
        tasks.style.color="green";
        tasks.addEventListener('click',()=>{
                id.push(element.id);
            
            localStorage.setItem('tasks',JSON.stringify(id));
            window.location.href="./edit.html";
        });
        deleteButton.addEventListener('click', async()=>{
                
                let resp = await fetch(`http://localhost:3000/tasks/${element.id}`,{
                    method:"DELETE"
                });
                let dat = await resp.json();
                Display();
        });
        box.append(tasks,deleteButton);
        document.querySelector('#display').append(box);
    });
}
Display();
document.querySelector('form').addEventListener('submit',()=>{
    let title = document.getElementById('title').value;
    let status = document.getElementById('status').checked;
    AddDetails(title,status);
    Display();
});
async function AddDetails(title,status){

    let body={
        title,
        status
    };
    let post = await fetch('http://localhost:3000/tasks',{
            method:"POST",
            body:JSON.stringify(body),
            headers:{
                "Content-Type":"application/json"
            }
        });
    let data = post.json();

}