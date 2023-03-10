var form=document.getElementById('my-form');

form.addEventListener('submit',SaveToLocalStorage);

function SaveToLocalStorage(event){
    event.preventDefault();

    const name=event.target.username.value;
    const email=event.target.useremail.value;
    const mobno=event.target.userphonno.value;

    const obj= { 
        name,
        email,
        mobno
    }
    
    axios.post("https://crudcrud.com/api/8c64c16885ba4f818ffd6fbab8ce23aa/appointmentData",obj)
    .then((response)=>{
        showUserOnScreen(response.data)
        
    })
    .catch((err)=>{
        document.body.innerHTML+="<h2>Something went Wrong</h2>";
        console.log(err);
    })

}

window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/8c64c16885ba4f818ffd6fbab8ce23aa/appointmentData")
    .then((response)=>{
        for (var i=0;i<response.data.length;i++){
            showUserOnScreen(response.data[i])
        }
    })
    .catch((err)=>{
        console.log(err);
    })
})

function showUserOnScreen(obj){
    const parentElem=document.getElementById('userlist');
    const childElem=document.createElement('li');
    childElem.textContent=obj.name +" - "+ obj.email+" - "+obj.mobno;

    const deleteButton=document.createElement('input');
    deleteButton.type='button';
    deleteButton.value='DELETE';
    deleteButton.onclick=()=>{
        axios.delete(`https://crudcrud.com/api/8c64c16885ba4f818ffd6fbab8ce23aa/appointmentData/${obj._id}`)
    .then((response)=>{
        parentElem.removeChild(childElem);
          
    })
    .catch((err)=>{
        document.body.innerHTML+="<h2>Something went Wrong</h2>";
        console.log(err);
    })
    
    }
    const editButton=document.createElement('input');
    editButton.type='button';
    editButton.value='EDIT';
    editButton.onclick=()=>{
        axios.delete(`https://crudcrud.com/api/8c64c16885ba4f818ffd6fbab8ce23aa/appointmentData/${obj._id}`)
        .then((response)=>{
        parentElem.removeChild(childElem);
        document.getElementById('username').value=obj.name
        document.getElementById('useremail').value=obj.email
        document.getElementById('userphonno').value=obj.mobno
      
        })
        .catch((err)=>{
            document.body.innerHTML+="<h2>Something went Wrong</h2>";
            console.log(err);
        })

    }

    childElem.appendChild(deleteButton);
    childElem.appendChild(editButton);
    parentElem.appendChild(childElem);

}

    