import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import wretch from "wretch";
import { Table, Container, Row, Col, Button,Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import SimpleReactValidator from 'simple-react-validator';
// import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/fontawesome.min.css";

class App extends Component {
  constructor(props){
    super(props);
    this.validator = new SimpleReactValidator();
    this.state={
      UserData: [],
      modal: false,
      item:{"name":null,"dob":null,"address":null,"city":null,"state":null,"email":null,"mobile":null},
      update: false,
    };
}

toggle=() => {
  
  this.setState(prevState => ({
    modal: !prevState.modal
  }));
}

componentDidUpdate(prevProps, prevState){
  
  this.fetchData();
}

componentDidMount(){
  this.fetchData();
  }

  fetchData = () =>{
    wretch("http://localhost:5000/api/get")
    .get()
    .json(json => {
      this.setState({UserData : json})
    })
  }

  onChange = (e) =>{
    console.log("df:::",e.target.name,"::::",e.target.value);
    this.state.item[e.target.name] = e.target.value;
    this.setState({});
  }

  handleAdd = () => {
    this.setState({item : {"name":null,"dob":null,"address":null,"city":null,"state":null,"email":null,"mobile":null}});
    this.toggle();
  }

 handleSubmit = (e) =>{
  if (this.validator.allValid()) {
    if(this.state.update == true)
    {
      wretch(`http://localhost:5000/api/update/${this.state.item._id}`)
      .headers({ "Content-Type": "application/json", Accept: "text/plain" })
      .put(JSON.stringify(this.state.item))
      .res(response => {console.log("response",response)
              this.setState({}); })
     
    } 
    else
    {
      wretch('http://localhost:5000/api/create')
      .headers({ "Content-Type": "application/json", Accept: "text/plain" })
      .post(JSON.stringify(this.state.item))
      .res(response => {console.log("response",response)
              this.setState({}); })
     
    }
    this.setState({modal:false});
  } else {
    this.validator.showMessages();
    this.forceUpdate();
  }
 
 }

  handleDelete = (e,id) =>{
    wretch(`http://localhost:5000/api/remove/${id}`)
    .headers({"Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE","Access-Control-Allow-Origin": "*"})
    .options({mode : "cors"})
    .delete(JSON.stringify(this.state.item))
    .res(response =>{ console.log("response",response)
          this.setState({});
    })
  }

  handleUpdate = (e,user) => {
    this.state.item = user;
    
    this.setState({update: true});
    this.toggle();
  }


  render() {
    const {UserData,item} = this.state;
    console.log("UserData",JSON.stringify(item));
    const date = this.state.item["dob"] != null ? this.state.item["dob"].substr(0,10) : null ;
  return (
    <div >
      <Container>
      <br/>
      <br/>
        <Row>
          <Col className="text-right">
        <Button className="button" onClick={this.handleAdd}>Add</Button>
        </Col>
        </Row>

      <br/>
        <Row>
          <Col>
        <Table striped bordered>
     <thead>
     <tr>
       <th>Name</th>
       <th>Date of birth</th>
       <th>Address</th>
       <th>City</th>
       <th>State</th>
       <th>Mobile</th>
       <th>Email</th>
       <th></th>
    </tr>
    </thead>

       <tbody>
       { UserData.users != null && UserData.users.map(user =>{
       const date = user.dob.substr(0,10);
       return <tr>
         <td>{user.name}</td>
         <td>{date}</td>
         <td>{user.address}</td>
         <td>{user.city}</td>
         <td>{user.state}</td>
         <td>{user.mobile}</td>
         <td>{user.email}</td>
         <td><a href="#" onClick={(e) => this.handleUpdate(e,user)}><i className="fa fa-pencil-square-o"></i></a> &nbsp;
         <a href="#" onClick={(e) => this.handleDelete(e,user._id)}><i className="fa fa-trash" ></i></a></td>
       </tr>
        } )}
        
         </tbody>
     </Table>
     </Col>
     </Row>

     <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>User</ModalHeader>
          <ModalBody>
          <Form>
            <FormGroup>
              <Label >Name</Label>
              <Input type="text" name="name" id="name" onChange={this.onChange} value={this.state.item["name"]}  maxLength="100" placeholder="Name" />
              {this.validator.message('name', this.state.item["name"], 'required|alpha')}
            </FormGroup>
            <FormGroup>
              <Label>Date of birth</Label>
              <Input type="date" name="dob" id="dob" onChange={this.onChange} value={this.state.update ? date : this.state.item["dob"]} />
              {this.validator.message('dob', this.state.item["dob"], 'required')}
            </FormGroup>
            <FormGroup>
              <Label >Address</Label>
              <Input type="text" name="address" id="address" placeholder="Address" value={this.state.item["address"]}  maxLength="200" onChange={this.onChange} />
              {this.validator.message('address', this.state.item["address"], 'required|alpha_num')}
            </FormGroup>
            <FormGroup>
              <Label >City</Label>
              <Input type="text" name="city" id="city" placeholder="City" onChange={this.onChange} maxLength="25" value={this.state.item["city"]}/>
              {this.validator.message('city', this.state.item["city"], 'required|alpha')}
            </FormGroup>
            <FormGroup>
              <Label >State</Label>
              <Input type="text" name="state" id="state" placeholder="State" onChange={this.onChange}  maxLength="50" value={this.state.item["state"]}/>
              {this.validator.message('state', this.state.item["state"], 'required|alpha')}
            </FormGroup>
            <FormGroup>
              <Label >Mobile</Label>
              <Input type="text" name="mobile" id="mobile" placeholder="Mobile" onChange={this.onChange}  maxLength="10" value={this.state.item["mobile"]}/>
              {this.validator.message('mobile', this.state.item["mobile"], 'required|numeric')}
            </FormGroup>
            <FormGroup>
              <Label >Email Id</Label>
              <Input type="email" name="email" id="email" placeholder="Email" onChange={this.onChange}  maxLength="10" value={this.state.item["email"]}/>
              {this.validator.message('email', this.state.item["email"], 'required|email')}
            </FormGroup>
          </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
     </Container>
    </div>
    );
  }
}

export default App;
