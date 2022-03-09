import { useState } from "react";
import { Row, Col, Container, Card, Table, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteConfirmation from "./shared/DeleteConfirmation";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [fruits, setFruits] = useState([
    { id: 1, name: "Apple" },
    { id: 2, name: "Orange" }
  ]);
  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [fruitMessage, setFruitMessage] = useState(null);
  const showDeleteModal = ( id) => {
    setId(id);
    setFruitMessage(null);
      setDeleteMessage(`Are you sure you want to delete this client`);
    setDisplayConfirmationModal(true);
  };
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };
  // Handle the actual deletion of the item
  const submitDelete = (id) => {
      setFruitMessage(`The client was deleted successfully.`);
      setFruits(fruits.filter((fruit) => fruit.id !== id));
    setDisplayConfirmationModal(false);
  };
  return (
    <Container className="mt-4">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <h1>Reusable Delete Confirmation Modal</h1>
          <Card className="mt-2">
            <Card.Header>Fruits</Card.Header>
            <Card.Body>
              {fruitMessage && <Alert variant="success">{fruitMessage}</Alert>}
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th style={{ width: "120px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fruits.map((fruit) => {
                    return (
                      <tr key={fruit.id}>
                        <td>{fruit.id}</td>
                        <td>{fruit.name}</td>
                        <td className='text-center'>
                          <FontAwesomeIcon icon={faTrash} className="text-danger cursor" onClick={() => showDeleteModal(fruit.id)} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={id} message={deleteMessage}  />
    </Container>
  );
};
export default App;