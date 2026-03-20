import { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaEye, FaEdit, FaTrash } from "react-icons/fa";


function Employee() {

    //  Form State
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phone: ""
    });

    //  Employee List
    const [employees, setEmployees] = useState([]);

    //  Edit Mode
    const [editIndex, setEditIndex] = useState(null);

    //  Load data from localStorage
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("employees")) || [];
        setEmployees(data);
    }, []);

    //  Save data to localStorage
    useEffect(() => {
        localStorage.setItem("employees", JSON.stringify(employees));
    }, [employees]);

    //  Input handle
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    //  Submit (Add + Update)
    const handleSubmit = (e) => {
        e.preventDefault();

        if (editIndex !== null) {
            // UPDATE
            const updated = [...employees];
            updated[editIndex] = form;
            setEmployees(updated);
            setEditIndex(null);
        } else {
            // CREATE
            setEmployees([...employees, form]);
        }

        // Reset form
        setForm({
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            phone: ""
        });
    };

    //  Delete
    const handleDelete = (index) => {
        const filtered = employees.filter((_, i) => i !== index);
        setEmployees(filtered);
    };

    // Edit
    const handleEdit = (index) => {
        setForm(employees[index]);
        setEditIndex(index);
    };

    return (
        <div>

            {/* FORM */}
            <div className="card p-3 mb-4">
                <h5 className="mb-3">New Employee</h5>
                <form onSubmit={handleSubmit}>

                    <div className="input-group mb-2">
                        <span className="input-group-text"><FaUser /></span>
                        <input
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            className="form-control"
                        />
                    </div>

                    <div className="input-group mb-2">
                        <span className="input-group-text"><FaEnvelope /></span>
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="form-control"
                        />
                    </div>

                    <div className="input-group mb-2">
                        <span className="input-group-text"><FaMapMarkerAlt /></span>
                        <input
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            placeholder="Address"
                            className="form-control"
                        />
                    </div>

                    <div className="input-group mb-2">
                        <span className="input-group-text"><FaPhone /></span>
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                            className="form-control"
                        />
                    </div>

                    <button className="btn btn-success w-100">
                        {editIndex !== null ? "Update" : "Submit"}
                    </button>

                </form>
            </div>

            {/* TABLE */}
            <div className="card p-3">
                <h5 className="mb-3">Manage Employees</h5>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>First</th>
                            <th>Last</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employees.map((emp, index) => (
                            <tr key={index}>
                                <td>{emp.firstName}</td>
                                <td>{emp.lastName}</td>
                                <td>{emp.email}</td>
                                <td>{emp.address}</td>
                                <td>{emp.phone}</td>

                                <td>
                                    <button
                                        className="btn btn-info btn-sm me-2"
                                        onClick={() => handleView(emp)}
                                    >
                                        <FaEye />
                                    </button>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(index)}
                                    >
                                        <FaEdit />
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(index)}
                                    >
                                        <FaTrash />
                                    </button>



                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </div>
    );
}
export default Employee;