import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

const EditCustomer = ({ customer, onUpdateCustomer, onCloseForm }) => {
  const [editedCustomer, setEditedCustomer] = useState(customer);

  useEffect(() => {
    setEditedCustomer(customer);
  }, [customer]);

  const handleUpdateCustomer = async () => {
    try {
        const updatedData = {
          id: editedCustomer.id,
          name: editedCustomer.name,
          last_name: editedCustomer.last_name,
          email: editedCustomer.email,
          phone_number: editedCustomer.phone_number,
          address: {
            city: editedCustomer.address ? editedCustomer.address.city : '',
            state: editedCustomer.address ? editedCustomer.address.state : '',
            line1: editedCustomer.address ? editedCustomer.address.line1 : '',
            postal_code: editedCustomer.address ? editedCustomer.address.postal_code : '',
            country_code: editedCustomer.address ? editedCustomer.address.country_code : '',
          },
        };
    
        await onUpdateCustomer(updatedData);
        onCloseForm();
        alert('Los cambios han sido guardados');
      } catch (error) {
        console.error('Error al actualizar el cliente:', error);

      }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer({ ...editedCustomer, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer((prevCustomer) => ({
      ...prevCustomer,
      address: {
        ...(prevCustomer.address || {}), 
        [name]: value,
      },
    }));
  };

  return (
    <div>
      <h4>Editar Cliente</h4>
      <Form>
        <Form.Group as={Row} controlId="formName">
          <Form.Label column sm="2">Nombre</Form.Label>
          <Col sm="10">
            <Form.Control type="text" name="name" value={editedCustomer.name} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formLastname">
          <Form.Label column sm="2">Apellido</Form.Label>
          <Col sm="10">
            <Form.Control type="text" name="last_name" value={editedCustomer.last_name} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formEmail">
          <Form.Label column sm="2">Email</Form.Label>
          <Col sm="10">
            <Form.Control type="email" name="email" value={editedCustomer.email} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPhoneNumber">
          <Form.Label column sm="2">Teléfono</Form.Label>
          <Col sm="10">
            <Form.Control type="text" name="phone_number" value={editedCustomer.phone_number} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formCity">
          <Form.Label column sm="2">Ciudad</Form.Label>
          <Col sm="10">
          <Form.Control 
            type="text" 
            name="city"
            value={editedCustomer.address ? editedCustomer.address.city : ''}
            onChange={handleAddressChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formState">
          <Form.Label column sm="2">Estado</Form.Label>
          <Col sm="10">
            <Form.Control 
            type="text" 
            name="state" 
            value={editedCustomer.address ? editedCustomer.address.state : ''} 
            onChange={handleAddressChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formLine1">
          <Form.Label column sm="2">Dirección</Form.Label>
          <Col sm="10">
            <Form.Control 
            type="text" 
            name="line1" 
            value={editedCustomer.address ? editedCustomer.address.line1 : ''} 
            onChange={handleAddressChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPostalCode">
          <Form.Label column sm="2">Código Postal</Form.Label>
          <Col sm="10">
            <Form.Control 
            type="text" 
            name="postal_code" 
            value={editedCustomer.address ? editedCustomer.address.postal_code : ''} 
            onChange={handleAddressChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formCountryCode">
        <Form.Label column sm="2">Código de País</Form.Label>
        <Col sm="10">
          <Form.Control
            as="select"
            name="country_code"
            value={editedCustomer.address ? editedCustomer.address.country_code : ''}
            onChange={handleAddressChange}
          >
            <option value="AR">AR</option>
            <option value="MX">MX</option>
          </Form.Control>
        </Col>
      </Form.Group>
      </Form>
      <Button variant="primary" onClick={handleUpdateCustomer} className="mr-4">
        Guardar Cambios
      </Button>
      <Button variant="secondary" onClick={onCloseForm} className="ml-4">
        Cerrar
      </Button>
    </div>
  );
};

export default EditCustomer;
