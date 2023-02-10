const baseUrl = import.meta.env.VITE_API_URL

export async function obtenerClientes () {
  var data = await fetch(`${baseUrl}/clientes`)
  var clientes = await data.json()

  return clientes
}

export async function obtenerCliente (id) {
  var data = await fetch(`${baseUrl}/clientes/${id}`)
  var cliente = await data.json()

  return cliente
}

export async function agregarCliente(data){
  var result = await fetch(`${baseUrl}/clientes`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  await result.json()
}

export async function actualizarCliente(id, data){
  var result = await fetch(`${baseUrl}/clientes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  await result.json()
}

export async function eliminarCliente (id) {
  var result = await fetch(`${baseUrl}/clientes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  await result.json()
}