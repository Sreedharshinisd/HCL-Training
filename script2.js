async function fun(){
    let response=await fetch('d4.txt');
    let tt=await response.text();
    document.getElementById('txt').innerHTML=tt;
}
fun();