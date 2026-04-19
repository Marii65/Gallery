export default function Usuario(){

    // pagina nao utilizada no momento
 const usuario = JSON.parse(localStorage.getItem("usuario"));

 return(

  <div>

   <h1>Perfil</h1>

   <p>Nome: {usuario?.nome}</p>
   <p>Email: {usuario?.email}</p>

  </div>

 )
 // pagina nao utilizada no momento 
}