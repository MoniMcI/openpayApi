import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const GenerateCharge = ({ customerId, onClose, onChargeGenerated }) => {
  const [chargeRequest, setChargeRequest] = useState({
    method: 'store', 
    amount: 0, 
    description: '', 
    order_id: '', 
    due_date: '', 
  });

  const handleGenerateCharge = async () => {
    try {
      console.log('chargeRequest', chargeRequest);
      const response = await axios.post(`http://localhost:3001/clientes/cargo/${customerId}`, chargeRequest);
      if (response.status === 200) {
        console.log('Cargo generado con éxito:', response.data);
        onChargeGenerated(response.data);
        onClose();
      } else {
        console.error('Error al generar el cargo:', response.statusText);
      }
    } catch (error) {
      console.error('Error al generar el cargo:', error.message);
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Generar Cargo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* inputs del cargo */}
          <Form.Group controlId="formAmount">
            <Form.Label>Monto</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el monto"
              value={chargeRequest.amount}
              onChange={(e) => setChargeRequest({ ...chargeRequest, amount: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la descripción"
              value={chargeRequest.description}
              onChange={(e) => setChargeRequest({ ...chargeRequest, description: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formOrderID">
            <Form.Label>Order ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el Order ID"
              value={chargeRequest.order_id}
              onChange={(e) => setChargeRequest({ ...chargeRequest, order_id: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formDueDate">
            <Form.Label>Fecha de Vencimiento</Form.Label>
            <Form.Control
              type="date"
              value={chargeRequest.due_date}
              onChange={(e) => setChargeRequest({ ...chargeRequest, due_date: e.target.value })}
            />
          </Form.Group>
          {/* fin inputs */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleGenerateCharge}>
          Generar Cargo
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GenerateCharge;
