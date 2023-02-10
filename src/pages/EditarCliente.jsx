import { Form, useLoaderData, useNavigate, useActionData, redirect } from "react-router-dom"
import Formulario from "../components/Formulario"
import { obtenerCliente, actualizarCliente } from "../data/clientes"

export async function loader({params}){
  var cliente = await obtenerCliente(params.id)

  if(Object.values(cliente).length === 0){
    throw new Response('', {
      status: 404,
      statusText: 'No hay Resultados'
    })
  }

  return cliente
}

export async function action({request, params}) {
  const formData = await request.formData()
  const datos = Object.fromEntries(formData)

  const email = formData.get('email')

  const errores = []
  if(Object.values(datos).includes('')) {
    errores.push('Todos los campos son obligatorios')
  }
  
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if(!regex.test(email)){
    errores.push('El email no es válido')
  }
  
  if(Object.keys(errores).length){
    return errores
  }

  await actualizarCliente(params.id, datos)

  return redirect('/')
}

const EditarCliente = () => {

  const navigate = useNavigate()
  const cliente = useLoaderData()
  const errores = useActionData()
  const {id} = cliente

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Modificando el cliente #{id}</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() => { navigate(-1)}}
        >
          Volver
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {errores?.length && errores.map( (error, i) => <Error key={i}>{error}</Error>)}

        <Form
          method="post"
          noValidate
        >
          <Formulario cliente={cliente}/>
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value="Actualizar Cliente"
          >
          </input>
        </Form>
      </div>
    </>
  )
}

export default EditarCliente