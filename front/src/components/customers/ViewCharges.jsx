import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import axios from 'axios';

const ViewCharges = ({ customerId, onClose }) => {
  const [customerCharges, setCustomerCharges] = useState([]);

  useEffect(() => {

    const getCharges = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/clientes/cargo/${customerId}`);
        setCustomerCharges(response.data);
      } catch (error) {
        console.error('Error al obtener los cargos del cliente:', error.message);
      }
    };

    getCharges();
  }, [customerId]);

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ver Cargos del Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {customerCharges.length === 0 ? (
          <p>No hay cargos para mostrar.</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Monto</th>
                <th>Descripción</th>
                <th>Fecha del Cargo</th>
              </tr>
            </thead>
            <tbody>
              {customerCharges.map((charge) => (
                <tr key={charge.id}>
                  <td>{charge.id}</td>
                  <td>{charge.amount}</td>
                  <td>{charge.description}</td>
                  <td>{charge.operation_date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewCharges;
