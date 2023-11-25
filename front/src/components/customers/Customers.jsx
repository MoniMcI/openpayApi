import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ListGroup } from 'react-bootstrap'; 
import NewCustomer from './NewCustomer';
import EditCustomer from './EditCustomer';
import GenerateCharge from './GenerateCharge';
import ViewCharges from './ViewCharges';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [showForm, setShowForm] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showGenerateCharge, setShowGenerateCharge] = useState(false);
  const [customerIdForCharge, setCustomerIdForCharge] = useState(null);
  const [showChargesModal, setShowChargesModal] = useState(false);
  const [showChargesCustomerId, setShowChargesCustomerId] = useState(null);

  useEffect(() => {
    // traigo el listado de clientes
    axios.get('http://localhost:3001/clientes')
      .then(response => setCustomers(response.data))
      .catch(error => console.error('Error al obtener la lista de clientes:', error));
  }, []); 


  const handleShowGenerateCharge = (customerId) => {
    setShowGenerateCharge(true);
    setCustomerIdForCharge(customerId);
  };

  const handleCloseGenerateCharge = () => {
    setShowGenerateCharge(false);
    setCustomerIdForCharge(null);
  };

  const handleShowCharges = (customerId) => {
    console.log(`Mostrar cargos para el cliente con ID: ${customerId}`);
    setShowChargesCustomerId(customerId);  
    setShowChargesModal(true);  
  };



  const handleAgregarCliente = async (nuevoCliente) => {
    try {
        const clienteSinCuenta = {
            ...nuevoCliente,
            requires_account: false,
          };
        console.log("nuevoCliente", clienteSinCuenta);

        const response = await axios.post('http://localhost:3001/clientes', clienteSinCuenta);
        if (response.status === 200) {
          setCustomers([...customers, response.data]);
          console.log("response.data", response.data);
        } else {
          console.error('Error al agregar el cliente:', response.statusText);
        }
      } catch (error) {
        console.error('Error al agregar el cliente:', error.message);
      }
  };

  
  const handleOpenEditForm = (customerId) => {
    console.log('Abrir formulario de edición para el cliente con ID:', customerId);
    const customerToEdit = customers.find(c => c.id === customerId);
    console.log('Cliente seleccionado para editar:', customerToEdit);
    setEditingCustomer(customerToEdit);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    console.log('Cerrar formulario');
    setEditingCustomer(null);
    setShowForm(false);
  };

  const handleUpdateCustomer = async (updatedCustomer) => {
    try {

        if (!editingCustomer) {
            console.error('No hay cliente en edición.');
            return;
          }

      console.log("updatedCustomer", updatedCustomer);
      const response = await axios.put(`http://localhost:3001/clientes/${updatedCustomer.id}`, updatedCustomer);
      if (response.status === 200) {
        // Actualizar la lista de clientes después de la modificacion
        const updatedCustomers = customers.map(c => (c.id === updatedCustomer.id ? updatedCustomer : c));
        setCustomers(updatedCustomers);
        setEditingCustomer(null); 
      } else {
        console.error('Error al actualizar el cliente:', response.statusText);
      }
    } catch (error) {
      console.error('Error al actualizar el cliente:', error.message);
    }
  };
 

  const handleDeleteCustomer = async (clienteId) => {
    try {
      const confirmacion = window.confirm('¿Está seguro de que desea eliminar este cliente?');
      
      if (confirmacion) {
        console.log("clienteid delete", clienteId)
        const response = await axios.delete(`http://localhost:3001/clientes/${clienteId}`);
        if (response.status === 200) {
          const updatedCustomers = customers.filter((c) => c.id !== clienteId);
          setCustomers(updatedCustomers);
        } else {
          console.error('Error al eliminar el cliente:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error al eliminar el cliente:', error.message);
      alert("No se pudo eliminar al cliente");

    }
  };



  return (
    <div>
      <h1 className="mt-5">Openpay Integration App</h1>
      <h2 className="mt-5">Lista de Clientes</h2>
      <button className="btn btn-success mb-3" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
        {mostrarFormulario ? 'Ocultar Formulario' : 'Agregar Cliente'}
      </button>

      {mostrarFormulario && <NewCustomer onAgregarCliente={handleAgregarCliente} />}

 
      <ListGroup>
        {customers.map(customer => (
          <div key={customer.id}>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              {customer.name} - {customer.email} - {customer.id}
              <div>
                <Button variant="primary mx-3" onClick={() => handleShowGenerateCharge(customer.id)}>
                  Generar Cargo
                </Button>
                <Button variant="info mx-3" onClick={() => handleShowCharges(customer.id)}>
                  Ver Cargos
                </Button>                                  
                <Button variant="warning mx-3" onClick={() => handleOpenEditForm(customer.id)}>
                  Editar
                </Button>
                <Button variant="danger mx-3" onClick={() => handleDeleteCustomer(customer.id)}>
                  Eliminar
                </Button>
              
              </div>
            </ListGroup.Item>

            {/* Formulario de edición */}
            {editingCustomer && editingCustomer.id === customer.id && (
              <EditCustomer
                customer={editingCustomer}
                onUpdateCustomer={(updatedData) => handleUpdateCustomer(updatedData)}
                onCloseForm={handleCloseForm}
              />
            )}
            {/* Modal de generar cargos */}
            {showGenerateCharge && customerIdForCharge === customer.id && (
              <GenerateCharge
                customerId={customer.id}
                onClose={handleCloseGenerateCharge}
                onChargeGenerated={() => {}}
              />
            )}  
            {/* Modal de lista de cargos */}
            {showChargesModal && (
              <ViewCharges customerId={showChargesCustomerId} onClose={() => setShowChargesModal(false)} />
            )}                      
          </div>
        ))}
      </ListGroup>   
    </div>
  );
};

export default Customers;
