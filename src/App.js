import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './redux/reducers/count-reducer';
import { addTodo, removeTodo, editTodo } from './redux/reducers/todo-list-reducer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css'
function App() {
  const reduxData = useSelector((state) => state.counter)
  const todoList = useSelector((state) => state.todoList)
  const [todoData, setTodoData] = useState('')
  const [todoListData, setTodoListData] = useState([])
  const [editData, setEditData] = useState({ id: '', name: '' });
  const [editId, setEditId] = useState();
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (item, index) => {
    setShow(true)
    setEditData(item)
    setEditId(item)
  };

  useEffect(() => {
    setTodoListData(todoList.todo)
  }, [todoList.todo])
  const updateEvent = () => {
    dispatch(editTodo(editData))
    setShow(false)
  }
  const submitToDo = (e) => {
    e.preventDefault()
    dispatch(addTodo(todoData))
  }
  return (
    <div className="App">
      {/* <h1>{reduxData.value}</h1>
      <button onClick={() => dispatch(increment())}>Increament</button>
      <button onClick={() => dispatch(decrement())}>Decreament</button> */}
      <Container>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <div className='wrapper-css'>
              <h1 style={{ color: '#fff' }}>Grocery List</h1>
              <Row>
                <Col >
                  <form onSubmit={submitToDo}>
                    <div style={{ display: 'flex' }}>
                      <Form.Control
                        value={todoData} onChange={(e) => setTodoData(e.target.value)}
                      />
                      <Button variant="primary" type='submit'>Add Product</Button>
                    </div>
                  </form>
                  <div>
                    {
                      todoListData.length > 0 ? todoListData.map((item, index) => {
                        return (
                          <li key={item.id} className='list-css'>
                            {item.name}
                            <div>
                              <i class="bi bi-pencil-fill edit-icon" onClick={() => handleShow(item, index)}></i>
                              <i onClick={() => dispatch(removeTodo(item.id))} class="bi bi-trash3-fill delete-icon"></i>
                            </div>
                          </li>
                        )
                      }) : ""
                    }
                  </div>
                </Col>
              </Row>
              <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                  <Form.Control
                    value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={updateEvent}>
                    Update
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default App;
