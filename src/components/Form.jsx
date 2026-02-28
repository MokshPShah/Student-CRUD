import axios from 'axios'
import React, { useState } from 'react'
import { LuImage, LuUser } from 'react-icons/lu'
import { MdOutlineEmail, MdOutlineLocalPhone } from 'react-icons/md'
import { toast, ToastContainer } from 'react-toastify'

const Form = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        image: "",
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone || !formData.image) {
            toast.error('All Fields are required');
            return;
        }

        axios.post('http://localhost:3000/student', {
            id: Date.now(),
            ...formData,
            isDeleted: false
        })
        toast.success('Student added successfully');

        setFormData({
            name: "",
            email: "",
            phone: "",
            image: "",
        })
    }

    return (
        <div className="flex flex-col gap-3 space-y-2">
            <h1 className='text-xl md:text-3xl font-semibold'>Student Registration Form</h1>

            <div className="group flex items-center border border-slate-500 focus-within:border-blue-600 gap-2 px-3 py-2 rounded-md">
                <LuUser />
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder='Enter your name'
                    className='border-0 outline-0 w-full'
                    onChange={handleChange}
                />
            </div>

            <div className="group flex items-center border border-slate-500 focus-within:border-blue-600 gap-2 px-3 py-2 rounded-md">
                <MdOutlineEmail />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder='Enter your email'
                    className='border-0 outline-0 w-full'
                    onChange={handleChange}
                />
            </div>

            <div className="group flex items-center border border-slate-500 focus-within:border-blue-600 gap-2 px-3 py-2 rounded-md">
                <MdOutlineLocalPhone />
                <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    placeholder='Enter your phone number'
                    className='border-0 outline-0 w-full'
                    onChange={handleChange}
                />
            </div>

            <div className="group flex items-center border border-slate-500 focus-within:border-blue-600 gap-2 px-3 py-2 rounded-md">
                <LuImage />
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    placeholder='Enter image link'
                    className='border-0 outline-0 w-full'
                    onChange={handleChange}
                />
            </div>

            <button onClick={handleSubmit} className='bg-blue-500 text-white rounded-md font-semibold w-full py-3 cursor-pointer'>
                Add Student
            </button>
            <ToastContainer />
        </div>
    )
}

export default Form