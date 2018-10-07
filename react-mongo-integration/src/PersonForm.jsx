import React, { PureComponent } from 'react';
import axios from 'axios';
class PersonForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            personInfo: {},
            loading: false
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getAllPerson = this.getAllPerson.bind(this);
    }

    handleChange = (e) => {
        // this.setState({fname: e.target.value});
        console.log("personInfo ..", e.target.name)
        this.state.personInfo[e.target.name] = e.target.value
    };
    handleLogin = async (e) => {
        this.setState({ loading: true })
        console.log("submitting form with ", this.state.personInfo)

        await axios.post('http://localhost:3003/cperson', {
            ...this.state.personInfo
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        this.getAllPerson();

    }

    getAllPerson = async () => {
        console.log("get all person")

        await axios.get('http://localhost:3003/AllPerson')
            .then((response) => {
                console.log(response);
                this.setState({ allPerson: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
        this.setState({ loading: false })

    }

    async componentDidMount() {
        // console.log('GrandChild did mount.',this.getAllPerson());
        const response = await this.getAllPerson();
        console.log("response in did mont", response)
        this.setState({ allPerson: response });


    }
    render() {
        console.log("inside render ", this.state.allPerson)


        return (
            <div>
                <form>
                    <input type="text" name="name" placeholder="name" onChange={this.handleChange} />
                    <input type="text" name="age" placeholder="age" onChange={this.handleChange} />
                    <input type="text" name="nationality" placeholder="nationality" onChange={this.handleChange} />
                    <button type="button" onClick={this.handleLogin}>Register</button>
                </form>
                All Persons ::::


 {!this.state.loading && <table>
                    <tr>
                        <th>SNO</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Nationality</th>
                    </tr>
                    {this.state.allPerson && this.state.allPerson.map((element, index) => {
                        // console.log("final data ",JSON.stringify(element))
                        return ((<tr>
                            <td>{index}</td>
                            <td>{element._id}</td>
                            <td>{element.fname}</td>
                            <td>{element.nationality}</td>
                            <td>{element.age}</td>
                        </tr>))
                    })}

                </table>}

                {this.state.loading && <div> Loading .....</div>}


            </div>

        )
    }
}
export default PersonForm;
