import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebaseinit';
import useNotes from '../../../hooks/useNotes';
import './Header.css'
const Header = () => {
    const [user] = useAuthState(auth)

    const [searchText, setSearchText] = useState('')
    const [notes, setNotes] = useNotes(user, searchText)


    const handleSubmit = e => {
        e.preventDefault()
        const inputValue = e.target.name.value;
        setSearchText(inputValue)
    }

    return (
        <div >
            <div className='header d-flex justify-content-between align-items-center flex-column flex-md-row pt-5 pe-5'>
                <h3 className='fw-bold'>My Notes</h3>
                <form onSubmit={handleSubmit} className='d-flex my-4'>
                    <input className='ps-4' type="text" name="name" id="name" placeholder='Search your notes' />
                    <input type="submit" value="Search" />
                </form>
                {
                    user &&

                    <div className='d-flex align-items-center gap-5'>
                        <p className='fw-bold mt-3'>{user?.displayName}</p>
                        <button onClick={() => signOut(auth)} className="btn btn-danger">Log Out</button>
                    </div>
                }
            </div>
            <hr className='mb-5' />
        </div>
    );
};

export default Header;