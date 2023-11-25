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

  const [validationErrors, setValidationErrors] = useState({});

  const handleGenerateCharge = async () => {
    try {

      const isValid = validateForm();
      if (!isValid) {
        console.error('El formulario no es válido');
        return;
      }

      console.log('chargeRequest', chargeRequest);
      const response = await axios.post(`http://localhost:3001/clientes/cargo/${customerId}`, chargeRequest);
      if (response.status === 200) {
        console.log('Cargo generado con éxito:', response.data);
        alert("Cargo generado con éxito");
        onChargeGenerated(response.data);
        onClose();
      } else {
        console.error('Error al generar el cargo:', response.statusText);
      }
    } catch (error) {
      console.error('Error al generar el cargo:', error.message);
    }
  };


  const validateForm = () => {
    const errors = {};

    if (chargeRequest.amount <= 0) {
      errors.amount = 'El monto debe ser mayor que cero';
    }

    if (!chargeRequest.description.trim()) {
      errors.description = 'La descripción es obligatoria';
    }

    if (!chargeRequest.order_id.trim()) {
      errors.order_id = 'El Order ID es obligatorio';
    }

    if (!chargeRequest.due_date) {
      errors.due_date = 'La fecha de vencimiento es obligatoria';
    }
    const currentDate = new Date();
    const dueDate = new Date(chargeRequest.due_date);
    if (dueDate <= currentDate) {
      errors.due_date = 'La fecha de vencimiento debe ser mayor a la fecha actual';
    }
  
    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
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
              isInvalid={!!validationErrors.amount}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la descripción"
              value={chargeRequest.description}
              onChange={(e) => setChargeRequest({ ...chargeRequest, description: e.target.value })}
              isInvalid={!!validationErrors.description}
            />
          </Form.Group>
          <Form.Group controlId="formOrderID">
            <Form.Label>Order ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el Order ID"
              value={chargeRequest.order_id}
              onChange={(e) => setChargeRequest({ ...chargeRequest, order_id: e.target.value })}
              isInvalid={!!validationErrors.order_id}
            />
          </Form.Group>
          <Form.Group controlId="formDueDate">
            <Form.Label>Fecha de Vencimiento</Form.Label>
            <Form.Control
              type="date"
              value={chargeRequest.due_date}
              onChange={(e) => setChargeRequest({ ...chargeRequest, due_date: e.target.value })}
              isInvalid={!!validationErrors.due_date}
            />
            <Form.Control.Feedback type="invalid">{validationErrors.due_date}</Form.Control.Feedback>
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
