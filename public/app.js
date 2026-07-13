async function pair(){

    const number = document.getElementById("number").value;
    const btn = document.getElementById("btn");
    const loading = document.getElementById("loading");
    const result = document.getElementById("result");


    if(!number){
        result.innerHTML = "❌ Enter number";
        return;
    }


    btn.disabled = true;
    result.innerHTML = "";
    loading.innerHTML = "⏳ Starting pairing...";


    try{

        let start = await fetch("/pair",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                number:number
            })
        });


        let startData = await start.json();


        if(!startData.status){

            result.innerHTML = startData.message;
            btn.disabled=false;
            return;

        }


        loading.innerHTML =
        "⌛ Waiting for code...";


        let tries = 0;


        let timer = setInterval(async()=>{


            tries++;


            let res = await fetch(
                "/code/" + number
            );


            let data = await res.json();


            if(data.code){


                clearInterval(timer);


                result.innerHTML = data.code;


                navigator.clipboard.writeText(data.code);


                loading.innerHTML =
                "✅ Code copied";


                btn.disabled=false;

            }


            if(tries >= 30){

                clearInterval(timer);

                loading.innerHTML =
                "❌ Timeout, try again";

                btn.disabled=false;

            }


        },1000);



    }catch(err){

        loading.innerHTML="";
        result.innerHTML =
        "❌ "+err.message;

        btn.disabled=false;

    }

}
