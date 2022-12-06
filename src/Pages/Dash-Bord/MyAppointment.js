import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContext/UserContext';
import useTitle from '../../hook/useTitle';

const MyAppointment = () => {
    useTitle('Dasbord')
    const { user } = useContext(AuthContext);
    const url = `https://doctors-portal-server-site-zeta.vercel.app/booking?email=${user?.email}`;

    //    --------- TenStand Query------------
    const { data: booking = [], } = useQuery({
        queryKey: ['booking', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })



    // console.log(appointmentDate, email, patient, treatment, slot, _id)

    return (
        <div className='md:mx-16 md:mt-24 mt-36'>
            <h1 className='text-3xl text-bold text-black mb-10 text-center'>My Dental Booking</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>email</th>
                            <th>Services</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>

                        {booking?.map((bok, i) =>

                            <tr key={bok?._id}>
                                <th><div className="flex">{i + 1} <img className='rounded-full md:w-10 ml-5' src={bok?.photo} alt="" /></div></th>

                                <td>
                                    <div className="block ">
                                        <h1>{bok?.patient}</h1>
                                        <h1 className='text-red-900'>{bok?.email}</h1>
                                    </div>
                                </td>
                                <td className='text-sky-600'>{bok?.treatment}</td>
                                <td className='text-teal-500'>{bok?.slot}</td>
                                <td className='text-teal-500'>{bok?.appointmentDate}</td>
                            </tr>

                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;