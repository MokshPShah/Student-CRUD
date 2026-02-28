import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsPencilSquare } from 'react-icons/bs';
import { toast, ToastContainer } from 'react-toastify';

const ViewData = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = 'http://localhost:3000/student';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_URL, {
                    params: {
                        isDeleted: false
                    }
                });

                setData(response.data);
            } catch (err) {
                setError(err.message);
                toast.error("Failed to fetch data");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to move this student to the bin?")) {
            try {
                await axios.patch(`${API_URL}/${id}`, {
                    isDeleted: true,
                    deletedAt: new Date().toISOString()
                });
                setData(prev => prev.filter(item => item.id !== id));

                toast.success("Student moved to bin successfully!");
            } catch (err) {
                toast.error("Delete failed");
                console.error("Soft delete error:", err);
            }
        }
    };



    if (isLoading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <>
            <ToastContainer />
            <div className="p-4">
                <h1 className='text-xl md:text-3xl font-semibold text-center mb-3'>Student Data</h1>
                <table className="w-full mx-auto rounded-md border-collapse">
                    <thead className="bg-slate-950 text-white">
                        <tr>
                            <th className="px-3 py-2 text-left">ID</th>
                            <th className="px-3 py-2 text-left">Image</th>
                            <th className="px-3 py-2 text-left">Name</th>
                            <th className="px-3 py-2 text-left">Email</th>
                            <th className="px-3 py-2 text-left">Phone</th>
                            <th className="px-3 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-200 border-b border-slate-100">
                                <td className="px-3 py-4">{item.id}</td>
                                <td className="px-3 py-4">
                                    <img src={item.image} alt="" className="w-10 h-10 rounded-full" />
                                </td>
                                <td className="px-3 py-4">{item.name}</td>
                                <td className="px-3 py-4">{item.email}</td>
                                <td className="px-3 py-4">{item.phone}</td>
                                <td className="px-3 py-4 flex items-center gap-2.5">
                                    <button
                                        onClick={() => handleEdit(item.id)}
                                        className='bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-sm cursor-pointer'>
                                        <BsPencilSquare />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className='bg-red-600 hover:bg-red-500 text-white p-2 rounded-sm cursor-pointer'>
                                        <AiTwotoneDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ViewData;
