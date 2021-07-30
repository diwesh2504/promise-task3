function disp(){
    let movie_name=document.getElementById("movie-name");
    let para=document.getElementById("para");
    if(movie_name.value.length===0){
        alert("Name Cannot be Empty")
        window.location.reload()
    }
    let promise=new Promise((resolve,reject)=>{
        fetch(`http://www.omdbapi.com/?apikey=83ffb022&t=${movie_name.value}`)
        .then(res=>res.json())
        .then(res=>resolve(res))
        .catch(err=>reject(err))
    })
    promise.then((res)=>onRes(res),(err)=>{console.log(err)})
    document.getElementById("search").disabled=true;
}

function onRes(res){
    console.log(res)
    let ol=document.getElementById("movie_json")
    let poster=document.getElementById("poster")
    let ratings=document.getElementById("ratings")
    for (let i in res){
        if(i==="Poster"){
            poster.src=res[i]
            
        }
        else if(i==="Ratings"){
            let s=document.createElement('p')
            s.innerHTML='<b>Ratings:</b>'
            ratings.appendChild(s)
            for(j in res[i]){
                console.log(res[i][j])
                let p=document.createElement("p")
                
                for(let k in res[i][j]){
                   
                    p.innerText+=`${res[i][j][k]} `
                    
                }
                ratings.append(p)
                
            }
        }
        else{let li=document.createElement('li');
        li.innerHTML=`<b>${i}</b> :${res[i]}`;
        ol.appendChild(li)}
    }

}