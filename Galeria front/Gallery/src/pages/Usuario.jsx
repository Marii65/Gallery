export default function Usuario(){

 const usuario = JSON.parse(localStorage.getItem("usuario"));

 return(

  <div>

   <h1>Perfil</h1>

   <p>Nome: {usuario?.nome}</p>
   <p>Email: {usuario?.email}</p>

  </div>

 )

}